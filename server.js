const mysql = require('mysql');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
const { update } = require('lodash');
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
        connection.query(`SELECT first_name, last_name, role_id FROM employee`, function(err, result) {
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
    reRun();
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
    reRun();
};

// function findRoles() {
//     return connection.query(`SELECT title FROM role`, function(err, result) {
//         if (err) throw err
//         return result.map(record => {
//             return record.title;
//         });
//     })
// }

function addEmployee() {
    //var findRoles = findRoles();
    inquirer.prompt ([
        {
            message:"What is the First Name of Your New Employee?",
            type:"input",
            name:"employeeFirstName"
        }, 
        {
            message:"What is the Last Name of Your Employee?",
            type:"input",
            name:"employeeLastName"
        },
        {
        message:"Please Select an id Number for your Employee, *This will Also be their Department!!!!*",
            type:"input",
            name:"employeeId"
        }
    ]).then(function(employeeAnswer) {
        console.log("employee answerrrrrr", employeeAnswer);
        connection.query(`INSERT INTO employee(first_name, last_name, role_id) VALUES (?, ?, ?)`, [employeeAnswer.employeeFirstName, employeeAnswer.employeeLastName, employeeAnswer.employeeId], function(err, result) {

            if (err) throw err;
            console.log(result);
        })

    })
    reRun();
};



function addRole() {
    inquirer.prompt ([
        {
            message:"What is the Title of this Role?",
            type:"input",
            name:"roleTitle"
        }, 
        {
            message:"What is the Salary for this Role?",
            type:"input",
            name:"roleSalary"
        },
        {
        message:"What is the Department Id for this Role to be assigned to?",
            type:"input",
            name:"roleDepartmentId"
        }
    ]).then(function(roleAnswer) {
        console.log("employee answerrrrrr", roleAnswer);
        connection.query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`, [roleAnswer.roleTitle, roleAnswer.roleSalary, roleAnswer.roleDepartmentId], function(err, result) {

            if (err) throw err;
            console.log(result);
        })

    })
    reRun();
};


function getEmployeeList() {
   connection.query(`SELECT first_name, last_name, role_id FROM employee`, function(err, result) {
        if (err) throw err;
        //console.log("Here Are Your Employees: ", result);
        // const employeeList =  result.map(record => {
        //     return `${record.first_name} ${record.last_name}`
        // });
        // console.log(employeeList);
        // return employeeList;
        var roleArray = result.map(record => record.title)
        return roleArray;
    })

    reRun();
}

//O 


function updateEmployee(employeeList) {
    // I need to somehow grab the employee, match it with their role id. and then update their role from there. I can't seem to figure out how to call it wihin the second inquirer question. It might have something to do with how I wrote the first connection.query. I need to be able to grab their name, their role (which are two separate tables) and then push them into their respective tables.... 

    
    // connection.query('UPDATE employee SET ')
    //Need to break the whole name into chosen first and last names. 
    //Need to split into first_name, last_name
    //Need to update query.
    connection.query("SELECT * FROM employee",function(err, result) {
        if (err) throw err;
        connection.query("SELECT * FROM role", function(err, roleResult){

       
       

            inquirer.prompt ([
                {
                    message:"Which employee would you like to update?",
                    type:"list",
                    name:"selectedEmployee",
                    choices:function() {
                        var employeeList = [];
                        for (let i=0; i< result.length; i++) {
                            employeeList.push(result[i].first_name + " " + result[i].last_name);
                        }
                        return employeeList;
                    }
                },
                {
                    message:"What is their new role?",
                    type:"list",
                    name: "updatedRole",
                    choices: function() {
                        var roleList = [];
                        for (let i=0; i< roleResult.length; i++) {
                            roleList.push(roleResult[i].title)
                        }
                        return roleList;
                    }
                }
                // ,
                // {
                //     message:"What department is this position in?",
                //     type:"list",
                //     name:"updatedDepartment"
                //     //choices: //Want to create a getDepartment function
                // }
            ]).then(function (updateAnswer) {
                console.log("Here are our answersssssss", updateAnswer);

                var roleId;
                for (let i=0; i<roleResult.length; i++){
                    if (updateAnswer.updatedRole === roleResult[i].title) {
                        console.log('we found amatch!! for role!!', roleResult[i])
                        roleId = roleResult[i].id
                    }
                }

                var employeeId; 
                for (let i=0; i<result.length; i++) {
                    if (updateAnswer.selectedEmployee.split(' ')[0] === result[i].first_name){
                        console.log("Match for EMployee ID!!!1", result[i].id)
                        employeeId = result[i].id;
                    }
                }


                connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, 
                [roleId, employeeId],
                function(err){
                    if (err) throw err;
                    //console.log('errr!!!!!', err)
                    //console.log(updateAnswer)
                }
                );
                reRun();
            })

        })
    })
    
}

function reRun() {
    inquirer.prompt ([
        {
            message: "Need Something Else?",
            type: "list",
            name: "reRunCommand",
            choices: ["Yes", "No"]
        }
    ]).then(function (result) {
        if(result.reRunCommand === "Yes") {
            mainQs();
        } else {
            console.log("Please Enter 'control C' to leave the Interface");
        }
    })
}

mainQs();




// connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",[answers.title, answers.salary, answers.department_id], function(err, results){

// })

// connection.query("select * from role", function(err, results){
//     console.log('all the rolessss', err, results)
// })

// connection.query('UPDATE employee SET ')
