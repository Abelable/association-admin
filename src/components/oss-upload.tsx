import { Upload } from "antd";
import { useOssConfig } from "service/common";
import { PlusOutlined } from "@ant-design/icons";

interface OssUploadProps extends React.ComponentProps<typeof Upload> {}

export const OssUpload = (props: OssUploadProps) => {
  const { data: ossConfig } = useOssConfig();
  const getExtraData = (file: any) => {
    return {
      key: file.key,
      OSSAccessKeyId: ossConfig?.OSSAccessKeyId,
      policy: ossConfig?.policy,
      Signature: ossConfig?.signature,
    };
  };
  const beforeUpload = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    file.key = ossConfig?.dir + filename;
    file.url = `https:${ossConfig?.host}/${ossConfig?.dir}${filename}`;
    return file;
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      action={ossConfig?.host}
      data={getExtraData}
      listType="picture-card"
      {...props}
    >
      {
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>点击上传</div>
        </div>
      }
    </Upload>
  );
};
