import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditFinancial } from "service/financial-data";
import { FinancialItem } from "types/financial-data";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useFinancialsQueryKey, useFinancialModal } from "../util";

export const FinancialModal = ({
  type,
  year,
  financials,
}: {
  type: string;
  year: string;
  financials: FinancialItem[] | undefined;
}) => {
  const [form] = useForm();
  const { financialModalOpen, editingFinancialIndex, close } =
    useFinancialModal();
  const financial = financials
    ? financials[Number(editingFinancialIndex)]
    : undefined;
  const { mutateAsync, isLoading, error } = useEditFinancial(
    useFinancialsQueryKey()
  );

  useDeepCompareEffect(() => {
    if (financial) {
      form.setFieldsValue(financial);
    }
  }, [financial, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { head_img, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingFinancialIndex || "",
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
      title={`编辑${year}年${Number(editingFinancialIndex) + 1}月${
        type === "0" ? "收入" : "支出"
      }数据`}
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
