import * as React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";

import Nav from "../UI/Nav/Nav";
import Home from "../Home/Home";
import Reservations from "../Reservation Components/Reservations/Reservations";
import SpaceList from "../Reservation Components/SpaceList/SpaceList";
import SpaceView from "../Reservation Components/SpaceView/SpaceView";
import Visits from "../Visits Components/Visits/Visits";
import VisitForm from "../Visits Components/VisitForm/VisitForm";
import { validateUserState } from "../../Firebase/firebaseApi";
import Login from "../User Manage Components/Login/Login";
import Register from "../User Manage Components/Register/Register";
import { useDispatch } from "react-redux";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    validateUserState(navigate, dispatch);
  }, []);

  return (
    <div className="App">
      {location.pathname === "/" || location.pathname === "/Registro" ? (
        ""
      ) : (
        <Nav></Nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="Registro" element={<Register />} />

        <Route path="Inicio" element={<Home />} />

        <Route path="Visitas" element={<Visits />} />
        <Route path="Visitas/form" element={<VisitForm />} />

        <Route path="Reservas" element={<Reservations />} />
        <Route path="Reservas/list" element={<SpaceList />} />
        <Route path="Reservas/form/:id" element={<SpaceView />} />

        <Route
          path="Social"
          element={
            <div className="comingSoon">
              <h1 className="textLoading">Coming Soon...</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
