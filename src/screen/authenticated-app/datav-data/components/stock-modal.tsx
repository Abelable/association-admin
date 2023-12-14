import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditStock } from "service/view";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useStocksQueryKey, useStockModal } from "../util";

export const StockModal = () => {
  const [form] = useForm();
  const { stockModalOpen, editingStock, close } = useStockModal();
  const { mutateAsync, isLoading, error } = useEditStock(useStocksQueryKey());

  useDeepCompareEffect(() => {
    if (editingStock) {
      form.setFieldsValue(editingStock);
    }
  }, [editingStock, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingStock, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={`${editingStock?.type}企业数量`}
      visible={stockModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="in_province"
          label="省内数量"
          rules={[{ required: true, message: "请输入省内数量" }]}
        >
          <Input placeholder="请输入省内数量" />
        </Form.Item>
        <Form.Item
          name="out_province"
          label="省外数量"
          rules={[{ required: true, message: "请输入省外数量" }]}
        >
          <Input placeholder="请输入省外数量" />
        </Form.Item>
        <Form.Item
          name="international"
          label="国际数量"
          rules={[{ required: true, message: "请输入国际数量" }]}
        >
          <Input placeholder="请输入国际数量" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
