import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
    const { empid } = useParams();

    const [id, setId] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Gender, setGender] = useState("");
    const [Age, setAge] = useState("");
    const [Salary, setSalary] = useState("");
    const [Department, setDepartment] = useState("");
    const [active, setActive] = useState(true);
    const [validation, setValidation] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => res.json())
            .then((resp) => {
                setId(resp.id);
                setFirstName(resp.FirstName);
                setLastName(resp.LastName);
                setGender(resp.Gender);
                setAge(resp.Age);
                setSalary(resp.Salary);
                setDepartment(resp.Department);
                setActive(resp.active);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [empid]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const empdata = {
            id,
            FirstName,
            LastName,
            Gender,
            Age,
            Salary,
            Department,
            active
        };

        fetch("http://localhost:8000/employee/" + empid, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        })
        .then((res) => {
            alert('Saved successfully.');
            navigate('/');
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input required value={FirstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input required value={LastName} onChange={(e) => setLastName(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select value={Gender} onChange={(e) => setGender(e.target.value)} className="form-control">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input value={Age} onChange={(e) => setAge(e.target.value)} className="form-control" type="number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Salary</label>
                                            <input value={Salary} onChange={(e) => setSalary(e.target.value)} className="form-control" type="number" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input value={Department} onChange={(e) => setDepartment(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={active} onChange={(e) => setActive(e.target.checked)} type="checkbox" className="form-check-input" />
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
};

export default EmpEdit;