const mysql = require('mysql');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
// const { SlowBuffer } = require('buffer');

var connection  = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:"root",
    password:"password",
    database:'department_db'
});
connection.connect(function(err) {
    if(err) {
        console.error("error connecting " + err.stack);
        return;
    }
    console.log("connected" + connection.threadId);
});


// var answers = {
//     title: 'Frontend',
//     salary: 60000,
//     department_id: 2
// }


function mainQs(data) {
    inquirer.prompt ([
        {
            message:"What Would You Like to Do?",
            type: 'list',
            name: "whichCommand",
            choices:["Add Department", "Add Role", "Add Employee", "View Departments", "View Employee", "View Role", "Update Employee"]
        }
    ]).then(function(answers) {
        //Mayve make this a Switch command
        console.log("Answers!", answers);

        if(answers.whichCommand === "Add Department") {

            addDepartment(answers);
        } else if (answers.whichCommand === "Add Role") {

            addRole(answers);
        } else if (answers.whichCommand === "Add Employee") {

            addEmployee(answers);
        } else if (answers.whichCommand === "View Departments") {

            viewAll(answers);
        } else if (answers.whichCommand === "View Employee") {

            viewAll(answers);
        } else if(answers.whichCommand === "View Role") {

            viewAll(answers);
        } else if (answers.whichCommand === "Update Employee") {

            updateEmployee(answers);
        }
    })
}

// SELECT FROM for View Departments, 
function viewAll(placeHolder) {
    if (placeHolder.whichCommand === "View Departments") {
    connection.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;
        console.log("Departments:", result);
        }) 
    };
    if (placeHolder.whichCommand === "View Employee") {
        connection.query("SELECT first_name, last_name, role_id FROM employee", function(err, result) {
            if (err) throw err;
            console.log("Here Are Your Employees: ", result);
        })
    };
    if (placeHolder.whichCommand === "View Role") {
        connection.query(`SELECT * FROM role`, function(err, result) {
            if(err) throw err; 
            //console.log(result);
            console.log("Job Title and Salary:", result);
        })
    }
};


// INSERT INTO For Adds 
function addDepartment() {
    inquirer.prompt ([
        {
            message:"What is the Name of Your New Department?",
            type:"input",
            name:"departmentName"
        }, 
        {
        message:"Please Select an id Number for your Department",
            type:"input",
            name:"departmentId"
        }
    ]).then(function(departmentAnswer) {
        console.log("department answerrrrrr", departmentAnswer);
        connection.query(`INSERT INTO department(id, name) VALUES (?, ?)`, [departmentAnswer.departmentId, departmentAnswer.departmentName], function(err, result) {

            if (err) throw err;
            console.log(result);
        })

    })
};


mainQs();

// function addEmployee(answer) {
//     inquirer.prompt ([
//         {
//             message: "What is the employees First Name?",
//             type:"input",
//             name: "firstName"
//         },
//         {
//         message: "What is the employees Last Name?",
//         type:"input",
//         name: "lastName"
//         },
//         {
//         message: "What is the employees id for their role?",
//         type:"input",
//         name: "employeeID"
//         },
//         {
//             message: "What is the employees id for their department?",
//             type:"input",
//             name: "employeeID"
//             },
//     ])
// }


// connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",[answers.title, answers.salary, answers.department_id], function(err, results){

// })

// connection.query("select * from role", function(err, results){
//     console.log('all the rolessss', err, results)
// })

// connection.query('UPDATE employee SET ')
