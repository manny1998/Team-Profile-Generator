
const Employee = require("./Employee")

//This class is inherited from employee.js
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber
    }

    getOfficeNumber() { return this.officeNumber }

    getRole() { return "Manager" }

}

module.exports = Manager