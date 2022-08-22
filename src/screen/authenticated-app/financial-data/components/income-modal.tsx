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
      const { member_income, project_income, service_income, other_income } =
        form.getFieldsValue();
      const list: Partial<IncomeItem>[] = [];
      for (let i = 0; i < 12; i++) {
        if (i === Number(editingIncomeIndex)) {
          if (financials && financials[i]) {
            list.push({
              ...financials[i],
              member_income: Number(member_income).toFixed(2),
              project_income: Number(project_income).toFixed(2),
              service_income: Number(service_income).toFixed(2),
              other_income: Number(other_income).toFixed(2),
              total_income: (
                Number(member_income) +
                Number(project_income) +
                Number(service_income) +
                Number(other_income)
              ).toFixed(2),
            });
          } else {
            list.push({
              year,
              month: String(i + 1).length === 1 ? `0${i + 1}` : `0${i + 1}`,
              member_income: Number(member_income).toFixed(2),
              project_income: Number(project_income).toFixed(2),
              service_income: Number(service_income).toFixed(2),
              other_income: Number(other_income).toFixed(2),
              total_income: (
                Number(member_income) +
                Number(project_income) +
                Number(service_income) +
                Number(other_income)
              ).toFixed(2),
            });
          }
        } else {
          if (financials && financials[i]) {
            list.push(financials[i]);
          } else {
            list.push({
              year,
              month: String(i + 1).length === 1 ? `0${i + 1}` : `${i + 1}`,
              member_income: "0.00",
              project_income: "0.00",
              service_income: "0.00",
              other_income: "0.00",
              total_income: "0.00",
            });
          }
        }
      }
      await mutateAsync({
        apply_content_json: JSON.stringify(list),
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
