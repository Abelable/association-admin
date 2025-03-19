import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import {
  useAddCourseCategory,
  useEditCourseCategory,
} from "service/course-category";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useCourseCategoriesQueryKey, useCourseCategoryModal } from "../util";
import type { Category } from "types/category";

export const CourseCategoryModal = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [form] = useForm();
  const { courseCategoryModalOpen, editingCourseCategoryId, close } =
    useCourseCategoryModal();
  const courseCategory =
    categories?.find((item) => item.id === editingCourseCategoryId) ||
    undefined;
  const useMutationCourseCategory = editingCourseCategoryId
    ? useEditCourseCategory
    : useAddCourseCategory;
  const { mutateAsync, isLoading, error } = useMutationCourseCategory(
    useCourseCategoriesQueryKey()
  );

  useDeepCompareEffect(() => {
    if (courseCategory) {
      form.setFieldsValue(courseCategory);
    }
  }, [courseCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        id: editingCourseCategoryId || "",
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
      title={editingCourseCategoryId ? "编辑课堂分类" : "新增课堂分类"}
      visible={courseCategoryModalOpen}
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
