import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { OssUpload } from "components/oss-upload";
import { useAddLegalCategory, useEditLegalCategory } from "service/legal";
import { LegalCategory } from "types/legal";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useLegalCategoriesQueryKey, useLegalCategoryModal } from "../util";

export const LegalCategoryModal = ({
  parentCategoryId,
  legalCategories,
}: {
  parentCategoryId: string;
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

  useDeepCompareEffect(() => {
    if (legalCategory) {
      const { image, ...restFieldsValue } = legalCategory;
      form.setFieldsValue({
        image: [{ url: image }],
        ...restFieldsValue,
      });
    }
  }, [legalCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { image, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        pid: parentCategoryId,
        id: editingLegalCategoryId || "",
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
      title={editingLegalCategoryId ? "编辑政策指南分类" : "新增政策指南分类"}
      visible={legalCategoryModalOpen}
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
        <Form.Item name="sort" label="排序序号">
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
