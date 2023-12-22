import { Modal, Upload } from "antd";
import { useOssConfig } from "service/common";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {
  maxCount?: number;
}

const addBorder = (file: any, timestamp: any, suffix: string) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const cxt = canvas.getContext("2d");

      if (cxt) {
        cxt.save();

        cxt.lineWidth = 8;
        cxt.strokeStyle = "#00B4E1";
        cxt.moveTo(0, 0);
        cxt.lineTo(0 + 64, 0);
        cxt.lineTo(0 + 64, 0 + 64);
        cxt.lineTo(0, 0 + 64);
        cxt.lineTo(0, 0);
        cxt.stroke();
        cxt.restore();

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = reader.result as string;
        img.onload = () => {
          const { width, height } = img;
          let x, y, w, h;
          if (width === height) {
            w = 56;
            h = 56;
            x = 4;
            y = 4;
          } else if (width > height) {
            w = 56;
            h = (56 * height) / width;
            x = 4;
            y = 4 + (56 - h) / 2;
          } else {
            w = (56 * width) / height;
            h = 56;
            x = 4 + (56 - w) / 2;
            y = 4;
          }
          cxt.drawImage(img, x, y, w, h);
          const dataURL = canvas.toDataURL(`image/${suffix}`); // 拿到图片的base64数据

          const arr = dataURL.split(",");
          const bstr = atob(arr[1]); //base64 解码
          let n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const filename = `${timestamp}.${suffix}`;
          const newFile = new File([u8arr], filename, {
            type: `image/${suffix}`,
          });
          resolve(newFile);
        };
      }
    });
    reader.readAsDataURL(file);
  });

export const OssLogoUpload = (props: OssUploadProps) => {
  const [key, setKey] = useState("");
  const { data: ossConfig } = useOssConfig();
  const getExtraData = () => {
    return {
      key,
      OSSAccessKeyId: ossConfig?.OSSAccessKeyId,
      policy: ossConfig?.policy,
      Signature: ossConfig?.signature,
    };
  };
  const beforeUpload = async (file: any) => {
    const timestamp = Date.now();
    const suffix = file.name.slice(file.name.lastIndexOf(".") + 1);
    const filename = `${timestamp}.${suffix}`;
    setKey(ossConfig?.dir + filename);
    const newFile = (await addBorder(file, timestamp, suffix)) as any;
    newFile.key = ossConfig?.dir + filename;
    newFile.url = `https:${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    return newFile;
  };

  const [previewImage, setPreviewImage] = useState("");
  const preview = (file: any) => setPreviewImage(file.url);

  return (
    <>
      <Upload
        beforeUpload={beforeUpload}
        action={ossConfig?.host}
        data={getExtraData}
        onPreview={preview}
        listType="picture-card"
        {...props}
      >
        {props.maxCount &&
        props.fileList &&
        props.fileList.length >= props.maxCount ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>点击上传</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={!!previewImage}
        footer={null}
        onCancel={() => setPreviewImage("")}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};
