
const Employee = require("./Employee")

//This class is inherited from employee.js
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
    }

    getRole() { return "Engineer" }
    getGithub() { return this.github }
}


module.exports = Engineer