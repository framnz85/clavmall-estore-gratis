import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Switch } from "antd";
import { toast } from "react-toastify";

import AdminNav from "../../components/navigation/AdminNav";
import InputText from "../../components/common/InputText";

import { updateEstore } from "../../functions/estore";
import { estoreDet } from "../../reducers/estoreSlice";
import Alerts from "../../components/common/Alerts";

const initialState = {
  name: "",
  carouselImages: [],
  textCarousel: [],
  showHomeCarousel: false,
  showRandomItems: false,
  showCategories: false,
  showNewArrival: false,
  showBestSeller: false,
  headerColor: "",
  carouselColor: "",
  estoreChange: 0,
  delfee: "",
  deltime: "",
  delloc: "",
  openaiAPI: "",
};

const AdminSetting = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Admin Settings | " + estoreSet.name;
    loadEstore();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadEstore = () => {
    if (estoreSet && estoreSet._id) {
      setValues({
        ...values,
        ...estoreSet,
      });
    }
  };

  const handleSubmit = () => {
    const echange = estoreSet.estoreChange > 0 ? estoreSet.estoreChange + 1 : 1;

    setLoading(true);
    updateEstore(
      estoreSet._id,
      { ...estoreSet, ...values, estoreChange: echange },
      user.token
    ).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
        setLoading(false);
      } else {
        dispatch(estoreDet(res.data));
        localStorage.setItem("estore", JSON.stringify(res.data));
        toast.success(`Home setting successfully updated`);
        setLoading(false);
      }
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-m-2">
          <AdminNav />
        </div>

        <div className="col-md-10 bg-white mt-3 mb-5">
          <h4 style={{ margin: "20px 0" }}>Admin Settings</h4>
          <hr />
          <Alerts />
          <div className="p-3">
            <h6 style={{ fontWeight: "bold" }}>Website ID: </h6>
            <h6>{values._id}</h6>
            <br />
            <InputText
              inputProperty={{
                name: "name",
                label: "Store Name",
                onChange: (e) => setValues({ ...values, name: e.target.value }),
                value: values.name,
                disabled: loading,
                show: true,
                edit: false,
              }}
            />
            <InputText
              inputProperty={{
                name: "delfee",
                label: "Delivery Fee",
                onChange: (e) =>
                  setValues({ ...values, delfee: e.target.value }),
                value: values.delfee,
                disabled: loading,
                show: true,
                edit: false,
              }}
            />
            <InputText
              inputProperty={{
                name: "deltime",
                label: "Delivery Time",
                onChange: (e) =>
                  setValues({ ...values, deltime: e.target.value }),
                value: values.deltime,
                disabled: loading,
                show: true,
                edit: false,
              }}
            />
            <InputText
              inputProperty={{
                name: "delloc",
                label: "Delivery Location (separated w/ comma)",
                onChange: (e) =>
                  setValues({ ...values, delloc: e.target.value }),
                value: values.delloc,
                disabled: loading,
                show: true,
                edit: false,
              }}
            />
            <InputText
              inputProperty={{
                name: "openaiAPI",
                label: "Openai API",
                onChange: (e) =>
                  setValues({ ...values, openaiAPI: e.target.value }),
                value: values.openaiAPI,
                disabled: loading,
                show: true,
                edit: false,
              }}
            />
          </div>

          <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            block
            shape="round"
            size="large"
            disabled={loading}
            style={{ margin: "30px 30px 20px 15px", width: "150px" }}
          >
            Save Setting
          </Button>
          <b>Website Status</b>
          <Switch
            checked={values.status === "active"}
            onChange={(checked) => {
              setValues({ ...values, status: checked ? "active" : "pause" });
              toast.warning("Make sure to click the Save Setting button");
            }}
            style={{ marginLeft: "10px" }}
            disabled={values.status === "pending"}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
