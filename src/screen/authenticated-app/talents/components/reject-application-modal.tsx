import { Form, Input, Modal, ModalProps } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useRejectApplications } from "service/application";
import { useApplicationsQueryKey } from "../util";

interface RejectApplicationModalProps extends Omit<ModalProps, "onCancel"> {
  rejectingApplicationId: string;
  onCancel: () => void;
}

export const RejectApplicationModal = ({
  rejectingApplicationId,
  onCancel,
}: RejectApplicationModalProps) => {
  const [form] = useForm();
  const { mutateAsync, isLoading, error } = useRejectApplications(
    useApplicationsQueryKey()
  );

  const reject = () => {
    form.validateFields().then(async () => {
      const { reason } = form.getFieldsValue();
      await mutateAsync({ ids: [rejectingApplicationId], reject_mark: reason });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="确定驳回该入会申请吗？"
      visible={!!rejectingApplicationId}
      confirmLoading={isLoading}
      onOk={reject}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="reason"
          label="驳回理由"
          rules={[{ required: true, message: "请输入驳回理由" }]}
        >
          <Input placeholder="请输入驳回理由" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
