
import './App.css'
import PublicLayout from "./components/views/PublicLayout.jsx";
import io from 'socket.io-client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/views/Main.jsx";
import UserForms from './components/UserForms.jsx'
import ProtectedLayout from './components/views/ProtectedLayout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import ParkingLots from './components/dashboard/ParkingLots.jsx'
import CreateParkingLot from './components/dashboard/CreateParkingLot.jsx'
import AllParkings from './components/AllParkings.jsx'
import UpdateProfile from './components/dashboard/UpdateProfile.jsx'
import { useState, useRef } from 'react'
import ChangePassword from './components/dashboard/ChangePassword.jsx'
import ParkingDetails from './components/ParkingDetails.jsx'
import ParkingLotDetails from './components/dashboard/ParkingLotDetails.jsx'
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const socket = io('http://127.0.0.1:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });
const [updated, setUpdated] = useState(false);
  const ref = useRef(null);
  return (
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
            <Route exact path="/"
                   element={
                       <PublicLayout>
                           <Main />
                       </PublicLayout>
                   }>
            </Route>
          <Route exact path="/login"
                 element={
                   <PublicLayout>
                     <UserForms />
                   </PublicLayout>
                 }>
          </Route>
          <Route exact path="/locations"
                 element={
                   <PublicLayout>
                     <AllParkings socket={socket} />
                   </PublicLayout>
                 }>
          </Route>
          <Route exact path="/parkings/:id/details"
                 element={
                   <PublicLayout>
                     <ParkingDetails socket={socket} />
                   </PublicLayout>
                 }>
          </Route>
          <Route path='/dashboard' element={
            <ProtectedLayout>
              <Dashboard/>
            </ProtectedLayout>}>
          </Route>
          <Route path='/dashboard/parking-lots' element={
            <ProtectedLayout>
              <ParkingLots />
            </ProtectedLayout>}>
          </Route>
          <Route path='/dashboard/parking-lots/:id' element={
            <ProtectedLayout>
              <ParkingLotDetails />
            </ProtectedLayout>}>
          </Route>
          <Route path='/dashboard/create-parking' element={
            <ProtectedLayout>
              <CreateParkingLot />
            </ProtectedLayout>}>
          </Route>
          <Route path='/dashboard/update-profile' element={
            <ProtectedLayout updated={updated}>
              <UpdateProfile setUpdated={setUpdated} />
            </ProtectedLayout>}>
          </Route>
          <Route path='/dashboard/change-password' element={
            <ProtectedLayout >
              <ChangePassword />
            </ProtectedLayout>}>
          </Route>
        </Routes>
      </BrowserRouter>

  )
}

export default App
