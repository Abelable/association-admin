import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useWisdomModal, useWisdomsQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { useAddWisdom, useEditWisdom } from "service/wisdom";
import { RichTextEditor } from "components/rich-text-editor";
import { WisdomForm, WisdomsResult } from "types/wisdom";
import { useQueryClient } from "react-query";

export const WisdomModal = () => {
  const [form] = useForm();

  const { wisdomModalOpen, editingWisdomId, close } = useWisdomModal();

  const useMutationWisdom = editingWisdomId ? useEditWisdom : useAddWisdom;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationWisdom(useWisdomsQueryKey());
  const editingWisdomForm = useEditingWisdomForm(editingWisdomId);
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
      const { head_img, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingWisdomId || "",
        content,
        head_img: head_img[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useEffect(() => {
    if (editingWisdomForm) {
      const { head_img, content, ...restFieldsValue } = editingWisdomForm;
      form.setFieldsValue({
        head_img: [{ url: head_img }],
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingWisdomForm]);

  return (
    <Drawer
      title={editingWisdomId ? "编辑智库文章" : "新增智库文章"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={wisdomModalOpen}
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
              name="name"
              label="人物名称"
              rules={[{ required: true, message: "请输入人物名称" }]}
            >
              <Input placeholder="请输入人物名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="title" label="称号">
              <Input placeholder="请输入称号" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="honor" label="曾获荣誉">
              <Input placeholder="请输入曾获荣誉" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="field"
              label="领域（介绍）"
              rules={[{ required: true, message: "请输入领域（介绍）" }]}
            >
              <Input placeholder="请输入领域（介绍）" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
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
        <Form.Item
          name="head_img"
          label="人物头像"
          rules={[{ required: true, message: "请上传人物头像" }]}
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

const useEditingWisdomForm = (editingWisdomId: string) => {
  const queryClient = useQueryClient();
  const wisdomsResult: WisdomsResult | undefined = queryClient.getQueryData(
    useWisdomsQueryKey()
  );
  const currentWisdom = wisdomsResult
    ? wisdomsResult.list.find((item) => item.id === editingWisdomId)
    : undefined;

  const editingWisdomForm: WisdomForm | undefined = currentWisdom?.head_img
    ? currentWisdom
    : undefined;
  return editingWisdomForm;
};
