import React, { useState } from "react";
import { Button, Input, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import AdminNav from "../../components/navigation/AdminNav";

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
            Once you have succeesfully created an account on this platform and
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
            other people to create their own store using this platform. <br />
            <br />
            Once they're successful in creating their own store, we will
            increase your limits on this free account.
            <br />
            <br />
            <ul>
              <li>Additional 10 products per invites</li>
              <li>Additional 1 category per invites</li>
              <li>Additional 5 users per invites</li>
            </ul>
            Copy any of the link below and give it to someone whom you think
            needs this program.
            <br />
            <br />
            <Input.Group compact>
              <Input
                style={{ width: "90%" }}
                value={`${process.env.REACT_APP_LINK1}/?register=1&refid=${user._id}`}
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
                value={`${process.env.REACT_APP_LINK2}/?register=1&refid=${user._id}`}
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
            You may invite people who wanted to have a business but has no
            capital to start. You can also give that link to those individual
            who owns a physical store. This will turn their physical store into
            online store because they will have a website.
          </div>
          <br />
          <br />

          {false && (
            <>
              <h4>Paid Upgrades</h4>
              <hr />
              <div>
                Now, if you want to get all the features of this platform
                without limitations, you can upgrade to our Paid Platforms.
                Upgrades are:
                <br />
                <br />
                <ul>
                  <li>Unlimited products</li>
                  <li>Unlimited categories</li>
                  <li>Unlimited users</li>
                  <li>Referral commissions</li>
                </ul>
                <a
                  href="https://program.clavstore.com/p/ogpa-program"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check the paid upgrades here
                </a>
                <br />
                <br />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upgrades;
