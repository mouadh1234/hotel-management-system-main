import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, message } from "antd";
import { Link } from "react-router-dom";
import { getRooms } from "../../redux/RoomSlice";
import ModalBox from "../../components/ModalBox";

function ListRooms() {
  const RoomCollection = collection(db, "rooms");
  const dispatch = useDispatch();
  const [roomList, setRoomList] = useState();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  // Fetch roomlist
  const GetRoomList = async () => {
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

  useEffect(() => {
    GetRoomList();
  }, []);

  //   Delete a Room
  const deleteRoom = async (id) => {
    showModal()
    const roomDoc = doc(db, "rooms", id);
    await deleteDoc(roomDoc);
    console.log(id);
  };

  // calling the list
  // useEffect(() => {
  //     handleSubmit();
  //   },[]);

  console.log("running");

  // table

  const data = roomList?.map((item, key) => {
    return {
      key: key,
      name: item.RoomName,
      category: item.Category,
      floor: item.Floor,
      roomNumber: item.RoomNumber,
      bedType: item.BedType,
      price: item.Price,
      id: item.id,
    };
  });
  // console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.roomNumber - b.roomNumber,
    },
    {
      title: "Price",
      dataIndex: "price",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Floor",
      dataIndex: "floor",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Bed Type",
      dataIndex: "bedType",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (record) => (
        <Button onClick={() => deleteRoom(record)}>Delete</Button>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className=" col-span-5">
      {/* <ResponsiveSidebar /> */}
      <div className=" p-10 mr-10">
        <div className="float-right mr-10">
          <Link to={"/add-room"}>
            <Button>Add New Room</Button>
          </Link>
        </div>
        <h2 className="my-5 text-3xl font-semibold">Rooms</h2>
      <ModalBox open={open} setOpen={setOpen}/>
        <Table columns={columns} dataSource={data} onChange={onChange} />

        {/* <table className="w-full border ">
          <thead>
            <tr className="border">
              <td className=" py-4 text-xl font-bold text-center">Name</td>
              <td className=" py-4 text-xl font-bold text-center">Price</td>
              <td className=" py-4 text-xl font-bold text-center">Category</td>
              <td className=" py-4 text-xl font-bold text-center">Floor</td>
              <td className=" py-4 text-xl font-bold text-center">
                Room Number
              </td>
              <td className=" py-4 text-xl font-bold text-center">Bed Type</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {roomList &&
              roomList.map((rooms, key) => {
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
                    <td className="py-2 text-center">{rooms.BedType}</td>
                    <td className="flex gap-2 py-2">
                      <RiEditFill />
                      <button onClick={() => deleteRoom(rooms.id)}>
                        <RiDeleteBin6Fill />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default ListRooms;
