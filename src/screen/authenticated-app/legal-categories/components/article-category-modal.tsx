import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { useEffect } from "react";
import { useAddArticleCategory, useEditArticleCategory } from "service/article";
import { ArticleCategory } from "types/article";
import { useArticleCategoriesQueryKey, useArticleCategoryModal } from "../util";

export const ArticleCategoryModal = ({
  articleCategories,
}: {
  articleCategories: ArticleCategory[];
}) => {
  const [form] = useForm();
  const { articleCategoryModalOpen, editingArticleCategoryId, close } =
    useArticleCategoryModal();
  const articleCategory =
    articleCategories?.find((item) => item.id === editingArticleCategoryId) ||
    undefined;
  const useMutationArticleCategory = editingArticleCategoryId
    ? useEditArticleCategory
    : useAddArticleCategory;
  const { mutateAsync, isLoading, error } = useMutationArticleCategory(
    useArticleCategoriesQueryKey()
  );

  useEffect(() => {
    articleCategory && form.setFieldsValue(articleCategory);
  }, [articleCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...articleCategory, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      title={editingArticleCategoryId ? "编辑文章分类" : "新增文章分类"}
      visible={articleCategoryModalOpen}
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
