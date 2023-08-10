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

          <h4>Fully Upgrades</h4>
          <hr />
          <div>
            Now, if you want to get all the features of this platform with less
            or no limitations and without invitations, click the button below to
            know how.
            <br />
            <br />
            {/* <div style={styles.package1}>
              <div style={styles.package2}>
                <div
                  align="center"
                  style={{ ...styles.header, backgroundColor: "#FAD02C" }}
                >
                  Clavstore Subdomain Package
                </div>
                <div style={styles.body}>
                  <ul>
                    <li>Fully functional Grocery eCommerce</li>
                    <li>Loaded with 1600+ Fast Moving Grocery Items</li>
                    <li>Upload up to 2000 products</li>
                    <li>Unlimited Customers, Categories, and Payments</li>
                    <li>3 Months Free Hosting</li>
                    <li>10-Days Training</li>
                  </ul>
                </div>
                <div style={styles.footer}>
                  One-Time: ₱2,990 <s>₱14,890</s> 80% Off
                  <br />
                  Hosting Fee: P540/mo (starts 3 months after)
                </div>
              </div>
              <div style={styles.package2}>
                <div
                  align="center"
                  style={{ ...styles.header, backgroundColor: "#F68181" }}
                >
                  Clavstore Domain Name Package
                </div>
                <div style={styles.body}>
                  <ul>
                    <li>Fully functional Grocery eCommerce</li>
                    <li>Domain name of your choice</li>
                    <li>Loaded with 4600+ Complete Grocery Items</li>
                    <li>
                      Unlimited Products, Customers, Categories, and Payments
                    </li>
                    <li>12 Months Free Hosting</li>
                    <li>10-Days Training</li>
                  </ul>
                </div>
                <div style={styles.footer}>
                  One-Time: ₱4,990 <s>₱31,890</s> 85% Off
                  <br />
                  Hosting Fee: P4,320/yr (starts 1 year after)
                </div>
              </div>
              <div style={styles.package2}>
                <div
                  align="center"
                  style={{ ...styles.header, backgroundColor: "#7CF3A0" }}
                >
                  Clavstore Mobile App Package
                </div>
                <div style={styles.body}>
                  <ul>
                    <li>Fully functional Grocery eCommerce</li>
                    <li>Domain name of your choice</li>
                    <li>Mobile App (Android & iOS)</li>
                    <li>Loaded with 4600+ Complete Grocery Items</li>
                    <li>
                      Unlimited Products, Customers, Categories, and Payments
                    </li>
                    <li>12 Months Free Hosting</li>
                    <li>10-Days Training</li>
                  </ul>
                </div>
                <div style={styles.footer}>
                  One-Time: ₱8,990 <s>₱72,890</s> 88% Off
                  <br />
                  Hosting Fee: P4,320/yr (starts 1 year after)
                </div>
              </div>
            </div> */}
            {/* <div style={styles.package1}>
              <div style={styles.package2}>
                <div
                  align="center"
                  style={{ ...styles.header, backgroundColor: "#FAD02C" }}
                >
                  Subdomain Package
                </div>
                <div style={styles.body}>
                  <ul>
                    <li>We will upload 1600+ Fast Moving Grocery Items</li>
                    <li>You can upload up to 2000 products</li>
                    <li>Unlimited Customers, Categories, and Payments</li>
                    <li>3 Months Free Hosting</li>
                    <li>10-Days Training</li>
                  </ul>
                </div>
                <div align="center" style={styles.footer}>
                  <h5>One-Time Fee: ₱2,990 </h5>
                  <h5>
                    Hosting Fee: ₱540/month
                    <br />
                    <span style={{ fontSize: 12 }}>
                      (starts 3 months after)
                    </span>
                  </h5>
                  <br />
                  Regular One-Time Fee: <s>₱14,890</s> 80% Off
                  <br />
                  Regular Hosting Fee: <s>₱2,700/month</s> 80% Off
                </div>
              </div>
              <div style={styles.package2}>
                <div
                  align="center"
                  style={{ ...styles.header, backgroundColor: "#F68181" }}
                >
                  Domain Name Package
                </div>
                <div style={styles.body}>
                  <ul>
                    <li>Includes a Domain Name</li>
                    <li>We will upload 4600+ Grocery Items</li>
                    <li>
                      You can add Unlimited Products, Customers, Categories, and
                      Payments
                    </li>
                    <li>12 Months Free Hosting</li>
                    <li>10-Days Training</li>
                  </ul>
                </div>
                <div align="center" style={styles.footer}>
                  <h5>One-Time Fee: ₱4,990 </h5>
                  <h5>
                    Hosting Fee: ₱4,320/year
                    <br />
                    <span style={{ fontSize: 12 }}>(starts 1 year after)</span>
                  </h5>
                  <br />
                  Regular One-Time Fee: <s>₱31,890</s> 85% Off
                  <br />
                  Regular Hosting Fee: <s>28,800/year</s> 85% Off
                </div>
              </div>
              <div style={styles.package2}>
                <div
                  align="center"
                  style={{ ...styles.header, backgroundColor: "#7CF3A0" }}
                >
                  Mobile App Package
                </div>
                <div style={styles.body}>
                  <ul>
                    <li>
                      Includes a Domain Name and Mobile App (Android & iOS)
                    </li>
                    <li>We will upload 4600+ Complete Grocery Items</li>
                    <li>
                      You can add Unlimited Products, Customers, Categories, and
                      Payments
                    </li>
                    <li>12 Months Free Hosting</li>
                    <li>10-Days Training</li>
                  </ul>
                </div>
                <div align="center" style={styles.footer}>
                  <h5>One-Time Fee: ₱8,990 </h5>
                  <h5>
                    Hosting Fee: ₱4,320/year
                    <br />
                    <span style={{ fontSize: 12 }}>(starts 1 year after)</span>
                  </h5>
                  <br />
                  Regular One-Time Fee: <s>₱72,890</s> 88% Off
                  <br />
                  Regular Hosting Fee: <s>28,800/year</s> 88% Off
                </div>
              </div>
            </div>
            <br /> */}
            <div align="center">
              {/* <Button
                onClick={() =>
                  window.open(
                    "https://program.clavstore.com/program/ogpa-program?noRedirect=1"
                  )
                }
                type="primary"
                style={{ width: 350, fontSize: 18, height: 50 }}
              >
                Choose A Package
              </Button>
              <br />
              <br /> */}
              <Button
                onClick={() =>
                  window.open(
                    "https://program.clavstore.com/p/ogpa-program/?saleid=64cdbed56d639b6594048c2c&refid=64aeb70a153aa05ba6a1f390"
                  )
                }
                type="danger"
                style={{ width: 350, fontSize: 16, height: 85 }}
              >
                Let Me Also Show You How To
                <br /> Earn 1.17 Million Pesos A Month
                <br /> With This Business
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
