import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Table,
} from "antd";
import { useCustomSignupModal, useCustomSignupsQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import {
  CustomSignup,
  CustomSignupForm,
  CustomSignupsResult,
} from "types/custom-signup";
import { PlusOutlined } from "@ant-design/icons";
import { useAddCustomSignup, useEditCustomSignup } from "service/custom-signup";
import { useQueryClient } from "react-query";
import { RichTextEditor } from "components/rich-text-editor";

export const CustomSignupModal = () => {
  const [form] = useForm();
  const { customSignupModalOpen, editingCustomSignupId, close } =
    useCustomSignupModal();
  const editingCustomSignupForm = useEditingCustomSignupForm(
    editingCustomSignupId
  );
  const useMutationCustomSignup = editingCustomSignupId
    ? useEditCustomSignup
    : useAddCustomSignup;
  const { mutateAsync, error, isLoading } = useMutationCustomSignup(
    useCustomSignupsQueryKey()
  );
  const [introduction, setIntroduction] = useState("");

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

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const { img, link_type, linkInfo, dateRange, ...restParams } =
        form.getFieldsValue();
      const s_time = `${Math.floor(dateRange[0].valueOf() / 1000) * 1000}`;
      const e_time = `${Math.floor(dateRange[1].valueOf() / 1000) * 1000}`;
      const customSignupParams: CustomSignup = {
        id: editingCustomSignupId || "",
        s_time,
        e_time,
        link_type,
        customSignup_id: link_type === "1" ? linkInfo : "1",
        redirect_url: link_type === "2" ? linkInfo : "",
        img: img[0].url,
        ...restParams,
      };
      await mutateAsync(customSignupParams);
      closeModal();
    });
  };

  useEffect(() => {
    editingCustomSignupForm && form.setFieldsValue(editingCustomSignupForm);
  }, [form, editingCustomSignupForm]);

  return (
    <Drawer
      title={editingCustomSignupId ? "编辑自定义活动" : "新增自定义活动"}
      width={"68%"}
      forceRender={true}
      onClose={closeModal}
      visible={customSignupModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={isLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Divider orientation="left">活动信息</Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="title"
              label="标题"
              rules={[{ required: true, message: "请输入标题" }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="enter_num"
              label="报名人数"
              tooltip="报名人数到达限制就自动关闭入口"
              rules={[{ required: true, message: "请输入报名人数" }]}
            >
              <Input placeholder="请输入报名人数" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="dateRange"
              label="活动日期"
              rules={[{ required: true, message: "请选择活动日期" }]}
            >
              <DatePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="报名备注" tooltip="排版自定义规则">
          <RichTextEditor content={introduction} setContent={setIntroduction} />
        </Form.Item>
      </Form>
      <Divider orientation="left">报名表单编辑</Divider>
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
    </Drawer>
  );
};

const useEditingCustomSignupForm = (editingCustomSignupId: string) => {
  const queryClient = useQueryClient();
  const customSignupUsersResult: CustomSignupsResult | undefined =
    queryClient.getQueryData(useCustomSignupsQueryKey());
  const currentCustomSignup = customSignupUsersResult
    ? customSignupUsersResult.list.find(
        (item) => item.id === editingCustomSignupId
      )
    : undefined;
  const formList = currentCustomSignup
    ? JSON.parse(currentCustomSignup?.enter_from_json)
    : [];
  const list: string[][] = [];
  formList.forEach((item: { title: string; name: string; value: string }) => {
    list.push([item.name, item.value]);
  });
  const originForm = Object.fromEntries(list);

  const license: { [key in string]: string }[] = [];
  if (originForm.license) {
    const imgs = originForm.license.split(",");
    imgs.forEach((item: string) => {
      license.push({ url: item });
    });
  }

  const editingCustomSignupForm: CustomSignupForm | undefined =
    originForm.company_type
      ? {
          ...originForm,
          license,
          company_type: originForm.company_type.split(","),
        }
      : undefined;
  return editingCustomSignupForm;
};
