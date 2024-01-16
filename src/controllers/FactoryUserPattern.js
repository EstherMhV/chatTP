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

class EmployeeCreator extends UserCreator {
    createUser(name, email, password) {
        return new User({ name, email, password, role: 'employee' });
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

module.exports = { AdminUserCreator, EmployeeCreator, EmployerCreator, RegularUserCreator };