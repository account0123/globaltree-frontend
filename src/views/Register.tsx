import { Link } from "react-router";
import Form from "./SignupForm";

export default function Register() {
    return (
        <div>
            <Form />
            <Link to="/auth/login">Already have an account? Sign in</Link>
        </div>
    );
};
