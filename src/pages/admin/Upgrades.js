import React, { useState } from "react";
import { Button, Input, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import AdminNav from "../../components/navigation/AdminNav";
// import { isMobile } from "react-device-detect";

const Upgrades = () => {
  const [copied, setCopied] = useState("Copy to Clipboard");

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  document.title = "Upgrades | " + estoreSet.name;

  const copyClipboard = (num) => {
    const copyText = document.getElementById("myInput" + num);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    setCopied("Copied");
  };

  // const styles = {
  //   package1: {
  //     display: "flex",
  //     flexDirection: isMobile ? "column" : "row",
  //     margin: "10px 0",
  //     position: "relative",
  //   },
  //   package2: {
  //     width: "100%",
  //     border: "1px solid #aaaaaa",
  //     marginRight: 5,
  //   },
  //   header: { padding: 5 },
  //   body: { marginTop: 10, height: isMobile ? 320 : 400 },
  //   footer: {
  //     padding: 10,
  //     position: isMobile ? "none" : "absolute",
  //     bottom: 0,
  //     width: 300,
  //   },
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>
        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Free Upgrades</h4>
          <hr />

          <div>
            Once you have successfully created an account on this platform and
            have your store website up and running, you can add: <br />
            <br />
            <ul>
              <li>Up to a maximum of 50 products</li>
              <li>Up to a maximum of 10 categories</li>
              <li>And up to a maximum of 20 users</li>
            </ul>
            This is because we are only limited with the spaces given to us by
            our hosting provider. However, in order for us to cope up with the
            hosting expenses, you can help us promote this platform by inviting
            other people to use it and have their own online store. Somehow if
            they upgrade to our paid plans then we can sustain the hosting costs
            and can increase our hosting space.
            <br />
            <br />
            Moreover, once these people that you invited successfully created
            their own store, we will increase your limits on your Gratis
            Clavstore account.
            <br />
            <br />
            <ul>
              <li>Additional 10 products per invites</li>
              <li>Additional 1 category per invites</li>
              <li>Additional 5 users per invites</li>
            </ul>
            <strong>Invitation Link.</strong> Copy any of the link below and
            give it to someone whom you think needs this program.
            <br />
            <br />
            <Input.Group compact>
              <Input
                style={{ width: "90%" }}
                value={`${process.env.REACT_APP_LINK1}/?refid=${user._id}`}
                id="myInput1"
              />
              <Tooltip title={copied}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => copyClipboard(1)}
                />
              </Tooltip>
            </Input.Group>
            <br />
            <Input.Group compact>
              <Input
                style={{ width: "90%" }}
                value={`${process.env.REACT_APP_LINK2}/?refid=${user._id}`}
                id="myInput2"
              />
              <Tooltip title={copied}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => copyClipboard(2)}
                />
              </Tooltip>
            </Input.Group>
            <br />
            <strong>Hint #1:</strong> You can give this link to those individual
            who owns a physical store so they can turn it into an ecommerce
            business for free. Look around you and you can see a lot of small
            stores (ex. mini grocery or sari-sari stores). Give them your
            Invitation Link so they can create an account fro free.
            <br />
            <br />
            <strong>Hint #2:</strong> You may also invite people who wanted to
            have a business but has no capital to start. They can start online
            grocery business without any initial capital to start using this
            platform.
            <br />
            <br />
            Lastly, just set this into your mind that by giving your Invitaion
            Link, you are not just increasing your limits but you are also
            helping other people!!!
          </div>
          <br />
          <br />

          <h4>Prime Clavstore Platform</h4>
          <hr />
          <div>
            Now, if you want to get all the features of this platform with less
            or no limitations and without the need for inviting people then you
            may consider to avail the Prime Clavstore Platform.
            <br />
            <br />
            This platform is fully loaded with all the features needed for an
            eCommerce business selling grocery products. One of the key feature
            of this platform is that I will personally go to your place to guide
            you how to build online grocery business right at your side.
            <br />
            <br />
            To check the complete details of it, click the button below to see
            al of what The Prime Clavstore Platform can offer.
            <br />
            <br />
            <div align="center">
              <Button
                type="danger"
                size="large"
                onClick={() => window.open("https://prime.clavstore.com/")}
              >
                See Prime Clavstore Platform (Paid Platform)
              </Button>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrades;
