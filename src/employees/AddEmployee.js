import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddEmployee = () => {

    let navigation = useNavigate();

    const [employee, setEmployee] = useState({
        name:"",
        department:"",
        salary:""
    })

    const {name, department, salary} = employee

    const onInputChange = (e) => {
        //spread operator ... (expand attributes) 
        //if target name = to any employee attribute then target value is setted on it
        setEmployee({...employee, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/hr-app/employees"
        await axios.post(urlBase, employee);
        //Redirect to index
        navigation('/');
    }

    return (
        <section className='container'>
            <div className='container text-center'>
                <h2>Add a new employee</h2>
            </div>
            
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e) => onInputChange(e)} required="true"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input type="text" className="form-control" id="department" name='department' value={department} onChange={(e) => onInputChange(e)} required="true"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="number" className="form-control" id="salary" name='salary' value={salary} onChange={(e) => onInputChange(e)} required="true"/>
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-outline-primary me-3">Add</button>
                    <a href='/' className='btn btn-outline-secondary'>Return</a>
                </div>

                
            </form>
        </section>
    )
}
