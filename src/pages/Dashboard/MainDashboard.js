import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import Title from "antd/es/typography/Title";
import { Button, Card, DatePicker } from "antd";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./index.css";
import { getRooms } from "../../redux/RoomSlice";
import PieChart from "../../components/Charts/PieChart";

function MainDashboard() {
  const [roomList, setRoomList] = useState("");
  const dispatch = useDispatch();
  const RoomCollection = collection(db, "rooms");
  const userCredentials = useSelector((state) => state.user.value);

  const gridStyle = {
    textAlign: "center",
  };

  // get all rooms
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const data = await getDocs(RoomCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRoomList(filteredData);
        dispatch(getRooms(filteredData));
        // roomList.map((item)=>console.log(item.Price))
      } catch (err) {
        console.log(err);
      }
    };
    handleSubmit();
  }, []);

  console.log("running");
  return (
    <div className="col-span-5 ">
      {/* <ResponsiveSidebar /> */}

      <div className="p-10 ">
        <div className="h-[10vh] w-full">
          <div className="flex justify-between ">
            <Title className="my-auto ">Dashboard</Title>

            <div className="my-auto">Resort</div>
            <div className="my-auto">
              <p>
                Good Morning!{" "}
                <span className="capitalize">{userCredentials.name} </span> |
              </p>
            </div>
            <div className="my-auto">
              <Link to={"/add-reservation"}>
                <Button className="flex gap-2 my-auto">
                  <FiEdit className="my-1" /> New Reservation{" "}
                </Button>
              </Link>
            </div>
            <div></div>
            <div className="my-auto">
              <div class="">
                <div class="dropdown inline-block relative">
                  <button class="  py-2 px-4 rounded inline-flex items-center">
                    <span class="mr-1">Account</span>
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                    </svg>
                  </button>
                  <ul class="dropdown-menu absolute hidden text-gray-700 pt-1 min-w-32">
                    <li class="">
                      <a
                        class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="/"
                      >
                        Profile
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        sessionStorage.clear();
                        window.location.reload();
                      }}
                      className="cursor-pointer"
                    >
                      <p class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section  */}
        <div className=" grid lg:grid-cols-6 gap-5  mr-10 ">
          <div className="bg-green-300 rounded p-2 ">
            Total Rooms : {roomList.length}
          </div>
          <div className="bg-orange-300 rounded p-2 ">Reservations : 50</div>
          <div className="bg-blue-300 rounded p-2 ">Staffs : 50</div>
          <div className="bg-gray-300 rounded p-2 ">Booked Rooms : 50</div>
          <div className="bg-lime-300 rounded p-2 ">Available Rooms : 50</div>
          <div className="bg-slate-300 rounded p-2 ">Checked In : 50</div>
        </div>
        <div className="pt-20">
          <Card title="Quick Links">
            <div className="grid grid-cols-4 cursor-pointer ">
              <Link to={"/reservation"}>
                <Card.Grid style={{ width: "100%" }}>New Reservation</Card.Grid>
              </Link>
              <Card.Grid style={{ width: "100%" }}>Check IN</Card.Grid>
              <Card.Grid style={{ width: "100%" }}>Check Out</Card.Grid>
              <Card.Grid style={{ width: "100%" }}>Reservations</Card.Grid>
              <Card.Grid style={{ width: "100%" }}>Kitchen</Card.Grid>
              <Card.Grid style={{ width: "100%" }}>Staffs</Card.Grid>
              <Card.Grid style={{ width: "100%" }}>Calendar</Card.Grid>
              <Card.Grid style={{ width: "100%" }}>Reports</Card.Grid>
            </div>
          </Card>
        </div>
        {/* <div>
          <div className="grid grid-cols-3 gap-5 my-10  pt-[12vh] mr-10 ">
            <div className="bg-gray-400 p-10 h-[100%] rounded-lg">
              <p className="">Booking</p>
              <p className="">Create Room Booking</p>
            </div>
            <div className="bg-gray-400 p-10 h-[100%] rounded-lg">
              <p className="">Check In</p>
              <p className="">Check In Room</p>
            </div>
            <div className="bg-gray-400 p-10 h-[100%] rounded-lg">
              <p className="">Check Out</p>
              <p className="">Check Out Room</p>
            </div>
            <div className="bg-gray-400 p-10 h-[100%] rounded-lg">
              <p className="">Room Food</p>
              <p className=""> Create New Orders</p>
            </div>
          </div>
        </div> */}
        {/* <div className="my-10  ml-[20vw] pt-[12vh] mr-10">
          <h2 className="my-5 text-3xl font-semibold">Available Rooms</h2>
          <table className="w-full border bg-white  ">
            <thead>
              <tr className="border">
                <td className=" py-4 text-xl font-bold text-center">Name</td>
                <td className=" py-4 text-xl font-bold text-center">Price</td>
                <td className=" py-4 text-xl font-bold text-center">
                  Category
                </td>
                <td className=" py-4 text-xl font-bold text-center">Floor</td>
                <td className=" py-4 text-xl font-bold text-center">
                  Room Number
                </td>
                <td className=" py-4 text-xl font-bold text-center">
                  Cleaning Status
                </td>
                <td className=" py-4 text-xl font-bold text-center">
                  Bed Type
                </td>
              </tr>
            </thead>
            <tbody>
              {roomList &&
                roomList.map((rooms, key) => {
                  if (
                    rooms.Availablility === true &&
                    rooms.CleaningStatus === "clean"
                  ) {
                    return (
                      <tr
                        key={key}
                        style={{
                          backgroundColor: rooms.Availablility
                            ? "#f0fdf4"
                            : "#fecaca",
                        }}
                        className="border hover:bg-green-200"
                      >
                        <td className="py-2 text-center">{rooms.RoomName}</td>
                        <td className="py-2 text-center">{rooms.Price}</td>
                        <td className="py-2 text-center">{rooms.Category}</td>
                        <td className="py-2 text-center">{rooms.Floor}</td>
                        <td className="py-2 text-center">{rooms.RoomNumber}</td>
                        <td className="py-2 text-center">
                          {rooms.CleaningStatus}
                        </td>
                        <td className="py-2 text-center">{rooms.BedType}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}

export default MainDashboard;
