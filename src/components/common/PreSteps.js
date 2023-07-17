import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const PreSteps = () => {
  const user = useSelector((state) => state.user);

  const [copied, setCopied] = useState("Copy to Clipboard");

  const copyClipboard = (num) => {
    const copyText = document.getElementById("myInput" + num);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    setCopied("Copied");
  };

  return (
    <>
      {user && user.role === "admin" && !user.emailConfirm && (
        <div
          align="left"
          style={{
            border: "1px solid #0047AB",
            padding: 20,
            color: "#0047AB",
            marginTop: 15,
          }}
        >
          <div align="center">
            <h3 style={{ color: "#0047AB" }}>
              Carefully Follow The Next Steps Below
            </h3>
          </div>
          Thank you for registering to Gratis Clavstore. I hope you will find
          this platform usefull for your business to succeed in the web space.
          <br />
          <br />
          To fully use the features of this free ecommerce platform, please
          carefully perform the following few steps below before you proceed:
          <br />
          <br />
          <ol>
            <li>
              <strong>Learn Gratis Clavstore More.</strong> Every Saturday at
              8PM, I'll hold a Free Live Training regarding how to properly use
              this platform. Just go to my profile and follow me so you will be
              notified whenever I schedule a Facebook Live Event.
              <br />
              <br />
              <a
                href="https://www.facebook.com/francisjohn.clavano"
                target="_blank"
                rel="noreferrer"
              >
                Go to my FB Profile here
              </a>
              <br />
              <br />
            </li>
            <li>
              <strong>Help Others Know This Platform.</strong> Tell other people
              about this platform so you can also help them make more sales by
              having their traditional businesses turining into a full ecommerce
              business. If you know someone who owns a small store like a mini
              grocery or sari-sari store then give them your invitation link
              below.
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
            </li>
          </ol>
        </div>
      )}
      <br />
    </>
  );
};

export default PreSteps;
