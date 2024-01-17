const User = require("../db/models/userModel.js");

class UserCreator {
    constructor() {
        if (new.target === UserCreator) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    createUser(name, email, password) {
        throw new Error("This method must be overwritten!");
    }
}

class AdminUserCreator extends UserCreator {
    constructor() {
        super();
    }

    createUser(name, email, password) {
        return new User({ name, email, password, role: 'admin' });
    }
}

class WorkerCreator extends UserCreator {
    constructor() {
        super();
    }

    createUser(name, email, password) {
        return new User({ name, email, password, role: 'worker', typeOfService: 'Traduction',country: 'United-State' });
    }
}

class EmployerCreator extends UserCreator {
    constructor() {
        super();
    }

    createUser(name, email, password) {
        return new User({ name, email, password, role: 'employer', budget: '1000$'});
    }
}

class RegularUserCreator extends UserCreator {
    constructor() {
        super();
    }

    createUser(name, email, password) {
        return new User({ name, email, password, role: 'user', typeOfService: 'None', budget: 'undefined'});
    }
}

module.exports = { AdminUserCreator, WorkerCreator, EmployerCreator, RegularUserCreator };