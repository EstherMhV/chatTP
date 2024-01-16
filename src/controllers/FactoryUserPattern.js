const User = require("../db/models/userModel.js");

class UserCreator {
    createUser(name, email, password) {
        throw new Error("This method must be overwritten!");
    }
}

class AdminUserCreator extends UserCreator {
    createUser(name, email, password) {
        return new User({ name, email, password, role: 'admin' });
    }
}

class WorkerCreator extends UserCreator {
    createUser(name, email, password) {
        return new User({ name, email, password, role: 'worker' });
    }
}

class EmployerCreator extends UserCreator {
    createUser(name, email, password) {
        return new User({ name, email, password, role: 'employer' });
    }
}

class RegularUserCreator extends UserCreator {
    createUser(name, email, password) {
        return new User({ name, email, password, role: 'user' });
    }
}

module.exports = { AdminUserCreator, WorkerCreator, EmployerCreator, RegularUserCreator };