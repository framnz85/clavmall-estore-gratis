import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm } from "antd";
import ReactPlayer from "react-player/vimeo";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { toast } from "react-toastify";

import { updateUserDetails } from "../../functions/user";
import { loginUser } from "../../reducers/userSlice";

const PreSteps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [showBody, setShowBody] = useState(true);

  const handleUpdateUser = (values) => {
    updateUserDetails(estoreSet._id, values, user.token).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        dispatch(loginUser(res.data));
      }
    });
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
            {isMobile ? (
              <h4 style={{ color: "#0047AB" }}>
                Watch The Video Below Para Malaman Mo Anong Gagawin Para Wala Ng
                Uutang Sa Tindahan Mo, How To Turn 12 to 16 Hours Duty sa Store
                Into 2 to 3 Hours Only, And How To Make More Sales?
              </h4>
            ) : (
              <h2 style={{ color: "#0047AB" }}>
                Watch The Video Below Para Malaman Mo Anong Gagawin Para Wala Ng
                Uutang Sa Tindahan Mo, How To Turn 12 to 16 Hours Duty sa Store
                Into 2 to 3 Hours Only, And How To Make More Sales?
              </h2>
            )}
          </div>
          <div align="center" style={{ marginBottom: 20 }}>
            <ReactPlayer
              url={`https://vimeo.com/846473671`}
              width="100%"
              height={isMobile ? 178 : 320}
              controls={true}
            />
            <br />
            <Button
              type="danger"
              className="login-form-button mb-3"
              style={{ fontSize: 16, height: 65, width: 320 }}
              onClick={() => navigate(`/${estoreSet.slug}/user/account`)}
            >
              Click Here To Verify Your Account
            </Button>
          </div>
        </div>
      )}
      {user &&
        user.role === "admin" &&
        user.emailConfirm &&
        (!user.nextSteps || user.nextSteps === 0) && (
          <div
            align="center"
            style={{
              border: "1px solid #0047AB",
              padding: "20px 20px 10px 20px",
              color: "#0047AB",
              marginTop: 15,
            }}
          >
            <Button
              type="default"
              className="btn btn-sm float-right"
              onClick={() => setShowBody(!showBody)}
            >
              {showBody ? <>✖</> : <>Open</>}
            </Button>
            <h4 style={{ color: "red" }}>
              Make Sure to Perform Steps Below So You'll Be Successful!!!
            </h4>
            {showBody && (
              <>
                <br />
                <div align="left">
                  Follow the steps below so you can fully use all the features
                  of this platform.
                  <br />
                  <br />
                  <strong>
                    1. Let Me Guide And Mentor You Face To Face.
                  </strong>{" "}
                  <br />
                  <br />
                  I will answer all your questions about the usage of this
                  platform. Go to my FB Profile so you'll be notified whenever
                  I'll hold a Live Q and A Event.
                  <br />
                  <br />
                  <Button
                    type="primary"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/francisjohn.clavano"
                      )
                    }
                  >
                    Go to my FB Profile Here
                  </Button>
                  <br />
                  <br />
                  <strong>
                    2. Help Others By Letting Them Know The Existence Of This
                    Platform.{" "}
                  </strong>
                  <br />
                  <br />
                  If you know someone who also owns a mini grocery or sari-sari
                  store, tell them about this platform. Press the button below
                  to get your Invitation Link.
                  <br />
                  <br />
                  <Button
                    type="primary"
                    onClick={() => navigate(`/${estoreSet.slug}/admin/upgrade`)}
                  >
                    Get Your Invitation Link Here
                  </Button>
                  <br />
                  <br />
                  <strong>
                    3. Learn Gratis Clavstore More By Accessing Your Free
                    Training Now.
                  </strong>{" "}
                  <br />
                  <br />
                  If you want a step by step guide how to properly use this
                  platform, go now to our Free Training called Gratis Training
                  Program.
                  <br />
                  <br />
                  <Button
                    type="primary"
                    onClick={() =>
                      window.open(
                        "https://program.clavstore.com/access/gratis-training-program/?nomodal=1"
                      )
                    }
                  >
                    Go here to access your Gratis Training Program
                  </Button>
                  <br />
                  <br />
                  <i style={{ color: "red" }}>
                    NOTE: Login details for this free training is the same login
                    details on this Gratis Clavstore account of yours.
                  </i>
                  <br />
                  <br />
                  <br />
                </div>
                <div align="left" style={{ marginBottom: 20 }}>
                  <Popconfirm
                    value={user}
                    title="Are you sure you have completed all the steps above?"
                    onConfirm={() =>
                      handleUpdateUser({ nextSteps: 1, email: user.email })
                    }
                    onCancel={() => ""}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="default">Next Step &gt;&gt;</Button>
                  </Popconfirm>
                </div>
              </>
            )}
          </div>
        )}
      <br />
    </>
  );
};

export default PreSteps;
