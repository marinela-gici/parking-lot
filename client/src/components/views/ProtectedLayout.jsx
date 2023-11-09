import React, {useState, useEffect} from 'react';
import Sidebar from "../dashboard/Sidebar.jsx"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ProtectedLayout = ({children, updated}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get('http://localhost:8000/api/dashboard/profile', {withCredentials: true})
    .then((response) => {
      console.log(response);
      setUser(response.data);
    })
    .catch(err => {
      console.log(err);
      navigate('/');
    });
  }, [updated]);
  return (
    <>
      {user &&
        <Sidebar user={user}>
          {children}
        </Sidebar>

      }
    </>
  )
}

export default ProtectedLayout;