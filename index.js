const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const path = require("path");
const jest = require("jest");
let Team = []
const DIST_DIR = path.resolve(__dirname, "dist");
const distPath = path.join(DIST_DIR, "team.html");
const render = require("./lib/htmlRender");

var managerCounter = 0;

const typeOfTeamMembers = {
    Manager: [{
            type: "input",
            message: "What is the manager's name? ",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is the manager's id? ",
            name: "managerId"
        },

        {
            type: "input",
            message: "What is the manager's email? ",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is the manager's office number? ",
            name: "officeNumber"

        }
    ],


    Engineer: [{
            type: "input",
            message: "What is the engineer's name? ",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is the engineer's id? ",
            name: "engineerId"
        },

        {
            type: "input",
            message: "What is the engineer's email? ",
            name: "engineerEmail"
        }, {

            type: "input",
            message: "What is the engineer's Github username? ",
            name: "Github"
        }
    ],

    Intern: [{
            type: "input",
            message: "What is the intern's name? ",
            name: "internName"
        },
        {
            type: "input",
            message: "What is the intern's id? ",
            name: "internId"
        },

        {
            type: "input",
            message: "What is the intern's email? ",
            name: "internEmail"
        }, {
            type: "input",
            message: "What is the intern's school? ",
            name: "school"
        }

    ]
}


function start() {


    inquirer.prompt(addAnotherTeamMember).then((answer) => {

        if (answer.addMember == "yes") {
            addRole();
        } else {



            fs.writeFileSync(distPath, render(Team), "utf-8");
            process.exit(0);
        }


    })

}
const addAnotherTeamMember = {
    type: "List",
    message: "Do you want to add another employee? ",
    name: "addMember",
    choices: ["Yes", "No"],
}



function addRole() {
    inquirer.prompt([{
        type: "list",
        message: "Choose the employee's role:",
        name: "employeeChoice",
        choices: ["Manager", "Engineer", "Intern", ]
    }]).then((answer) => {
        //manager counter set to 0 as employee generally can only have one manager.
        if (answer.employeeChoice === "Manager" && managerCounter < 1) {
            managerCounter++
            inquirer.prompt(typeOfTeamMembers.Manager).then((results) => {


                const manager = new Manager(results.managerName, results.managerId, results.managerEmail, results.OfficeNumber);
                Team.push(manager);
                start();

            })
        } else if (answer.employeeChoice === "Engineer") {


            inquirer.prompt(typeOfTeamMembers.Engineer).then((results) => {

                const engineer = new Engineer(results.engineerName, results.engineerId, results.engineerEmail, results.Github);
                Team.push(engineer);

                start();

            })
        } else if (answer.employeeChoice === "Intern") {

            inquirer.prompt(typeOfTeamMembers.Intern).then((results) => {

                const intern = new Intern(results.internName, results.internId, results.internEmail, results.school);
                Team.push(intern);
                start();

            })
        } else {
            start();
        }


    })
}


start()