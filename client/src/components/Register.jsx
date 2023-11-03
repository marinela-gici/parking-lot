import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validation, setValidation] = useState({});

    const navigate = useNavigate();
    const register = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/register",
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log(response);
                setValidation({});
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
                setValidation(err.response.data.errors);
            });
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up
                </h2>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={register}>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setFirstName(e.target.value)}
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {/*{validation.firstName ? <p className="text-sm text-red-600 font-bold">{validation.firstName.message}</p> : ''}*/}
                        </div>
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setLastName(e.target.value)}
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {/*{validation.lastName ? <p className="text-sm text-red-600 font-bold">{validation.lastName.message}</p> : ''}*/}
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {/*{validation.email ? <p className="text-sm text-red-600 font-bold">{validation.email.message}</p> : ''}*/}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    name="password"
                                    value={password}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {/*{validation.password ? <p className="text-sm text-red-600 font-bold">{validation.password.message}</p> : ''}*/}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="confirm-password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Confirm password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {/*{validation.confirmPassword ? <p className="text-sm text-red-600 font-bold">{validation.confirmPassword.message}</p> : ''}*/}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <button
                            className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
