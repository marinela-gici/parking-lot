import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserForms = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("");
  const [loginValidation, setLoginValidaton] = useState("")
  const [validation, setValidation] = useState({})
  const navigate = useNavigate()

  const register = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/register', {
      username,
      email,
      password,
      confirmPassword,
    }, { withCredentials: true })
    .then((res) => {
      console.log(res.data)
      setValidation({})
      navigate('/dashboard')
    }).catch((err) => {
      console.log(err)
      setValidation(err.response.data.errors)
    })
  }

  const login = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/login', {
        email: loginEmail,
      password: loginPassword
    }, {withCredentials: true})
      .then(res => {
        console.log(res.data);
        setLoginValidaton({})
        navigate('/dashboard');
    })
      .catch(err => {
        console.log(err);
        setLoginValidaton(err.response.data);
    })
  }

  return (
    <div>
      <section className="bg-white">
        <div className="flex items-center justify-center mt-6">
          <button onClick={() => setIsLogin(true)}
                  className={(isLogin ? 'border-main' : '') +
                    ' w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2'}>
            sign in
          </button>

          <button onClick={() => setIsLogin(false)}
                  className={(!isLogin ? 'border-main' : '') +
                    ' w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2'}>
            sign up
          </button>
        </div>
        {!isLogin && <div className="container min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md mx-auto" onSubmit={register}>
            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 mx-3 text-gray-300"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </span>
              <input type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-bmain focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Username"/>
            </div>
            {validation.username
              ? <p
                className="text-sm text-red-600 font-bold">{validation.username.message}</p>
              : ''}
            <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 mx-3 text-gray-300"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </span>

              <input type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Email address"/>
            </div>
            {validation.email
              ? <p
                className="text-sm text-red-600 font-bold">{validation.email.message}</p>
              : ''}
            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 mx-3 text-gray-300"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </span>
              <input type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Password"/>
            </div>
            {validation.password
              ? <p
                className="text-sm text-red-600 font-bold">{validation.password.message}</p>
              : ''}
            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 mx-3 text-gray-300"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </span>
              <input type="password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40"
                     placeholder="Confirm Password"/>
            </div>
            {validation.confirmPassword
              ? <p
                className="text-sm text-red-600 font-bold">{validation.confirmPassword.message}</p>
              : ''}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-main rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-main focus:ring-opacity-50">
                Sign Up
              </button>

              <div className="mt-6 text-center ">
                <button onClick={() => setIsLogin(true)} type="button"
                        className="text-sm text-main hover:underline">
                  Already have an account?
                </button>
              </div>
            </div>
          </form>

        </div>}
      </section>


      {isLogin && <div className="container min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md mx-auto" onSubmit={login}>
          <div className="relative flex items-center mt-6">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 mx-3 text-gray-300"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </span>

            <input type="email"
                   value={loginEmail}
                   onChange={(e) => setLoginEmail(e.target.value)}
                   className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40"
                   placeholder="Email address"/>
          </div>

          <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="w-6 h-6 mx-3 text-gray-300"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                         strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </span>

            <input type="password"
                   value={loginPassword}
                   onChange={(e) => setLoginPassword(e.target.value)}
                   className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-main focus:ring-main focus:outline-none focus:ring focus:ring-opacity-40"
                   placeholder="Password"/>
          </div>
          {loginValidation
            ? <p
              className="text-sm text-red-600 font-bold">{loginValidation}</p>
            : ''}


          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-main rounded-lg hover:bg-green-800 focus:outline-none focus:ring focus:ring-main focus:ring-opacity-50">
              Login
            </button>

            <div className="mt-6 text-center ">
              <button type="button" onClick={() => setIsLogin(!true)}
                      className="text-sm text-main hover:underline">
                No account yet?
              </button>
            </div>
          </div>
        </form>

      </div>}
    </div>)
}

export default UserForms