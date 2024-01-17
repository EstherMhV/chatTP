const notificationManager = require("../notificationManager.js");

class UserObserver {
  update(event, data) {
    switch (event) {
      case "userCreated":
        // Traitement pour une proposition créée
        console.log("Notification: A user has been created.");
        break;
    }
  }
}

notificationManager.subscribe(new UserObserver());
