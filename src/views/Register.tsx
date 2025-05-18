import { Link } from "react-router";
import Form from "./SignupForm";

export default function Register() {
    return (
        <div className="bg-white rounded-lg px-5 mt-10 py-4 text-black">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <Form />
            <Link to="/auth/login">Already have an account? Sign in</Link>
        </div>
    );
};
