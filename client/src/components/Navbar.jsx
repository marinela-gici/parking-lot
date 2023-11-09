import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png';
import {Link} from "react-router-dom";
import axios from 'axios'

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        axios
          .get('http://localhost:8000/api/dashboard/profile', {withCredentials: true})
          .then(res => {
              console.log(res.data);
              setUser(res.data)
        })
          .catch(err => console.log(err))
    }, [])

    const navigation = [
        {'name': 'Home', 'href': '/'},
        {'name': 'Locations', 'href': '/locations'},
        {'name': (user? 'Dashboard' : 'Login'), 'href': (user ? '/dashboard' : '/login')},
    ]
    return (
        <>
                <nav className="bg-white border-gray-200">
                    <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="#" className="flex items-center">
                            <img src={logo} className="h-12 mr-3" alt="Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">ParkALot</span>
                        </a>
                        <button onClick={() => setShowNav(prev => !prev)} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-main" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                        <div className={(!showNav ? 'hidden' : '') + " bg-white md:relative absolute z-10 md:top-auto top-[80px] left-0 w-full md:block md:w-auto"} id="navbar-default">
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                                {navigation && navigation.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={item.href} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-main md:hover:bg-transparent md:border-0 md:p-0">{item.name}</Link>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>
                </nav>
        </>
    )
}

export default Navbar;
