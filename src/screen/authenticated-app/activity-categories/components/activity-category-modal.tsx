import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import {
  useAddActivityCategory,
  useEditActivityCategory,
} from "service/activity-category";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  useActivityCategoriesQueryKey,
  useActivityCategoryModal,
} from "../util";
import type { Category } from "types/category";

export const ActivityCategoryModal = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [form] = useForm();
  const { activityCategoryModalOpen, editingActivityCategoryId, close } =
    useActivityCategoryModal();
  const activityCategory =
    categories?.find((item) => item.id === editingActivityCategoryId) ||
    undefined;
  const useMutationActivityCategory = editingActivityCategoryId
    ? useEditActivityCategory
    : useAddActivityCategory;
  const { mutateAsync, isLoading, error } = useMutationActivityCategory(
    useActivityCategoriesQueryKey()
  );

  useDeepCompareEffect(() => {
    if (activityCategory) {
      form.setFieldsValue(activityCategory);
    }
  }, [activityCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingActivityCategoryId || "",
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
      title={editingActivityCategoryId ? "编辑活动分类" : "新增活动分类"}
      visible={activityCategoryModalOpen}
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
