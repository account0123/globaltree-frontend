import { Link } from "react-router";
import { APP_NAME } from "../lib/config";
import LoginForm from "./LoginForm";

export default function Login() {
    return (
        <div className="bg-white rounded-lg px-5 mt-10 py-4 text-black">
            <h1 className="text-3xl font-bold">Sign into {APP_NAME}</h1>
            <LoginForm />
            <Link to="/auth/create">Don't have an account? Sign up</Link>
        </div>
    );
};
