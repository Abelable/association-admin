import { Button, Upload } from "antd";
import { ImportOutlined, LoadingOutlined } from "@ant-design/icons";
import { fileToBase64 } from "utils";
import { useImportTalentData } from "service/talents";
import { useTalentsQueryKey } from "../util";

export const FileUpload = () => {
  const { mutate: importTalentData, isLoading } = useImportTalentData(
    useTalentsQueryKey()
  );

  const upload = async (info: any) => {
    const file = await fileToBase64(info.file);
    importTalentData({ excel_file: file });
  };

  return (
    <Upload customRequest={upload} maxCount={1} showUploadList={false}>
      <Button icon={isLoading ? <LoadingOutlined /> : <ImportOutlined />}>
        导入数据
      </Button>
    </Upload>
  );
};
