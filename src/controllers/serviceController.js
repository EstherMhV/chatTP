const Service = require("../db/models/serviceModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createService = async (req, res) => {
  try {
    let newService = new Service(req.body);
    let service = await newService.save();
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Request invalided" });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id_user;
    const updates = req.body;

    await updateUserSchema.validate(updates);

    const updatedService = await Service.findByIdAndUpdate(serviceId, updates, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id_service;
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json({
      message: "Service deleted successfully",
      service: deletedService,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
