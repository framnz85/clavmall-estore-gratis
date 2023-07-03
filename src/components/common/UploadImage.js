import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

import {
  uploadFileImage,
  removeFileImage,
  handleProductUpdate,
  checkImageUser,
} from "../../functions/product";

const UploadImage = ({ images, setImages, edit = false, prodid = "" }) => {
  const [fileList, setFileList] = useState([]);

  const user = useSelector((state) => state.user);
  const estoreSet = useSelector((state) => state.estoreSet);

  useEffect(() => {
    if (edit) {
      setFileList(
        images.map((img) => {
          return {
            uid: img.public_id,
            name: img.url,
            status: "done",
            url:
              process.env.REACT_APP_CLAVMALL_IMG +
              "/estore_images/estoregratis/" +
              img.url,
          };
        })
      );
    }
  }, [images]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = ({ fileList: newFileList }) => {
    let uploadedImages = images;
    setFileList(newFileList);
    newFileList.forEach((file) => {
      file.originFileObj &&
        Resizer.imageFileResizer(
          file.originFileObj,
          514,
          514,
          "JPEG",
          100,
          0,
          async (uri) => {
            if (edit) {
              await uploadFileImage(uri, estoreSet, user.token)
                .then((res) => {
                  if (res.data.err) {
                    toast.error(res.data.err);
                  } else {
                    uploadedImages.push(res.data);
                    handleProductUpdate(
                      estoreSet._id,
                      prodid,
                      { images: uploadedImages },
                      user.token
                    );
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
              setImages(uploadedImages);
              setFileList(
                uploadedImages.map((img) => {
                  return {
                    uid: img.public_id,
                    name: img.url,
                    status: "done",
                    url:
                      process.env.REACT_APP_CLAVMALL_IMG +
                      "/estore_images/estoregratis/" +
                      img.url,
                  };
                })
              );
            } else {
              uploadedImages.push({
                public_id: Math.floor(Math.random() * 10 ** 10),
                url: uri,
              });
              setImages(uploadedImages);
            }
          },
          "base64"
        );
    });
  };

  const handleRemove = (value) => {
    if (edit && !value.originFileObj) {
      const uploadedImages = images.filter(
        (img) => img.public_id !== value.uid
      );
      checkImageUser(
        value.uid,
        estoreSet._id,
        process.env.REACT_APP_ESTORE_DEFAULT_ID,
        user.token
      ).then(async (res) => {
        console.log(res.data.delete);
        if (res.data.delete) {
          removeFileImage(value.uid, estoreSet, user.token).then((res) => {
            if (res.data.err) {
              toast.error(res.data.err);
              if (res.data.noexist) {
                setImages(uploadedImages);
                handleProductUpdate(
                  estoreSet._id,
                  prodid,
                  { images: uploadedImages },
                  user.token
                );
              }
            } else {
              setImages(uploadedImages);
              handleProductUpdate(
                estoreSet._id,
                prodid,
                { images: uploadedImages },
                user.token
              );
            }
          });
        } else {
          setImages(uploadedImages);
          handleProductUpdate(
            estoreSet._id,
            prodid,
            { images: uploadedImages },
            user.token
          );
        }
      });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Image
      </div>
    </div>
  );
  return (
    <>
      <Upload
        beforeUpload={() => false}
        listType="picture-card"
        fileList={fileList}
        onPreview={() => ""}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 2 ? null : uploadButton}
      </Upload>
    </>
  );
};
export default UploadImage;
