import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useServiceModal, useServicesQueryKey } from "../util";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { useAddService, useEditService } from "service/member-service";
import { RichTextEditor } from "components/rich-text-editor";
import {
  CategoryOption,
  ServiceForm,
  ServicesResult,
} from "types/member-service";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";

export const ServiceModal = ({
  categoryOptions,
}: {
  categoryOptions: CategoryOption[];
}) => {
  const [form] = useForm();

  const { serviceModalOpen, editingServiceId, close } = useServiceModal();

  const useMutationService = editingServiceId ? useEditService : useAddService;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationService(useServicesQueryKey());
  const editingServiceForm = useEditingServiceForm(editingServiceId);
  const [content, setContent] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    setContent("");
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const { image, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingServiceId || "",
        content,
        image: image[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingServiceForm) {
      const { image, content, ...restFieldsValue } = editingServiceForm;
      form.setFieldsValue({
        image: [{ url: image }],
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingServiceForm]);

  return (
    <Drawer
      title={editingServiceId ? "编辑会员服务" : "新增会员服务"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={serviceModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={mutateLoading} type="primary">
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
              label="文章标题"
              rules={[{ required: true, message: "请输入文章标题" }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category_id"
              label="文章分类"
              rules={[{ required: true, message: "请选择文章分类" }]}
            >
              <Select placeholder="请选择文章分类">
                {categoryOptions.map(({ id, name }) => (
                  <Select.Option key={id}>{name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="文章排序" name="sort">
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="is_show"
              label="是否展示"
              rules={[{ required: true, message: "请选择展示或隐藏" }]}
            >
              <Select placeholder="请选择展示或隐藏">
                {[
                  { name: "展示", value: "1" },
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
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="brief"
              label="文章简介"
              rules={[
                {
                  required: true,
                  message: "请输入文章简介",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="请输入文章简介" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="image"
          label="图片"
          rules={[{ required: true, message: "请上传图片" }]}
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
        <Form.Item label="文章内容" tooltip="排版自定义规则">
          <RichTextEditor content={content} setContent={setContent} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingServiceForm = (editingServiceId: string) => {
  const queryClient = useQueryClient();
  const servicesResult: ServicesResult | undefined = queryClient.getQueryData(
    useServicesQueryKey()
  );
  const currentService = servicesResult
    ? servicesResult.list.find((item) => item.id === editingServiceId)
    : undefined;

  const editingServiceForm: ServiceForm | undefined = currentService?.image
    ? currentService
    : undefined;
  return editingServiceForm;
};
