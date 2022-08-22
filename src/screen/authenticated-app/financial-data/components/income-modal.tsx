import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditIncome } from "service/financial-data";
import { IncomeItem } from "types/financial-data";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useIncomesQueryKey, useIncomeModal } from "../util";

export const IncomeModal = ({
  year,
  financials,
}: {
  year: string;
  financials: IncomeItem[] | undefined;
}) => {
  const [form] = useForm();
  const { financialModalOpen, editingIncomeIndex, close } = useIncomeModal();
  const financial = financials
    ? financials[Number(editingIncomeIndex)]
    : undefined;
  const { mutateAsync, isLoading, error } = useEditIncome(useIncomesQueryKey());

  useDeepCompareEffect(() => {
    if (financial) {
      form.setFieldsValue(financial);
    }
  }, [financial, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { head_img, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingIncomeIndex || "",
        head_img: head_img[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={`编辑${year}年${Number(editingIncomeIndex) + 1}月收入数据`}
      visible={financialModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="member_income"
          label="会费收入"
          rules={[{ required: true, message: "请输入会费收入" }]}
        >
          <Input placeholder="请输入会费收入" />
        </Form.Item>
        <Form.Item
          name="project_income"
          label="项目收入"
          rules={[{ required: true, message: "请输入项目收入" }]}
        >
          <Input placeholder="请输入项目收入" />
        </Form.Item>
        <Form.Item
          name="service_income"
          label="服务收入"
          rules={[{ required: true, message: "请输入服务收入" }]}
        >
          <Input placeholder="请输入服务收入" />
        </Form.Item>
        <Form.Item
          name="other_income"
          label="其他收入"
          rules={[{ required: true, message: "请输入其他收入" }]}
        >
          <Input placeholder="请输入其他收入" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
