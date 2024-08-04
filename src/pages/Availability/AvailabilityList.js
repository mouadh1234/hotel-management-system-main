import { DatePicker } from "antd";
import React, { useState } from "react";

function AvailabilityList() {
  // Calendar
  const [value, setValue] = useState();
  // console.log(value);
  // Calendar end
  return (
    <div>
      {/* <ResponsiveSidebar/> */}
      <div className=" col-span-5 p-10 mr-10">
        <div>
          <DatePicker
            style={{
              width: "170%",
            }}
            onChange={(e) => setValue(e.$d)}
          ></DatePicker>
        </div>
        <div className="bg-gray-300 my-10">
          <div className=" bg-red-500 w-10 h-10"></div>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityList;
