import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { usePortraitModal, usePortraitsQueryKey } from "../util";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { useAddPortrait, useEditPortrait } from "service/credit-portrait";
import { RichTextEditor } from "components/rich-text-editor";
import {
  CategoryOption,
  PortraitForm,
  PortraitsResult,
} from "types/credit-portrait";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";

export const PortraitModal = ({
  categoryOptions,
}: {
  categoryOptions: CategoryOption[];
}) => {
  const [form] = useForm();

  const { portraitModalOpen, editingPortraitId, close } = usePortraitModal();

  const useMutationPortrait = editingPortraitId
    ? useEditPortrait
    : useAddPortrait;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationPortrait(usePortraitsQueryKey());
  const editingPortraitForm = useEditingPortraitForm(editingPortraitId);
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
        id: editingPortraitId || "",
        content,
        image: image[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingPortraitForm) {
      const { image, content, ...restFieldsValue } = editingPortraitForm;
      form.setFieldsValue({
        image: [{ url: image }],
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingPortraitForm]);

  return (
    <Drawer
      title={editingPortraitId ? "编辑企业评价" : "新增企业评价"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={portraitModalOpen}
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

const useEditingPortraitForm = (editingPortraitId: string) => {
  const queryClient = useQueryClient();
  const servicesResult: PortraitsResult | undefined = queryClient.getQueryData(
    usePortraitsQueryKey()
  );
  const currentPortrait = servicesResult
    ? servicesResult.list.find((item) => item.id === editingPortraitId)
    : undefined;

  const editingPortraitForm: PortraitForm | undefined = currentPortrait?.image
    ? currentPortrait
    : undefined;
  return editingPortraitForm;
};
