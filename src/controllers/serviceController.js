const Service = require("../db/models/serviceModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const notificationManager = require("../notification/notificationManager.js");
const ServiceObserver = require("../notification/observer/serviceObserver.js");
const serviceObserver = new ServiceObserver();
const { verifyToken } = require("../middlewares/jwt.js"); 

const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitRoot: false, explicitArray: false, mergeAttrs: true });

const adaptXMLtoJSON = async (xmlObject) => {
  try {
    // Map through each property and convert arrays to strings
    const convertedObject = Object.fromEntries(
      Object.entries(xmlObject).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
    );

    return convertedObject;
  } catch (error) {
    throw error;
  }
};
// Function for creating a service from XML or JSON input
exports.createService = async (req, res) => {
  try {


    // Adaptation of the XML input to JSON
    let requestData;

    if (req.is('xml')) {
      try {
        // Ensure that req.body.root is an object
        if (typeof req.body.root === 'object' && req.body.root !== null) {
          requestData = await adaptXMLtoJSON(req.body.root);
        } else {
          throw new Error("Invalid XML format");
        }
      } catch (xmlError) {
        console.error("Error parsing XML:", xmlError);
        return res.status(400).json({ message: "Invalid XML format" });
      }
    } else {
      requestData = req.body;
    }

    // Use decrypted token data
    const payload = req.user;

    // Create the service
    let newService = new Service({ worker: payload.id, ...requestData });
    let service = await newService.save();

    // notificationManager.notify("serviceCreated", {
    //   serviceId: service._id,
    // });
    
    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Request invalidated" });
  }
};


exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await service.findById(serviceId);
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

    const updatedService = await service.findByIdAndUpdate(serviceId, updates, {
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
    const deletedService = await service.findByIdAndDelete(serviceId);

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
