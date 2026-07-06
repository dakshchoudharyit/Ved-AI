import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            const res = await api.post("/login", {
                email,
                password,
            });
            console.log(res.data);
            localStorage.setItem(
                "token",
                res.data.access_token
            );
            console.log("Stored:", localStorage.getItem("token"));
            navigate("/dashboard");

        } catch (err) {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div>

            <h1>Medical AI Assistant</h1>

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

            <button onClick={login}>
                Login
            </button>

            <p>

                Don't have an account?

                <Link to="/register">
                    Register
                </Link>

            </p>

        </div>

    );

}

export default Login;