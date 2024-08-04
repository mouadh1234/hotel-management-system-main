import { Button, Image, Input } from "antd";
import Title from "antd/es/typography/Title";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase";
import { useSelector } from "react-redux";

function AccountDashboard() {
  const [image, setImage] = useState();
  const [listImages, setListImages] = useState();
  const [name, setName] = useState();
  const userCredential = useSelector((state) => state.user.value);
  const listImagesRef = ref(
    storage,
    `userAccount/${userCredential.authtoken}/`
  );

  console.log("authtoken", userCredential.authtoken);

  useEffect(() => {
    const listimages = async () => {
      await listAll(listImagesRef).then((response) => {
        console.log(response, listImagesRef);
        response.items.forEach((items) => {
          getDownloadURL(items).then((url) => {
            // setListImages((prev)=>[...prev,url])
            setListImages(url);
          });
        });
      });
    };
    listimages();
    // console.log(listImages);
  }, []);

  //   console.log(userCredential);
  // upload account image
  const handleSubmit = () => {
    // upload Image
    const imageRef = ref(
      storage,
      `userAccount/${userCredential.authtoken}/${image.name}`
    );
    uploadBytes(imageRef, image).then(() => {
      console.log(image, "image uploaded");
    });
  };
  return (
    <div className="p-10 col-span-5">
      <div className="  ">
        <Title>Profile</Title>
      </div>
      <div className=" rounded-lg ">
        {listImages && (
          <div>
            <Image
              style={{ width: "200px" }}
              className="rounded-full"
              src={listImages}
            />
          </div>
        )}
        <div>
          <div>
            <Input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>

          <p>Name : {userCredential.name}</p>
          <p>Email : {userCredential.email}</p>
          <p>Role:</p>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
