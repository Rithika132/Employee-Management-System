const API_URL =
    "http://127.0.0.1:8000/api/employees/";


// READ
async function loadEmployees() {

    try {

        const response =
            await fetch(API_URL);

        const employees =
            await response.json();

        const table =
            document.getElementById("employeeTable");

        table.innerHTML = "";


        employees.forEach(employee => {

            table.innerHTML += `

                <tr>

                    <td>${employee.id}</td>

                    <td>${employee.name}</td>

                    <td>${employee.email}</td>

                    <td>${employee.phone}</td>

                    <td>${employee.department}</td>

                    <td>${employee.position}</td>

                    <td>${employee.salary}</td>

                    <td>${employee.joining_date}</td>

                    <td>

                        <button
                            onclick="editEmployee(${employee.id})">

                            Edit

                        </button>


                        <button
                            onclick="deleteEmployee(${employee.id})">

                            Delete

                        </button>

                    </td>

                </tr>

            `;
        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");

    }
}


// CREATE / UPDATE
document
    .getElementById("employeeForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const id =
                document.getElementById(
                    "employeeId"
                ).value;


            const employee = {

                name:
                    document.getElementById(
                        "name"
                    ).value,

                email:
                    document.getElementById(
                        "email"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value,

                department:
                    document.getElementById(
                        "department"
                    ).value,

                position:
                    document.getElementById(
                        "position"
                    ).value,

                salary:
                    document.getElementById(
                        "salary"
                    ).value,

                joining_date:
                    document.getElementById(
                        "joining_date"
                    ).value
            };


            try {

                let response;


                if (id) {

                    response =
                        await fetch(
                            API_URL + id + "/",
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        employee
                                    )
                            }
                        );

                }

                else {

                    response =
                        await fetch(
                            API_URL,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        employee
                                    )
                            }
                        );

                }


                if (response.ok) {

                    alert(
                        id
                        ? "Employee updated successfully!"
                        : "Employee added successfully!"
                    );

                    resetForm();

                    loadEmployees();

                }

                else {

                    alert(
                        "Please check the entered details."
                    );

                }

            }

            catch (error) {

                console.error(error);

                alert(
                    "Backend connection failed."
                );

            }

        }
    );


// UPDATE - Get employee
async function editEmployee(id) {

    const response =
        await fetch(API_URL + id + "/");

    const employee =
        await response.json();


    document.getElementById(
        "employeeId"
    ).value = employee.id;


    document.getElementById(
        "name"
    ).value = employee.name;


    document.getElementById(
        "email"
    ).value = employee.email;


    document.getElementById(
        "phone"
    ).value = employee.phone;


    document.getElementById(
        "department"
    ).value = employee.department;


    document.getElementById(
        "position"
    ).value = employee.position;


    document.getElementById(
        "salary"
    ).value = employee.salary;


    document.getElementById(
        "joining_date"
    ).value = employee.joining_date;

}


// DELETE
async function deleteEmployee(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmDelete) {

        return;

    }


    const response =
        await fetch(
            API_URL + id + "/",
            {
                method: "DELETE"
            }
        );


    if (response.ok) {

        alert(
            "Employee deleted successfully!"
        );

        loadEmployees();

    }

}


// CLEAR
function resetForm() {

    document
        .getElementById("employeeForm")
        .reset();


    document
        .getElementById("employeeId")
        .value = "";

}


// Load employees when page opens
loadEmployees();