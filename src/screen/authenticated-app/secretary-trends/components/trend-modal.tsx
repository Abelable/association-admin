import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useTrendModal, useTrendsQueryKey } from "../util";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddTrend, useEditTrend } from "service/secretary-trends";
import { TrendsResult } from "types/secretary-trends";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";

export const TrendModal = () => {
  const [form] = useForm();

  const { trendModalOpen, editingTrendId, close } = useTrendModal();

  const useMutationTrend = editingTrendId ? useEditTrend : useAddTrend;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationTrend(useTrendsQueryKey());
  const editingTrendForm = useEditingTrendForm(editingTrendId);

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingTrendId || "",
        ...form.getFieldsValue(),
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    if (editingTrendForm) {
      form.setFieldsValue(editingTrendForm);
    }
  }, [form, editingTrendForm]);

  return (
    <Drawer
      title={editingTrendId ? "编辑行业检测" : "新增行业检测"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={trendModalOpen}
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
            <Form.Item label="文章排序" name="sort">
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="content"
              label="文章内容"
              rules={[
                {
                  required: true,
                  message: "请输入文章内容",
                },
              ]}
            >
              <Input.TextArea rows={20} placeholder="请输入文章内容" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

const useEditingTrendForm = (editingTrendId: string) => {
  const queryClient = useQueryClient();
  const servicesResult: TrendsResult | undefined = queryClient.getQueryData(
    useTrendsQueryKey()
  );
  const currentTrend = servicesResult
    ? servicesResult.list.find((item) => item.id === editingTrendId)
    : undefined;
  return currentTrend;
};
