const jwt = require("jsonwebtoken");
const { workerOrder } = require("../controllers/orderController");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["access"];

    if (token !== undefined) {
      const payload = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });
      req.user = payload;
      next();
    } else {
      res.status(403).json({ message: "Access denied : missing token" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Access denied : invalid token" });
  }
};

exports.verifyEmployerToken = async (req, res, next) => {
  try {
      const token = req.headers['access'];

      if (token !== undefined) {
          const payload = await new Promise((resolve, reject) => {
              jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(decoded);
                  }
              });
          });

          req.user = payload;

          if (payload.role == "employer") {
              next();
          } else {
              res.status(403).json({ message: "Incorrect Token: you're not an employer" });
          }
      } else {
          res.status(403).json({ message: "Access Denied: Invalid User Token" });
      }
  } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Access Denied: Invalid Token" });
  }
};


exports.verifyWorkerToken = async (req, res, next) => {
  try {
      const token = req.headers['access'];

      if (token !== undefined) {
          const payload = await new Promise((resolve, reject) => {
              jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(decoded);
                  }
              });
          });

          req.user = payload;

          if (payload.role == "worker") {
              next();
          } else {
              res.status(403).json({ message: "Incorrect Token: you're not an worker" });
          }
      } else {
          res.status(403).json({ message: "Access Denied: Invalid User Token" });
      }
  } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Access Denied: Invalid Token" });
  }
};




exports.verifyOrderToken = async (req, res, next) => {
  try {
      const token = req.headers['access'];

      if (token !== undefined) {
          const payload = await new Promise((resolve, reject) => {
              jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(decoded);
                  }
              });
          });

          req.user = payload;
  
          if (payload.worker == req.params.worker_id && payload.service == req.params.service_id) {
            next();
          } else {
              res.status(403).json({ message: "Incorrect Token" });
          }
      } else {
          res.status(403).json({ message: "Access Denied: Invalid User Token" });
      }
  } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Access Denied: Invalid Token" });
  }
};