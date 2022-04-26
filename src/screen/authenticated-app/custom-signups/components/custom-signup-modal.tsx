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
} from "antd";
import { useCustomSignupModal, useCustomSignupsQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import type {
  CustomSignup,
  CustomSignupForm,
  CustomSignupsResult,
  FormItem,
} from "types/custom-signup";
import { useAddCustomSignup, useEditCustomSignup } from "service/custom-signup";
import { useQueryClient } from "react-query";
import { RichTextEditor } from "components/rich-text-editor";
import { FormBuilder } from "./form-builder";

const defaultFormList: FormItem[] = [
  {
    id: 1,
    type: 1,
    required: true,
    name: "姓名",
    tips: "",
    options: undefined,
  },
  {
    id: 3,
    type: 1,
    required: true,
    name: "邮箱",
    tips: "",
    options: undefined,
  },
  {
    id: 2,
    type: 1,
    required: true,
    name: "手机号",
    tips: "",
    options: undefined,
  },
];

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
  const [formList, setFormList] = useState(defaultFormList);

  const preview = () => {};

  const closeModal = () => {
    form.resetFields();
    setFormList([...defaultFormList]);
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
          <Button onClick={preview}>预览</Button>
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
      <FormBuilder formList={formList} setFormList={setFormList} />
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
