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

function viewAll(placeHolder) {
    if (placeHolder.whichCommand === "View Departments") {
    connection.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;
        console.log(result);
        }) 
    };
    if (placeHolder.whichCommand === "View Employee") {
        connection.query("SELECT * FROM employee", function(err, result) {
            if (err) throw err;
            console.log(result);
        })
    };
    if (placeHolder.whichCommand === "View Role") {
        connection.query(`SELECT title, salary FROM role = ${placeHolder.title}`, function(err, result) {
            if(err) throw err; 
            //console.log(result);
            console.log("Job Title and Salary:", result);
        })
    }
};

// SELECT FROM for View Departments, 
// INSERT INTO For Adds 


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
