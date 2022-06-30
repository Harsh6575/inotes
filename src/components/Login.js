import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" }); // setCredentials = setState

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents page from refreshing

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects


        if (json.success) {
            localStorage.setItem('token', json.authToken); // save token to local storage
            navigate("/"); // redirect to home page
            props.showAlert("Logged in Successfully", "success");
        }
        else {
            props.showAlert("Please try to login with correct credentials", "danger"); // display error message
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // setCredentials = setState
    }; // onChange = setState

    return (
        <div>
            <h2>
                Login to continue
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;