import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useAddValuation, useEditValuation } from "service/view";
import { Valuation } from "types/view";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useValuationsQueryKey, useValuationModal } from "../util";

export const ValuationModal = ({ valuations }: { valuations: Valuation[] }) => {
  const [form] = useForm();
  const { valuationModalOpen, editingValuationName, close } =
    useValuationModal();
  const valuation = valuations?.find(
    (item) => item.name === editingValuationName
  );
  const useMutationValuation = valuation?.id
    ? useEditValuation
    : useAddValuation;
  const { mutateAsync, isLoading, error } = useMutationValuation(
    useValuationsQueryKey()
  );

  useDeepCompareEffect(() => {
    if (valuation) {
      form.setFieldsValue({
        num: valuation.num,
      });
    }
  }, [valuation, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      if (valuation) {
        const { id, year, name } = valuation;
        const { num } = form.getFieldsValue();
        await mutateAsync(id ? { id, year, name, num } : { year, name, num });
        closeModal();
      }
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={`${valuation?.year}年第${valuation?.name}季度估值`}
      visible={valuationModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="num"
          label="估值（亿元）"
          rules={[{ required: true, message: "请输入估值" }]}
        >
          <Input placeholder="请输入估值" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
