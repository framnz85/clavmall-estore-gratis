import React from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player/vimeo";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

const Guide = () => {
  const estoreSet = useSelector((state) => state.estoreSet);

  document.title = "Guides | " + estoreSet.name;

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

          <div>Step 1. Verifying your Email Address</div>
          <div>Step 2. Add Categories</div>
          <div>Step 3. Add Products</div>
          <div>Step 4. Add Payments</div>
          <div>Step 5. Manage Home and Users</div>
          <div>Step 6. Setup Grocey, the AI Assistant</div>
          <div>Step 7. Admin vs Personal Account</div>
          <div>Step 8. Free and Paid Upgrades</div>
          <br />
          <br />

          <div align="center" style={{ marginBottom: 20 }}>
            <label>Step 1. Verifying your Email Address</label>
            <ReactPlayer
              url={`https://vimeo.com/841616427`}
              width="100%"
              controls={true}
            />
          </div>

          <div align="center" style={{ marginBottom: 20 }}>
            <label>Step 2. Add Categories</label>
            <ReactPlayer
              url={`https://vimeo.com/841616472`}
              width="100%"
              controls={true}
            />
          </div>

          <div align="center" style={{ marginBottom: 20 }}>
            <label>Step 3. Add Products</label>
            <ReactPlayer
              url={`https://vimeo.com/841616531`}
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
