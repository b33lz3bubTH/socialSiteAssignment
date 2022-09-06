import { Link } from "react-router-dom";
import AuthForm from "../components/authForm";


export default () => {
    return (
        <div>
            <h3>Sign Up</h3>
            <AuthForm mode="registration" />

            <Link to="/sign-in" style={{ fontSize: 14 }}>Already Have An Account? Login</Link>
        </div>
    )
}