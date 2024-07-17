import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export const EmployeeList = () => {

    const urlBase = "http://localhost:8080/hr-app/employees"

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get(urlBase);
        console.log("loadEmployee result");
        console.log(result.data);
        setEmployees(result.data);
    }

    const deleteEmployee = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        loadEmployees();
    }


    return (
        <div className='container'>

            <table className="table table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Salary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Iterate the employee array
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <th scope="row">{employee.employeeId}</th>
                                <td>{employee.name}</td>
                                <td>{employee.department}</td>
                                <td> <NumericFormat value={employee.salary}
                                    displayType='text'
                                    thousandSeparator=','
                                    prefix='$'
                                    decimalScale={2}
                                    fixedDecimalScale></NumericFormat> USD</td>
                                <td className='text-center'>
                                    <div>
                                        <Link to={`/edit/${employee.employeeId}`} className='btn btn-outline-warning btn-sm me-3'>Edit</Link>
                                        <button onClick={() => deleteEmployee(employee.employeeId)} className='btn btn-outline-danger btn-sm me-3'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            
            <section className='d-flex justify-content-center'>
                <Link to='/add' className='btn btn-outline-primary text-center'>Add a new employee</Link>
            </section>
            

        </div>


    )
}
