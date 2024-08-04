import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import MainDashboard from "./pages/Dashboard/MainDashboard";

import AddReservation from "./pages/Reservations/AddReservation";

import AddRoom from "./pages/Rooms/AddRoom";
import ListRooms from "./pages/Rooms/ListRooms";
import AvailabilityList from "./pages/Availability/AvailabilityList";
import { useSelector } from "react-redux";
import ReservationList from "./pages/Reservations/ReservationList";
import ResponsiveSidebar from "./components/ResponsiveSidebar";
import SelectOrganisation from "./pages/Organisation/SelectOrganisation";
import AccountDashboard from "./pages/Account/AccountDashboard";
import ReportDashboard from "./pages/Reports/ReportDashboard";

function App() {
  const userCredential = useSelector((state) => state.user.value);
  if (!userCredential.authtoken) {
    return <Login />;
  }
  console.log(window.location.pathname);

  return (
    <div className="wrapper flex ">
      <Router>
        {window.location.pathname === "/" ||
          (window.location.pathname !== "/organisation" && (
            <ResponsiveSidebar />
          ))}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/organisation" element={<SelectOrganisation />} />

          {/* COMMON ROUTES */}
          <Route exact path="/createuser" element={<CreateUser />} />
          <Route exact path="/rooms" element={<ListRooms />} />
          <Route exact path="/dashboard" element={<MainDashboard />} />
          <Route exact path="/reservation" element={<ReservationList />} />
          <Route exact path="/add-room" element={<AddRoom />} />
          <Route exact path="/add-reservation" element={<AddReservation />} />
          <Route exact path="/availability" element={<AvailabilityList />} />
          <Route exact path="/account" element={<AccountDashboard />} />
          <Route exact path="/reports" element={<ReportDashboard />} />

          {/* RESET PASSWORD ROUTES */}
          {/* <Route
                        exact
                        path="/resetpassword"
                        element={<ResetPassword />}
                    />
                    <Route
                        exact
                        path="/password-reset/checkemail"
                        element={<CheckEmail />}
                    />
                    <Route
                        exact
                        path="/password-reset/setpassword"
                        element={<SetPassword />}
                    />
                    <Route
                        exact
                        path="/password-reset/resetsuccess"
                        element={<ResetSuccess />}
                    /> */}

          {/* DASHBOARD */}
          {/* <Route exact path="/dashboard" element={<Dashboard />} />


                    <Route
                        exact
                        path="/pages/assetOverview"
                        element={<AssetOverview />}
                    />
                    <Route
                        exact
                        path="/assetoverview"
                        element={<AssetOverview />}
                    />

                    <Route exact path="/pages/devices" element={<Devices />} />
                    <Route
                        exact
                        path="/pages/manage/venue"
                        element={<ManageVenue />}
                    />
                    <Route
                        exact
                        path="/pages/manage/building"
                        element={<ManageBuilding />}
                    /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
