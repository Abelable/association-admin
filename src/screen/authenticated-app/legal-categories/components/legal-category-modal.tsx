import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEffect } from "react";
import { useAddLegalCategory, useEditLegalCategory } from "service/legal";
import { LegalCategory } from "types/legal";
import { useLegalCategoriesQueryKey, useLegalCategoryModal } from "../util";

export const LegalCategoryModal = ({
  legalCategories,
}: {
  legalCategories: LegalCategory[];
}) => {
  const [form] = useForm();
  const { legalCategoryModalOpen, editingLegalCategoryId, close } =
    useLegalCategoryModal();
  const legalCategory =
    legalCategories?.find((item) => item.id === editingLegalCategoryId) ||
    undefined;
  const useMutationLegalCategory = editingLegalCategoryId
    ? useEditLegalCategory
    : useAddLegalCategory;
  const { mutateAsync, isLoading, error } = useMutationLegalCategory(
    useLegalCategoriesQueryKey()
  );

  useEffect(() => {
    legalCategory && form.setFieldsValue(legalCategory);
  }, [legalCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...legalCategory, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={editingLegalCategoryId ? "编辑文章分类" : "新增文章分类"}
      visible={legalCategoryModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form}>
        <Form.Item
          name="title"
          label="分类名称"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
        <Form.Item
          name="sort"
          label="排序序号"
          rules={[{ required: true, message: "请输入排序序号" }]}
        >
          <Input placeholder="请输入排序序号" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
