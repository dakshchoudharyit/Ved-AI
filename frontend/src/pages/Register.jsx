import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");

    const register = async () => {

        try {

            await api.post("/register", {
                name,
                email,
                password,
                age: Number(age),
            });

            alert("Registration Successful!");

            navigate("/");

        } catch (err) {

            alert("Registration Failed");

        }

    };

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>🏥 Medical AI</h1>

                <p>Create your account</p>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={register}>
                    Create Account
                </button>

                <p>

                    Already have an account?{" "}

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;