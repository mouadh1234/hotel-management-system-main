import React from "react";
import Sidebar from "../../components/Sidebar";
import ResponsiveSidebar from "../../components/ResponsiveSidebar";
import { Button } from "antd";
import { Link } from "react-router-dom";

function ReservationList() {
  return (
    <div className="col-span-5">
      {/* <ResponsiveSidebar /> */}
      <div className="p-10 mr-10 ">
        <div className="float-right mr-10">
          <Link to={'/add-reservation'}>
          <Button >
            New Reservation
          </Button></Link>
        </div>

        <h1 className="py-5 text-4xl font-bold">Reservations</h1>
        <div>
          list of reservations----
        </div>
      </div>
    </div>
  );
}

export default ReservationList;
