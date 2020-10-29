const mysql = require('mysql');
const inquirer = require('inquirer');
// const { SlowBuffer } = require('buffer');

var connection  = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:"root",
    password:"password",
    database:'department_db'
});


var answers = {
    title: 'Frontend',
    salary: 60000,
    department_id: 2
}


function mainQs() {
    inquirer.prompt ([
        {
            message:"What Would You Like to Do?",
            type: 'list',
            name: "whichCommand",
            choices:["Add Department", "Add Role", "Add Employee", "View Departments", "View Employee", "View Role", "Update Employee"]
        }
    ]).then(function(answers) {
        console.log("Answers!", answers);

        if(answers) {
            
        }



    })
}

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
