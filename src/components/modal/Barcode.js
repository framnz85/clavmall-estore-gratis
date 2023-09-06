import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getProductByBarcode } from "../../functions/product";

const Barcode = ({
  isBarcodeOpen,
  setIsBarcodeOpen,
  purpose,
  setBarcode = () => "",
}) => {
  const navigate = useNavigate();

  const products = useSelector((state) => state.products);
  const estoreSet = useSelector((state) => state.estoreSet);

  const loadSingleProduct = (barcode) => {
    const singleProduct = products.find(
      (product) => product.barcode === barcode
    );
    if (singleProduct) {
      navigate(`/${estoreSet.slug}/product/${singleProduct.slug}`);
      setIsBarcodeOpen(false);
    } else {
      getProductByBarcode(estoreSet._id, barcode).then((res) => {
        if (res.data.err) {
          toast.error(res.data.err);
        } else {
          const singleProduct = res.data && res.data[0];
          navigate(`/${estoreSet.slug}/product/${singleProduct.slug}`);
          setIsBarcodeOpen(false);
        }
      });
    }
  };

  return (
    <>
      <Modal
        title="Search Item By Barcode"
        visible={isBarcodeOpen}
        onCancel={() => setIsBarcodeOpen(false)}
        style={{ textAlign: "center" }}
        footer={null}
        cancelText="Close"
      >
        Use your camera to scan the barcode
        <BarcodeScannerComponent
          width={450}
          height={450}
          onUpdate={(err, result) => {
            if (result) {
              if (purpose === "read") {
                loadSingleProduct(result.text);
              } else {
                setBarcode(result.text);
              }
            }
          }}
          style={{ padding: 0, margin: 0 }}
        />
      </Modal>
    </>
  );
};

export default Barcode;
