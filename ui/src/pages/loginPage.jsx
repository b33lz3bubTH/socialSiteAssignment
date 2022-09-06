import { Link } from "react-router-dom";
import AuthForm from "../components/authForm";


export default () => {
    return (
        <div>
            <h3>Login</h3>
            <AuthForm mode="login" />

            <Link to="/sign-up" style={{ fontSize: 14 }}>Dont Have An Account? Click Here To Register</Link>
        </div>
    )
}