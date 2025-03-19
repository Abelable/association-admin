import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { ErrorBox } from "components/lib";

import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useForm } from "antd/lib/form/Form";
import { useAddIndustry, useEditIndustry } from "service/industry";
import { useIndustryModal, useIndustryListQueryKey } from "../util";

import type { Industry, IndustryListResult } from "types/industry";

export const IndustryModal = ({
  cityOptions,
}: {
  cityOptions: { id: number; name: string }[];
}) => {
  const [form] = useForm();

  const { industryModalOpen, editingIndustryId, close } = useIndustryModal();

  const useMutationIndustry = editingIndustryId
    ? useEditIndustry
    : useAddIndustry;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationIndustry(useIndustryListQueryKey());
  const editingIndustryForm = useEditingIndustryForm(editingIndustryId);

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingIndustryId || "",
        ...form.getFieldsValue(),
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingIndustryForm) {
      form.setFieldsValue(editingIndustryForm);
    }
  }, [form, editingIndustryForm]);

  return (
    <Drawer
      title={editingIndustryId ? "编辑地区产业" : "新增地区产业"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={industryModalOpen}
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
              label="地区"
              name="city_id"
              rules={[{ required: true, message: "请选择地区" }]}
            >
              <Select placeholder="请选择地区">
                {cityOptions?.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Col span={12}>
              <Form.Item
                name="main"
                label="核心产业带"
                rules={[{ required: true, message: "请输入核心产业带" }]}
              >
                <Input placeholder="请输入核心产业带" />
              </Form.Item>
            </Col>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="top"
              label="核心TOP行业"
              rules={[{ required: true, message: "请输入核心TOP行业" }]}
            >
              <Input placeholder="请输入核心TOP行业" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

const useEditingIndustryForm = (editingIndustryId: string) => {
  const queryClient = useQueryClient();
  const IndustryListResult: IndustryListResult | undefined =
    queryClient.getQueryData(useIndustryListQueryKey());
  const currentIndustry = IndustryListResult
    ? IndustryListResult.list.find((item) => item.id === editingIndustryId)
    : undefined;

  const editingIndustryForm: Industry | undefined = currentIndustry?.city_id
    ? currentIndustry
    : undefined;
  return editingIndustryForm;
};
