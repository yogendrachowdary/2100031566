import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmpListing.css";
const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/employee/detail/" + id);
    }
    const LoadEdit = (id) => {
        navigate("/employee/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/employee/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    // Custom function to apply dollar sign prefix to Salary
    const formatSalary = (salary) => {
        return `$${salary}`;
    };

    // Custom function to capitalize the first letter of a string
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>FirstName</td>
                                <td>LastName</td>
                                <td>Department</td>
                                <td>Salary</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item, index) => (
                                    <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? "lightgray" : "" }}>
                                        <td>{item.id}</td>
                                        <td>{capitalizeFirstLetter(item.FirstName)}</td>
                                        <td>{capitalizeFirstLetter(item.LastName)}</td>
                                        <td>{item.Department}</td>
                                        <td>{formatSalary(item.Salary)}</td>
                                        <td>
                                            <button onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</button>
                                            <button onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</button>
                                            <button onClick={() => LoadDetail(item.id)} className="btn btn-primary">Details</button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;