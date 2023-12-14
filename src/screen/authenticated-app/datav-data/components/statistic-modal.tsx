import { Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditTatistic } from "service/view";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useTatisticsQueryKey, useTatisticModal } from "../util";

export const StatisticModal = () => {
  const [form] = useForm();
  const { tatisticModalOpen, editingTatistic, close } = useTatisticModal();
  const { mutateAsync, isLoading, error } = useEditTatistic(
    useTatisticsQueryKey()
  );

  useDeepCompareEffect(() => {
    if (editingTatistic) {
      form.setFieldsValue(editingTatistic);
    }
  }, [editingTatistic, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingTatistic, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={`编辑${editingTatistic?.name}`}
      visible={tatisticModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="num"
          label="数量"
          rules={[{ required: true, message: "请输入数量" }]}
        >
          <Input placeholder="请输入数量" />
        </Form.Item>
        <Form.Item
          name="type"
          label="趋势"
          rules={[{ required: true, message: "请选择趋势" }]}
        >
          <Select placeholder="请选择趋势" showArrow>
            {["上升", "持平", "下降"]?.map((item) => (
              <Select.Option key={item}>{item}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="rate"
          label="比例"
          rules={[{ required: true, message: "请输入比例" }]}
        >
          <Input placeholder="请输入比例" suffix="%" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
