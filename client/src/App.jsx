
import './App.css'
import GetStreets from "./components/GetStreets.jsx";
import PublicLayout from "./components/views/PublicLayout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./components/views/Main.jsx";

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
        </Routes>
      </BrowserRouter>

  )
}

export default App
