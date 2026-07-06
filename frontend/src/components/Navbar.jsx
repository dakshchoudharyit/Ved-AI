import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <nav>

            <h2>🏥 Medical AI Assistant</h2>

            <button onClick={logout}>
                Logout
            </button>

        </nav>

    );

}

export default Navbar;