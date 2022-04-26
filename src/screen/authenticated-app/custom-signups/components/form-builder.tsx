import { Button, Input, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const FormBuilder = () => {
  interface FormItem {
    type: number;
    required: boolean;
    name: string;
    tips: string;
    options: string[] | undefined;
  }

  const defaultFormItem: FormItem = {
    type: 0,
    required: false,
    name: "",
    tips: "",
    options: undefined,
  };

  const defaultFormList: FormItem[] = [
    {
      type: 1,
      required: true,
      name: "姓名",
      tips: "请输入姓名",
      options: undefined,
    },
    {
      type: 1,
      required: true,
      name: "手机号",
      tips: "请输入手机号",
      options: undefined,
    },
    {
      type: 1,
      required: true,
      name: "邮箱",
      tips: "请输入邮箱",
      options: undefined,
    },
  ];

  return (
    <>
      <Table
        style={{ width: "100%" }}
        rowKey={"id"}
        columns={[
          {
            title: "选择类型",
            dataIndex: "type",
          },
          {
            title: "选择必填",
            dataIndex: "required",
          },
          {
            title: "填写名称",
            dataIndex: "name",
            render: () => <Input placeholder="请输入当前单行文本框的名称" />,
          },
          {
            title: "填写提示文本",
            dataIndex: "tips",
          },
          {
            title: "添加选项",
            dataIndex: "options",
          },
        ]}
        dataSource={defaultFormList}
        pagination={false}
      />
      <Button
        style={{ marginTop: "2rem", width: "100%" }}
        icon={<PlusOutlined />}
      >
        添加表单元素
      </Button>
    </>
  );
};
