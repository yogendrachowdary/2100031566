import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmpCreate.css";
const EmpCreate = () => {

    const[id,idchange]=useState("");
    const[FirstName, FirstNameChange]=useState("");
    const[LastName, LastNameChange]=useState("");
    const[Gender, GenderChange]=useState("");
    const[Age, AgeChange]=useState("");
    const[Salary, SalaryChange]=useState("");
    const[Department, DepartmentChange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={FirstName, LastName, Gender, Age, Salary, Department, active};
      console.log(Gender);

      fetch("http://localhost:8000/employee",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/employee');
      }).catch((err)=>{
        console.log(err.messAge)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Employee Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input required value={FirstName} onMouseDown={e=>valchange(true)} onChange={e=>FirstNameChange(e.target.value)} className="form-control"></input>
                                        {FirstName.length===0 && validation && <span className="text-danger">Enter the first name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input required value={LastName} onMouseDown={e=>valchange(true)} onChange={e=>LastNameChange(e.target.value)} className="form-control"></input>
                                        {LastName.length===0 && validation && <span className="text-danger">Enter the last name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select value={Gender} onChange={e=>GenderChange(e.target.value)} className="form-control">
                                            <option value="male">select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input value={Age} onChange={e=>AgeChange(e.target.value)} className="form-control" type="number"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Salary</label>
                                            <input value={Salary} onChange={e=>SalaryChange(e.target.value)} className="form-control" type="number"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input value={Department} onChange={e=>DepartmentChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label className="form-check-label">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default EmpCreate;