import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useOpenInfoModal, useOpenInfoListQueryKey } from "../util";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { useAddOpenInfo, useEditOpenInfo } from "service/open-info";
import { RichTextEditor } from "components/rich-text-editor";
import { OpenInfo, OpenInfoListResult } from "types/open-info";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";

export const OpenInfoModal = () => {
  const [form] = useForm();

  const { openInfoModalOpen, editingOpenInfoId, close } = useOpenInfoModal();

  const useMutationOpenInfo = editingOpenInfoId
    ? useEditOpenInfo
    : useAddOpenInfo;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationOpenInfo(useOpenInfoListQueryKey());
  const editingOpenInfoForm = useEditingOpenInfoForm(editingOpenInfoId);
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
      const { cover, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingOpenInfoId || "",
        content,
        cover: cover[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingOpenInfoForm) {
      const { cover, content, ...restFieldsValue } = editingOpenInfoForm;
      form.setFieldsValue({
        cover: [{ url: cover }],
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingOpenInfoForm]);

  return (
    <Drawer
      title={editingOpenInfoId ? "编辑公开信息" : "新增公开信息"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={openInfoModalOpen}
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
        <Form.Item
          name="cover"
          label="文章封面"
          rules={[{ required: true, message: "请上传文章封面" }]}
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
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
              label="文章排序"
              name="sort"
              rules={[{ required: true, message: "请输入文章排序" }]}
            >
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="文章内容" required tooltip="排版自定义规则">
          <RichTextEditor content={content} setContent={setContent} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingOpenInfoForm = (editingOpenInfoId: string) => {
  const queryClient = useQueryClient();
  const OpenInfoListResult: OpenInfoListResult | undefined =
    queryClient.getQueryData(useOpenInfoListQueryKey());
  const currentOpenInfo = OpenInfoListResult
    ? OpenInfoListResult.list.find((item) => item.id === editingOpenInfoId)
    : undefined;

  const editingOpenInfoForm: OpenInfo | undefined = currentOpenInfo?.cover
    ? currentOpenInfo
    : undefined;
  return editingOpenInfoForm;
};
