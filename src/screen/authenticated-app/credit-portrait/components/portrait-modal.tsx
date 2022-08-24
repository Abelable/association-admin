import { useState } from "react";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import moment from "moment";
import { useForm } from "antd/lib/form/Form";
import { useAddEvaluation, useEditEvaluation } from "service/credit-portrait";
import { usePortraitModal, usePortraitsQueryKey } from "../util";

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
import { ErrorBox } from "components/lib";
import { RichTextEditor } from "components/rich-text-editor";

import type {
  CategoryOption,
  PortraitForm,
  PortraitsResult,
} from "types/credit-portrait";

export const PortraitModal = ({
  categoryOptions,
}: {
  categoryOptions: CategoryOption[];
}) => {
  const [form] = useForm();

  const { portraitModalOpen, editingPortraitId, close } = usePortraitModal();

  const useMutationPortrait = editingPortraitId
    ? useEditEvaluation
    : useAddEvaluation;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationPortrait(usePortraitsQueryKey());
  const editingPortraitForm = useEditingPortraitForm(editingPortraitId);
  const [content, setContent] = useState("");

  const closeModal = () => {
    form.resetFields();
    setContent("");
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const { image, promulgation_time, ...restFieldsValue } =
        form.getFieldsValue();
      await mutateAsync({
        id: editingPortraitId || "",
        content,
        image: image[0].url,
        promulgation_time: `${moment(promulgation_time).unix()}`,
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
            <Form.Item label="文章排序" name="sort">
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="promulgation_time"
              label="触发时间"
              rules={[{ required: true, message: "请选择触发时间" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="请选择触发时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
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
          <Col span={12}>
            <Form.Item name="company_name" label="关联企业">
              <Input placeholder="请输入关联企业" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="evaluation" label="企业评价">
              <Select placeholder="请选择企业评价">
                {categoryOptions.map(({ id, name }) => (
                  <Select.Option key={id}>{name}</Select.Option>
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
        <Form.Item label="文章内容" tooltip="排版自定义规则">
          <RichTextEditor content={content} setContent={setContent} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingPortraitForm = (editingPortraitId: string) => {
  const queryClient = useQueryClient();
  const portraitsResult: PortraitsResult | undefined = queryClient.getQueryData(
    usePortraitsQueryKey()
  );
  const currentPortrait = portraitsResult
    ? portraitsResult.list.find((item) => item.id === editingPortraitId)
    : undefined;

  let editingPortraitForm: PortraitForm | undefined;

  if (currentPortrait) {
    const { promulgation_time, ...rest } = currentPortrait;

    editingPortraitForm = {
      promulgation_time: promulgation_time
        ? moment(Number(promulgation_time) * 1000)
        : undefined,
      ...rest,
    };
  }

  return editingPortraitForm;
};
