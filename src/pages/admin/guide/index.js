import React from "react";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

const Guide = () => {
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
          <div>Step 6. Admin vs Personal Account</div>
          <div>Step 7. Free and Paid Upgrades</div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
