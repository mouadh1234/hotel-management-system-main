import React from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const { Option } = Select;

function AddReservation() {
  // Rooms from store
  const rooms = useSelector((state) => state.rooms.value);

  // dropdown
  const items = [
    {
      label: "Aadhar Card",
      key: "Aadhar Card",
      icon: <UserOutlined />,
    },
    {
      label: "Pan Card",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "Voters Id",
      key: "3",
      icon: <UserOutlined />,
      // danger: true,
    },
    {
      label: "Passport",
      key: "4",
      icon: <UserOutlined />,
      // danger: true,
      // disabled: true,
    },
  ];

  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  // dropdown

  // upload
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  // upload

  // Mobile Number
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
    // Mobile Number
  );
  return (
    <div className="col-span-5 ">
      {/* <ResponsiveSidebar /> */}
      <div className="p-10 ">
        <h1 className="py-5 text-4xl font-bold">Add new reservation</h1>
        <div className="border rounded p-10 py-10">
          <h3 className="text-lg font-semibold py-2">Personal info</h3>
          <div className="grid grid-cols-2 border rounded py-4 px-4">
            <p htmlFor="" className="p-2">
              Name :
              <input
                type="text"
                className="border rounded px-2"
                placeholder="Name.."
              />
            </p>
            <p htmlFor="" className="p-2">
              {/* Mobile Number :{" "} */}
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "80%",
                  }}
                />
              </Form.Item>
            </p>
            <span className="flex my-3">
              <p className="my-1 px-2">ID Proof :</p>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Id Proof
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </span>

            <Upload
              // action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload ID</div>
              </div>
            </Upload>
          </div>
          <h3 className="text-lg font-semibold py-2">Time/Room Info</h3>
          <div className="grid grid-cols-2 border rounded py-4 px-4">
            <p htmlFor="" className="p-2">
            <Form.Item
                name="Check in"
                label="Check In"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                {" "}
                <DatePicker />
              </Form.Item>
            </p>
            <p htmlFor="" className="p-2">
              <Form.Item
                name="Check Out"
                label="Check Out"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                {" "}
                <DatePicker />
              </Form.Item>
            </p>
            <p htmlFor="" className="p-2">
              <Form.Item
                name="select-multiple"
                label="Rooms Booked"
                rules={[
                  {
                    required: true,
                    message: " Select Rooms Booked",
                    type: "array",
                  },
                ]}
              >
                <Select mode="multiple" placeholder=" select Rooms Booked">
                  {rooms?.map((item, key) => {
                    return <Option value={key}>{item.RoomName}</Option>;
                  })}
                </Select>
              </Form.Item>
            </p>
            <p htmlFor="" className="p-2">
              Number of Rooms : dropdown
            </p>
            <p htmlFor="" className="p-2">
              Number of pax :
              <input
                type="text"
                className="border rounded "
                placeholder="Pax..."
              />
            </p>
            <p htmlFor="" className="p-2">
              Number of Nights : dropdown
            </p>
            <p htmlFor="" className="p-2">
              Number of Adults : dropdown
            </p>
            <p htmlFor="" className="p-2">
              Number of Children : dropdown
            </p>
            <p htmlFor="" className="p-2">
              Number of Extra bed :dropdown
            </p>
            <p htmlFor="" className="p-2">
              Food Plan : dropdown
            </p>
          </div>
          <h3 className="text-lg font-semibold py-2">Rate Info</h3>
          <div className="grid grid-cols-2 border rounded py-4 px-4">
            <p htmlFor="" className="p-2">
              Net Amount :{" "}
              <input
                type="text"
                className="border rounded "
                placeholder="Amount.."
              />
            </p>
            <p htmlFor="" className="p-2">
              Total Amount :
            </p>
            <p htmlFor="" className="p-2">
              Advance Paid :
            </p>
            <p htmlFor="" className="p-2">
              Balance to be paid :
            </p>
            <p htmlFor="" className="p-2">
              Confirmed by :
            </p>
          </div>
          <div className="py-10 ">
            <Button className="float-right mx-2">Submit</Button>
            <Link to={"/reservation"}>
              <Button className="float-right" danger>
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReservation;
