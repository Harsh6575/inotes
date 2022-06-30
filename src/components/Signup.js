import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const { showAlert } = props; // get the showAlert function from props

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" }); // setCredentials = setState
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents page from refreshing

        const { name, email, password } = credentials; // get the credentials from state
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects

        if (json.success) {
            localStorage.setItem('token', json.authToken); // save token to local storage
            props.showAlert("Account Created Successfully", "success");
            navigate("/"); // redirect to home page
        }
        else {
            props.showAlert("sorry a user with this email is already exist", "danger"); // display error message
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // setCredentials = setState
    }; // onChange = setState

    return (
        <div className='container'>
            <h2>
                Please create a account to continue
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <input type="cpassword" className="form-control" name='cpassword' id="cpassword" onChange={onChange} required minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Signup;