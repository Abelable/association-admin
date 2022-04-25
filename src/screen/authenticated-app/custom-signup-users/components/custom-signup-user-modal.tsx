import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { OssUpload } from "components/oss-upload";
import { useEffect } from "react";
import {
  useAddCustomSignupUser,
  useEditCustomSignupUser,
} from "service/custom-signup";
import type { CustomSignupUser } from "types/custom-signup";
import {
  useCustomSignupUsersQueryKey,
  useCustomSignupUserModal,
} from "../util";

export const CustomSignupUserModal = ({
  customSignupUsers,
}: {
  customSignupUsers: CustomSignupUser[];
}) => {
  const [form] = useForm();
  const { customSignupUserModalOpen, editingCustomSignupUserId, close } =
    useCustomSignupUserModal();
  const customSignupUser =
    customSignupUsers?.find((item) => item.id === editingCustomSignupUserId) ||
    undefined;
  const useMutationCustomSignupUser = editingCustomSignupUserId
    ? useEditCustomSignupUser
    : useAddCustomSignupUser;
  const { mutateAsync, isLoading, error } = useMutationCustomSignupUser(
    useCustomSignupUsersQueryKey()
  );

  useEffect(() => {
    if (customSignupUser) {
      form.setFieldsValue(customSignupUser);
    }
  }, [customSignupUser, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { head_img, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingCustomSignupUserId || "",
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  return (
    <Modal
      title={editingCustomSignupUserId ? "编辑课堂作者" : "新增课堂作者"}
      visible={customSignupUserModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="author_name"
          label="作者名称"
          rules={[{ required: true, message: "请输入作者名称" }]}
        >
          <Input placeholder="请输入作者名称" />
        </Form.Item>
        <Form.Item
          name="head_img"
          label="作者头像"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传作者头像" }]}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
