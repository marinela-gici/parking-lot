
import './App.css'
import GetStreets from "./components/GetStreets.jsx";
import PublicLayout from "./components/views/PublicLayout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/views/Main.jsx";
import UserForms from './components/UserForms.jsx'
import ProtectedLayout from './components/views/ProtectedLayout.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import ParkingLots from './components/dashboard/ParkingLots.jsx'
import CreateParkingLot from './components/dashboard/CreateParkingLot.jsx'
import AllParkings from './components/AllParkings.jsx'

function App() {

  return (
      <BrowserRouter>
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
                     <AllParkings />
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
          <Route path='/dashboard/create-parking' element={
            <ProtectedLayout>
              <CreateParkingLot />
            </ProtectedLayout>}>
          </Route>
        </Routes>
      </BrowserRouter>

  )
}

export default App
