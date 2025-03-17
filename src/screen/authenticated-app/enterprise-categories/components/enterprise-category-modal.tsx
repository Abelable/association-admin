import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import {
  useAddEnterpriseCategory,
  useEditEnterpriseCategory,
} from "service/enterprise-category";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  useEnterpriseCategoriesQueryKey,
  useEnterpriseCategoryModal,
} from "../util";
import type { Category } from "types/category";

export const EnterpriseCategoryModal = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [form] = useForm();
  const { enterpriseCategoryModalOpen, editingEnterpriseCategoryId, close } =
    useEnterpriseCategoryModal();
  const enterpriseCategory =
    categories?.find((item) => item.id === editingEnterpriseCategoryId) ||
    undefined;
  const useMutationEnterpriseCategory = editingEnterpriseCategoryId
    ? useEditEnterpriseCategory
    : useAddEnterpriseCategory;
  const { mutateAsync, isLoading, error } = useMutationEnterpriseCategory(
    useEnterpriseCategoriesQueryKey()
  );

  useDeepCompareEffect(() => {
    if (enterpriseCategory) {
      form.setFieldsValue(enterpriseCategory);
    }
  }, [enterpriseCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingEnterpriseCategoryId || "",
        ...form.getFieldsValue(),
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
      title={editingEnterpriseCategoryId ? "编辑企业分类" : "新增企业分类"}
      visible={enterpriseCategoryModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
        <Form.Item name="sort" label="排序序号">
          <Input placeholder="请输入排序序号" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
