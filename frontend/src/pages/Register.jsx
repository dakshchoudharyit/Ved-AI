import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {

        try {

            await api.post("/register", {
                name,
                age: Number(age),
                email,
                password
            });

            alert("Registration Successful!");

            navigate("/");

        } catch (err) {

            alert("Registration Failed");

        }

    };

    return (

        <div>

            <h1>Create Account</h1>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={register}>
                Register
            </button>

            <p>

                Already have an account?

                <Link to="/">
                    Login
                </Link>

            </p>

        </div>

    );

}

export default Register;