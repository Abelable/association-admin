import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useLegalModal, useLegalsQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { LegalCategory } from "types/legal";
import { useAddLegal, useEditLegal } from "service/legal";
import { RichTextEditor } from "components/rich-text-editor";

export const LegalModal = ({
  categoryList,
}: {
  categoryList: LegalCategory[];
}) => {
  const [form] = useForm();

  const { legalModalOpen, editingLegalId, close } = useLegalModal();

  const useMutationLegal = editingLegalId ? useEditLegal : useAddLegal;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationLegal(useLegalsQueryKey());
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
      const { img, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingLegalId || "",
        content,
        img: img[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useEffect(() => {
    if (editingLegalForm) {
      const { img, content, legal_class_id, ...restFieldsValue } =
        editingLegalForm;
      form.setFieldsValue({
        img: [{ url: img }],
        legal_class_id: `${legal_class_id}`,
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingLegalForm]);

  return (
    <Drawer
      title={editingLegalId ? "编辑文章" : "新增文章"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={legalModalOpen}
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
              name="legal_class_id"
              label="文章分类"
              rules={[{ required: true, message: "请选择文章分类" }]}
            >
              <Select placeholder="请选择文章分类">
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
          <Col span={12}>
            <Form.Item label="文章排序" name="sort">
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="img"
          label="分享图片"
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
