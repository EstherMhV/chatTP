const notificationManager = require("../notificationManager.js");

class ServiceObserver {
  update(event, data) {
    switch (event) {
      case "serviceCreated":
        console.log("Notification: A service has been created.");
        break;
      case "serviceAccepted":
        console.log("Notification: The service has been accepted.");
        break;
      case "serviceRejected":
        console.log("Notification: The service has been refused.");
        break;
      case "serviceCompleted":
        console.log("Notification: The prestation a été terminée.");
        break;
    }
  }
}

const serviceObserver = new ServiceObserver();
notificationManager.subscribe(serviceObserver);

module.exports = ServiceObserver;
