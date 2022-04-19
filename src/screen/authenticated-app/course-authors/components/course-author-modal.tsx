import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { OssUpload } from "components/oss-upload";
import { useEffect } from "react";
import { useAddCourseAuthor, useEditCourseAuthor } from "service/course";
import { CourseAuthor } from "types/course";
import { useCourseAuthorsQueryKey, useCourseAuthorModal } from "../util";

export const CourseAuthorModal = ({
  courseCategories,
}: {
  courseCategories: CourseAuthor[];
}) => {
  const [form] = useForm();
  const { courseAuthorModalOpen, editingCourseAuthorId, close } =
    useCourseAuthorModal();
  const courseAuthor =
    courseCategories?.find((item) => item.id === editingCourseAuthorId) ||
    undefined;
  const useMutationCourseAuthor = editingCourseAuthorId
    ? useEditCourseAuthor
    : useAddCourseAuthor;
  const { mutateAsync, isLoading, error } = useMutationCourseAuthor(
    useCourseAuthorsQueryKey()
  );

  useEffect(() => {
    if (courseAuthor) {
      const { image, ...restFieldsValue } = courseAuthor;
      form.setFieldsValue({
        image: [{ url: image }],
        ...restFieldsValue,
      });
    }
  }, [courseAuthor, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { image, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingCourseAuthorId || "",
        image: image[0].url,
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
      title={editingCourseAuthorId ? "编辑法律汇编分类" : "新增法律汇编分类"}
      visible={courseAuthorModalOpen}
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
        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: "请输入分类描述" }]}
        >
          <Input placeholder="请输入分类描述" />
        </Form.Item>
        <Form.Item
          name="sort"
          label="排序序号"
          rules={[{ required: true, message: "请输入排序序号" }]}
        >
          <Input placeholder="请输入排序序号" />
        </Form.Item>
        <Form.Item
          name="image"
          label="图片"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传分类图片" }]}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
