import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEditExpend } from "service/financial-data";
import { ExpendItem } from "types/financial-data";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useExpendsQueryKey, useExpendModal } from "../util";

export const ExpendModal = ({
  year,
  financials,
}: {
  year: string;
  financials: ExpendItem[] | undefined;
}) => {
  const [form] = useForm();
  const { expendModalOpen, editingExpendIndex, close } = useExpendModal();
  const financial = financials
    ? financials[Number(editingExpendIndex)]
    : undefined;
  const { mutateAsync, isLoading, error } = useEditExpend(useExpendsQueryKey());

  useDeepCompareEffect(() => {
    if (financial) {
      form.setFieldsValue(financial);
    }
  }, [financial, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const {
        member_expend,
        technology_expend,
        entertain_expend,
        meeting_expend,
        travel_expend,
        other_expend,
      } = form.getFieldsValue();
      const list: Partial<ExpendItem>[] = [];
      for (let i = 0; i < 12; i++) {
        if (i === Number(editingExpendIndex)) {
          if (financials && financials[i]) {
            list.push({
              ...financials[i],
              member_expend: Number(member_expend).toFixed(2),
              technology_expend: Number(technology_expend).toFixed(2),
              entertain_expend: Number(entertain_expend).toFixed(2),
              meeting_expend: Number(meeting_expend).toFixed(2),
              travel_expend: Number(travel_expend).toFixed(2),
              other_expend: Number(other_expend).toFixed(2),
              total_expend: (
                Number(member_expend) +
                Number(technology_expend) +
                Number(entertain_expend) +
                Number(meeting_expend)
              ).toFixed(2),
            });
          } else {
            list.push({
              year,
              month: String(i + 1).length === 1 ? `0${i + 1}` : `0${i + 1}`,
              member_expend: Number(member_expend).toFixed(2),
              technology_expend: Number(technology_expend).toFixed(2),
              entertain_expend: Number(entertain_expend).toFixed(2),
              meeting_expend: Number(meeting_expend).toFixed(2),
              travel_expend: Number(travel_expend).toFixed(2),
              other_expend: Number(other_expend).toFixed(2),
              total_expend: (
                Number(member_expend) +
                Number(technology_expend) +
                Number(entertain_expend) +
                Number(meeting_expend)
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
              member_expend: "0.00",
              technology_expend: "0.00",
              entertain_expend: "0.00",
              meeting_expend: "0.00",
              travel_expend: "0.00",
              other_expend: "0.00",
              total_expend: "0.00",
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
      title={`编辑${year}年${Number(editingExpendIndex) + 1}月支出数据`}
      visible={expendModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="member_expend"
          label="人员工资"
          rules={[{ required: true, message: "请输入人员工资" }]}
        >
          <Input placeholder="请输入人员工资" />
        </Form.Item>
        <Form.Item
          name="technology_expend"
          label="技术服务支出"
          rules={[{ required: true, message: "请输入技术服务支出" }]}
        >
          <Input placeholder="请输入技术服务支出" />
        </Form.Item>
        <Form.Item
          name="entertain_expend"
          label="招待费"
          rules={[{ required: true, message: "请输入招待费" }]}
        >
          <Input placeholder="请输入招待费" />
        </Form.Item>
        <Form.Item
          name="meeting_expend"
          label="会议费"
          rules={[{ required: true, message: "请输入会议费" }]}
        >
          <Input placeholder="请输入会议费" />
        </Form.Item>
        <Form.Item
          name="travel_expend"
          label="差旅费"
          rules={[{ required: true, message: "请输入差旅费" }]}
        >
          <Input placeholder="请输入差旅费" />
        </Form.Item>
        <Form.Item
          name="other_expend"
          label="其他支出"
          rules={[{ required: true, message: "请输入其他支出" }]}
        >
          <Input placeholder="请输入其他支出" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
