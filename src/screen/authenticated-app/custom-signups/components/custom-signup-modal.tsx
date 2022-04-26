import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useCustomSignupModal, useCustomSignupsQueryKey } from "../util";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import {
  CustomSignup,
  CustomSignupForm,
  CustomSignupsResult,
} from "types/custom-signup";
import { useAddCustomSignup, useEditCustomSignup } from "service/custom-signup";
import { useQueryClient } from "react-query";

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

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="头图标题"
              rules={[{ required: true, message: "请输入头图标题" }]}
            >
              <Input placeholder="请输入头图标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="sort" label="头图排序">
              <Input placeholder="请输入头图序号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateRange"
              label="投放时间"
              rules={[{ required: true, message: "请选择投放时间" }]}
            >
              <DatePicker.RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="跳转信息"
              name="linkInfo"
              rules={[{ required: true, message: "请输入新闻编号或H5地址" }]}
            >
              <Input
                addonBefore={
                  <Form.Item
                    name="link_type"
                    noStyle
                    rules={[{ required: true, message: "请选择跳转类型" }]}
                  >
                    <Select placeholder="请选择类型">
                      {[
                        { name: "跳转新闻", value: "1" },
                        { name: "跳转H5", value: "2" },
                      ].map((item, index) => (
                        <Select.Option key={index} value={item.value}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                }
                placeholder="请输入新闻编号或H5地址"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="is_show"
              label="是否显示"
              rules={[{ required: true, message: "请选择显示或隐藏" }]}
            >
              <Select placeholder="请选择显示或隐藏">
                {[
                  { name: "显示", value: "1" },
                  { name: "隐藏", value: "0" },
                ].map((item, index) => (
                  <Select.Option key={index} value={item.value}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="img"
          label="分享图片"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传分享图片" }]}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
      </Form>
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
