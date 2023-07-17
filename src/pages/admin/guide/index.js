import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/vimeo";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

const Guide = () => {
  const estoreSet = useSelector((state) => state.estoreSet);

  document.title = "Guides | " + estoreSet.name;

  const [videoId, setVideoId] = useState("841616427");
  const [videoTitle, setVideoTitle] = useState(
    "Step 1. Verifying your Email Address"
  );

  const videos = [
    { id: "841616427", title: "Step 1. Verifying your Email Address" },
    { id: "841616472", title: "Step 2. Add Categories" },
    { id: "841616531", title: "Step 3. Add Products" },
    {
      id: "845686952",
      title: "Step 4. Sample Order, Delivery Fees, and Payments",
    },
    { id: "845687441", title: "Step 5. Manage Home and Users" },
  ];

  const showGuideVideo = (vidId) => {
    const video = videos.find((vid) => vid.id === vidId);
    setVideoId(vidId);
    setVideoTitle(video.title);
  };

  const linkStyle = {
    cursor: "pointer",
    color: "#0047AB",
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>
        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>
            Guidance On How To Use Your Store
          </h4>
          <hr />
          <Alerts />

          <div onClick={() => showGuideVideo("841616427")} style={linkStyle}>
            Step 1. Verifying your Email Address
          </div>
          <div onClick={() => showGuideVideo("841616472")} style={linkStyle}>
            Step 2. Add Categories
          </div>
          <div onClick={() => showGuideVideo("841616531")} style={linkStyle}>
            Step 3. Add Products
          </div>
          <div onClick={() => showGuideVideo("845686952")} style={linkStyle}>
            Step 4. Sample Order, Delivery Fees, and Payments
          </div>
          <div onClick={() => showGuideVideo("845687441")} style={linkStyle}>
            Step 5. Manage Home and Users
          </div>
          <div>Step 6. Setup Grocey, the AI Assistant</div>
          <div>Step 7. Admin vs Personal Account</div>
          <div>Step 8. Free and Paid Upgrades</div>
          <br />
          <br />

          <div align="center" style={{ marginBottom: 20 }}>
            <label>{videoTitle}</label>
            <ReactPlayer
              url={`https://vimeo.com/${videoId}`}
              width="100%"
              controls={true}
            />
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Guide;
