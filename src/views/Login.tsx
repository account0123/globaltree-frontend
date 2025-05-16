import { Link } from "react-router";

export default function Login() {
    return (
        <div>
            <Link to="/auth/create">Don't have an account? Sign up</Link>
        </div>
    );
};
