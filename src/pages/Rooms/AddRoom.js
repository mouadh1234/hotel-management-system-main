import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Button, Space, Switch } from "antd";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import ResponsiveSidebar from "../../components/ResponsiveSidebar";
import { Link } from "react-router-dom";

function AddRoom() {
  const [image, setImage] = useState();
  const [roomDetails, setRoomDetails] = useState({
    RoomName: "",
    Category: "",
    RoomNumber: null,
    BedType: "",
    NumberOfBeds: 1,
    AC: true,
    Toilets: 0,
    Floor: "",
    CleaningStatus: "",
    Price: null,
    Availablility: true,
    tax: 0,
  });
  const RoomCollection = collection(db, "rooms");

  // console.log("images", roomDetails);

  const handleSubmit = async () => {
    // Check if all required fields are filled out
    const requiredFields = [
      "RoomName",
      "Category",
      "RoomNumber",
      "BedType",
      "NumberOfBeds",
      "Toilets",
      "Floor",
      "CleaningStatus",
      "Price",
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => !roomDetails[field]);

    if (isAnyFieldEmpty) {
      // Display an error message to the user or handle the validation error in any other way
      alert("Please fill out all the required fields.");
      return;
    }

    try {
      // upload Image
      const imageRef = ref(storage, `${roomDetails.RoomName}/${image.name}`);
      uploadBytes(imageRef, image).then(() => {
        console.log(image, "image uploaded");
      });

      await addDoc(RoomCollection, roomDetails);
      // Reset the form after successful submission
      setRoomDetails({
        RoomName: "",
        Category: "",
        RoomNumber: null,
        BedType: "",
        NumberOfBeds: 1,
        AC: true,
        Toilets: 0,
        Floor: "",
        CleaningStatus: "",
        Price: null,
        Availablility: true,
        tax: 0,
      });

      alert("Room details added successfully!");
      window.location.replace("/rooms");
    } catch (err) {
      console.log(err);
      alert("An error occurred while adding room details. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevRoomDetails) => ({
      ...prevRoomDetails,
      [name]: value,
    }));
  };

  // Upload Images

  return (
    <div className="col-span-5">
      {/* <ResponsiveSidebar /> */}
      <div className="p-10">
        {" "}
        <h2 className=" text-3xl font-semibold">Rooms</h2>
        <p>
          <a href="/rooms">Rooms</a>/Add Rooms
        </p>
        <div className="border mr-10 rounded grid lg:grid-cols-4 text-xl p-5 mt-10">
          <div className="py-5">
            <label htmlFor="" className="">
              Name :{" "}
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="RoomName"
              id=""
              required
              className="border rounded px-2"
            />
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Category :{" "}
            </label>
            <select onChange={handleChange} name="Category">
              <option>Suite</option>
              <option>Premium</option>
              <option>Economy</option>
              <option>Double</option>
            </select>
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Room Number :{" "}
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="RoomNumber"
              id=""
              className="border rounded px-2"
            />{" "}
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Bed Type :{" "}
            </label>
            <select onChange={handleChange} name="BedType">
              <option>Queen bed</option>
              <option>Twin Bed</option>
              <option>Standard Double bed</option>
              <option>King Bed</option>
            </select>
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Number Of Beds :{" "}
            </label>
            <select onChange={handleChange} name="NumberOfBeds">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              A/C :{" "}
            </label>
            <Space direction="vertical">
              <Switch
                onChange={() =>
                  setRoomDetails((prev) => ({
                    ...prev,
                    AC: !roomDetails.AC,
                  }))
                }
                checkedChildren="Yes"
                unCheckedChildren="No"
                defaultChecked
              />
            </Space>
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Toilets :{" "}
            </label>
            <select onChange={handleChange} name="Toilets">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Floor :{" "}
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="Floor"
              id=""
              className="border rounded px-2"
            />{" "}
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Cleaning Status :{" "}
            </label>
            <select
              id="cleaningStatus"
              onChange={handleChange}
              name="CleaningStatus"
            >
              <option value="">Select</option>
              <option value="vacant">Vacant</option>
              <option value="houseUse">House Use</option>
              <option value="occupied">Occupied</option>
              <option value="inspecting">Inspecting</option>
              <option value="underMaintenance">Under Maintenance</option>
              <option value="pendingCleaning">Pending Cleaning</option>
              <option value="partiallyCleaned">Partially Cleaned</option>
              <option value="outOfService">Out of Service</option>
              <option value="cleaningInProgress">Cleaning in Progress</option>
            </select>
          </div>
          <div className="py-5">
            <label htmlFor="" className="">
              Price :{" "}
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="Price"
              id=""
              className="border rounded px-2"
            />{" "}
          </div>
        </div>
        <div className="mt-10 border rounded p-5 mr-10">
          Images :
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        {/* <Button className="float-right mr-10 my-10" >
          Add Room
        </Button> */}
        <div className="py-10 mr-10">
            <Button className="float-right mx-2" onClick={handleSubmit}>Submit</Button>
            <Link to={"/rooms"}>
              <Button className="float-right" danger>
                Go Back
              </Button>
            </Link>
          </div>
      </div>
    </div>
  );
}

export default AddRoom;
