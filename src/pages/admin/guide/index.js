import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/vimeo";
import { useSearchParams } from "react-router-dom";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

const Guide = () => {
  const estoreSet = useSelector((state) => state.estoreSet);
  const [searchParams] = useSearchParams();
  const videoid = searchParams.get("videoid");

  document.title = "Guides | " + estoreSet.name;

  const [videoId, setVideoId] = useState("846473671");
  const [videoTitle, setVideoTitle] = useState("Watch this Video First");

  const videos = [
    { id: "846473671", title: "Watch this Video First" },
    { id: "841616427", title: "Step 1. Verifying your Email Address" },
    { id: "841616472", title: "Step 2. Add Categories" },
    { id: "841616531", title: "Step 3. Add Products" },
    {
      id: "845686952",
      title: "Step 4. Sample Order, Delivery Fees, and Payments",
    },
    { id: "845687441", title: "Step 5. Manage Home and Users" },
    { id: "853894520", title: "Step 6. How to Enable or Disable Notification" },
    { id: "855303233", title: "Step 7. Setup Grocey, the AI Assistant" },
    {
      id: "855311650",
      title: "Step 8. Admin vs Personal Account In Different Devices",
    },
    { id: "855333748", title: "Step 9. Free Upgrades vs Fully Upgrades" },
  ];

  useEffect(() => {
    if (videoid) {
      setTimeout(() => {
        showGuideVideo(videoid);
      }, 1000);
    }
  }, [videoid]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <h4 style={{ margin: "20px 0" }}>{videoTitle}</h4>
          <hr />
          <Alerts />

          <div onClick={() => showGuideVideo("846473671")} style={linkStyle}>
            Watch this Video First
          </div>
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
          <div onClick={() => showGuideVideo("853894520")} style={linkStyle}>
            Step 6. How to Enable or Disable Notification
          </div>
          <div onClick={() => showGuideVideo("855303233")} style={linkStyle}>
            Step 7. Setup Grocey, the AI Assistant
          </div>
          <div onClick={() => showGuideVideo("855311650")} style={linkStyle}>
            Step 8. Admin vs Personal Account In Different Devices
          </div>
          <div onClick={() => showGuideVideo("855333748")} style={linkStyle}>
            Step 9. Free Upgrades vs Fully Upgrades
          </div>
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
