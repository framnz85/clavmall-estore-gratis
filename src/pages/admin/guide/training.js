import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";

import AdminNav from "../../../components/navigation/AdminNav";
import Alerts from "../../../components/common/Alerts";

const Training = () => {
  const estoreSet = useSelector((state) => state.estoreSet);

  document.title = "Training | " + estoreSet.name;

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>
        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Gratis Training Program</h4>
          <hr />
          <Alerts />

          <br />
          <br />

          <div align="center">
            <Button
              type="primary"
              size="large"
              onClick={() =>
                window.open(
                  "https://program.clavstore.com/access/gratis-training-program/?nomodal=1"
                )
              }
            >
              Access Gratis Training Program Here
            </Button>
            <br />
            <br />
            Please note that if you are asked for a login details just provide{" "}
            <br />
            your Gratis Clavstore login details, the login you use to access
            here.
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Training;
