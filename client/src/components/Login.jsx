import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [validation, setValidation] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/login', {
                    email: loginEmail,
                    password: loginPassword
                },
                {withCredentials: true})
            .then(response => {
                console.log(response);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
                setValidation(err.response.data.error)
            })

    }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={login}>
                        <div>
                            <label
                                htmlFor="login-email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    id="login-email"
                                    name="login-email"
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    id="login-password"
                                    name="login-password"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {/*{validation ? <p className="text-sm text-red-600 font-bold mb-3">{validation}</p> : ""}*/}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <button
                            // onClick={() => setShowLogin(false)}
                            className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Register now
                        </button>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login;