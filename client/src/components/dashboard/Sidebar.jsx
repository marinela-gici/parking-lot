import {React, useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import { Link, useMatch, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, children } = props;
  const navigate = useNavigate();

  const matchDashboard = useMatch('/dashboard');
  const matchParkingLots = useMatch('dashboard/parking-lots');
  // const matchPosts = useMatch('/user/posts');

  const logout = () => {
    axios
    .post('http://localhost:8000/api/logout', {},{withCredentials: true})
    .then(res => {
      console.log(res.data);
      navigate('/');
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-second">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button type="button" onClick={() => setIsOpen(prev => !prev)}
                      className="inline-flex items-center p-2 text-sm text-white rounded-lg sm:hidden hover:bg-light-blue">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
              <Link to='/dashboard' className="flex ml-2 md:mr-24">
                <img src={logo} className="h-8 mr-3 hidden md:block" alt="Logo"/>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="relative"
                     onBlur={(e) => {
                       if (!e.currentTarget.contains(e.relatedTarget)) {
                         setIsProfileOpen(false);
                       }
                     }
                     }>
                  <button type="button"
                          onClick={() => setIsProfileOpen(prev => !prev)}
                          className="capitalize flex items-end text-sm text-white"
                          aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    {user.username}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ms-1">
                      <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
                    </svg>

                    <span className="sr-only">Open user menu</span>
                  </button>

                  <div
                    className={(isProfileOpen ? '' : 'hidden') + " absolute w-max right-[17px] inset-auto z-50 my-4 text-base list-none bg-second divide-y divide-gray-100 rounded shadow"}
                    id="dropdown-user">
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-white" role="none">
                        {user.username}
                      </p>
                      <p className="text-sm font-medium text-white truncate" role="none">
                        {user.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link to='/dashboard/update-profile'
                              className="block px-4 py-2 text-sm text-white hover:bg-light-blue"
                              role="menuitem">Profile
                        </Link>
                      </li>
                      <li>
                        <Link to='/dashboard/change-password'
                              className="block px-4 py-2 text-sm text-white hover:bg-light-blue"
                              role="menuitem">Password
                        </Link>
                      </li>
                      <li>
                        <button onClick={logout}
                              className="block px-4 py-2 text-sm text-white hover:bg-light-blue"
                              role="menuitem">Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
             className={(isOpen ? '' : '-translate-x-full') + " fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-second border-r border-gray-200 sm:translate-x-0"}
             aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-second ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to='/dashboard'
                    className="flex items-center p-2 text-white rounded-lg hover:bg-light-blue group">
                <span className={matchDashboard ? "flex-1 whitespace-nowrap" : ""}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to='/dashboard/parking-lots'
                    className="flex items-center p-2 text-white rounded-lg hover:bg-light-blue group">
                <span className="flex-1 whitespace-nowrap">Parking lots</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 mt-14">
        {children}
      </div>

    </>
  )
}

export default Sidebar