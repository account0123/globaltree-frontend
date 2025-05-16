import { Link } from "react-router";

export default function Register() {
    return (
        <div>
            <Link to="/auth/login">Already have an account? Sign in</Link>
        </div>
    );
};
