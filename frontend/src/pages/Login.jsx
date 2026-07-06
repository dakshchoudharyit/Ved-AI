import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

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

            localStorage.setItem(
                "token",
                res.data.access_token
            );

            navigate("/dashboard");

        }

        catch {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="logo-box">

                        <span className="logo-icon">
                            🏥
                        </span>

                    </div>

                    <div>

                        <h1>VED AI</h1>

                        <p className="subtitle">
                            Sign in to continue
                        </p>

                    </div>

                </div>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>

                    Login

                </button>

                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;