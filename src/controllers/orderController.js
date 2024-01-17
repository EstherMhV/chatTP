const Order = require("../db/models/orderModel.js");
const Service = require("../db/models/serviceModel.js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/jwt.js"); 


  
  exports.workerOrder = async (req, res) => {
    try {
      const payload = req.user;

      const worker = await Service.findById(req.params.service_id);

        const orderData = {
            service: req.params.service_id,
            employer: payload.id,
            worker: worker.worker,
        };

        const token = await jwt.sign(orderData, process.env.JWT_KEY, { expiresIn: "10h" });

        // Respond with a success message and the generated token
        res.status(200).json({ message: `Demande créer voici le token: ${token}` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during processing" });
    }
};

exports.workerDecline = async (req, res) => {
    try {
        // Respond with a success message
        res.status(200).json({ message: "You have declined the invitation" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during processing" });
    }
};

exports.workerAccept = async (req, res) => {
    try {
     

      const payload = req.user;
      let newOrder = new Order({ service: payload.service, employer: payload.employer, worker: payload.worker});
       let order = await newOrder.save();
      
        // Respond with a success message
        res.status(200).json({ message: "You have accepted the invitation" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred during processing" });
    }
};






exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.order_id)
    const payload = req.user;
if(payload.worker === order.worker || payload.employer === order.employer){
  res.status(500).json({ error: "You con't delete" });

}


    const orderID = req.params.order_id;
    const deleteOrder = await Order.findByIdAndDelete(orderID);

    if (!deleteOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};