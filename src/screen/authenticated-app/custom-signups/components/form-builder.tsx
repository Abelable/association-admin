import { Button, Input, Select, Switch, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const FormBuilder = () => {
  interface FormItem {
    type: number | undefined;
    required: boolean;
    name: string;
    tips: string;
    options: string[] | undefined;
  }

  const defaultFormItem: FormItem = {
    type: undefined,
    required: false,
    name: "",
    tips: "",
    options: undefined,
  };

  const typeOptions = [
    { id: 1, name: "单行文本框" },
    { id: 2, name: "多行文本框" },
    { id: 3, name: "数字输入框" },
    { id: 4, name: "单选按钮框" },
    { id: 5, name: "多选按钮框" },
    { id: 6, name: "日期选择框" },
    { id: 7, name: "图片上传框" },
    { id: 8, name: "富文本框" },
  ];

  const defaultFormList: FormItem[] = [
    {
      type: 1,
      required: true,
      name: "姓名",
      tips: "",
      options: undefined,
    },
    {
      type: 1,
      required: true,
      name: "手机号",
      tips: "",
      options: undefined,
    },
    {
      type: 1,
      required: true,
      name: "邮箱",
      tips: "",
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
            render: (value, item) => (
              <Select value={item.type} placeholder="请选择类型">
                {typeOptions.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            ),
            width: "16rem",
          },
          {
            title: "选择必填",
            dataIndex: "required",
            render: (value, item) => <Switch checked={item.required} />,
            width: "10rem",
          },
          {
            title: "填写名称",
            dataIndex: "name",
            render: (value, item) => (
              <Input value={item.name} placeholder="请输入名称" />
            ),
          },
          {
            title: "填写提示文本",
            dataIndex: "tips",
            render: (value, item) => (
              <Input value={item.tips} placeholder="请输入提示文本" />
            ),
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
