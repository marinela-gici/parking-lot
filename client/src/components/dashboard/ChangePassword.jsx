import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const updatePassword = (e) => {
    e.preventDefault();
    axios
    .post('http://localhost:8000/api/dashboard/profile/change-password', {
      password,
      newPassword,
      confirmNewPassword
    }, {withCredentials: true})
    .then((res) => {
      console.log(res.data);
      navigate('/dashboard');
    })
    .catch((error) => {
      console.log(error);
      setValidation(error.response.data.errors);
    })

  }
  return (
    <div>
      <div className="min-h-[calc(100vh-64px)] p-8">
        <form
          onSubmit={updatePassword}
          className="bg-second lg:w-1/2 w-full mx-auto p-12 shadow-box rounded-md"
        >
          <h2 className="center text-3xl text-white font-bold text-center">
            Update Password
          </h2>
          <div className="relative z-0 w-full my-6 group">
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {validation.password ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.password.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="relative z-0 w-full my-6 group">
            <input
              value={newPassword}
              type="password"
              name="new-password"
              id="new-password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label
              htmlFor="new-password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New password
            </label>
            {validation.newPassword ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.newPassword.message}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="relative z-0 w-full my-6 group">
            <input
              value={confirmNewPassword}
              type="password"
              name="confirm-new-password"
              id="confirm-new-password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-main appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <label
              htmlFor="confirm-new-password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm new password
            </label>
            {validation.confirmNewPassword ? (
              <p className="text-sm text-red-600 font-bold">
                {validation.confirmNewPassword.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            type="submit"
            className="bg-main hover:bg-green-800 rounded-md md:px-6 px-4 md:py-3 py-2 text-lg font-semibold text-white shadow-sm">
            Update Password
          </button>
        </form>
      </div>
    </div>


  )
}

export default ChangePassword;