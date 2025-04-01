import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { ErrorBox } from "components/lib";
import { RichTextEditor } from "components/rich-text-editor";
import { OssUpload } from "components/oss-upload";
import { FormBuilder } from "./form-builder";
import { PreviewForm } from "./preview-form";

import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import moment from "moment";
import { useForm } from "antd/lib/form/Form";
import { useAddCustomSignup, useEditCustomSignup } from "service/custom-signup";
import { useCustomSignupModal, useCustomSignupsQueryKey } from "../util";

import type { Category } from "types/category";
import type {
  CustomSignup,
  CustomSignupFieldsValue,
  CustomSignupsResult,
  FormItem,
} from "types/custom-signup";

const defaultFormList: FormItem[] = [
  {
    id: 1,
    type: 1,
    required: true,
    name: "姓名",
    options: undefined,
  },
  {
    id: 2,
    type: 1,
    required: true,
    name: "手机号",
    options: undefined,
  },
  {
    id: 3,
    type: 1,
    required: true,
    name: "邮箱",
    options: undefined,
  },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const CustomSignupModal = ({
  categoryList,
}: {
  categoryList: Category[];
}) => {
  const [form] = useForm();
  const { customSignupModalOpen, editingCustomSignupId, close } =
    useCustomSignupModal();
  const { enterFrom, formRemark, fieldsValue } = useEditingCustomSignupForm(
    editingCustomSignupId
  );
  const useMutationCustomSignup = editingCustomSignupId
    ? useEditCustomSignup
    : useAddCustomSignup;
  const { mutateAsync, error, isLoading } = useMutationCustomSignup(
    useCustomSignupsQueryKey()
  );
  const [remark, setRemark] = useState("");
  const [formList, setFormList] = useState(defaultFormList);

  const [previewFormModalVisible, setPreviewFormModalVisible] = useState(false);

  useDeepCompareEffect(() => {
    if (fieldsValue) {
      const { cover, category_id, ...rest } = fieldsValue;
      form.setFieldsValue({
        cover: cover ? [{ url: cover }] : undefined,
        category_id: +category_id === 0 ? undefined : +category_id,
        ...rest,
      });
    }
  }, [fieldsValue, form]);

  useDeepCompareEffect(() => {
    enterFrom.length && setFormList([...enterFrom]);
  }, [enterFrom]);

  useEffect(() => {
    formRemark && setRemark(formRemark);
  }, [formRemark]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, dateRange, ...restParams } = form.getFieldsValue();
      const start_time = `${Math.floor(dateRange[0].valueOf() / 1000)}`;
      const end_time = `${Math.floor(dateRange[1].valueOf() / 1000)}`;
      const customSignupParams: CustomSignup = {
        id: editingCustomSignupId || "",
        cover: cover && cover.length ? cover[0].url : "",
        start_time,
        end_time,
        remark,
        enter_from_json: JSON.stringify(formList),
        ...restParams,
      };
      await mutateAsync(customSignupParams);
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    setFormList(defaultFormList);
    close();
  };

  return (
    <>
      <Drawer
        title={editingCustomSignupId ? "编辑自定义活动" : "新增自定义活动"}
        width={"68%"}
        forceRender={true}
        onClose={closeModal}
        visible={customSignupModalOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setPreviewFormModalVisible(true)}>
              预览
            </Button>
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
                name="cover"
                label="活动封面"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传活动封面" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
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
              <Form.Item name="category_id" label="活动分类">
                <Select placeholder="请选择活动分类">
                  {categoryList?.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
                <DatePicker.RangePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="报名备注" tooltip="排版自定义规则">
            <RichTextEditor content={remark} setContent={setRemark} />
          </Form.Item>
        </Form>
        <Divider orientation="left">报名表单编辑</Divider>
        <FormBuilder formList={formList} setFormList={setFormList} />
      </Drawer>
      <Modal
        width={"80rem"}
        title="报名表单预览"
        visible={previewFormModalVisible}
        footer={null}
        onCancel={() => setPreviewFormModalVisible(false)}
      >
        <PreviewForm formList={formList} />
      </Modal>
    </>
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

  let enterFrom: FormItem[] = [];
  let formRemark: string = "";
  let fieldsValue: CustomSignupFieldsValue | undefined = undefined;

  if (currentCustomSignup) {
    const { enter_from_json, start_time, end_time, remark, ...restData } =
      currentCustomSignup;
    enterFrom = JSON.parse(currentCustomSignup?.enter_from_json);
    formRemark = remark;
    fieldsValue = {
      ...restData,
      dateRange: [
        moment(Number(start_time) * 1000),
        moment(Number(end_time) * 1000),
      ],
    };
  }

  return { enterFrom, formRemark, fieldsValue };
};
