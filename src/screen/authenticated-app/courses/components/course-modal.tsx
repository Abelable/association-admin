import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { useCourseModal, useCoursesQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { CourseAuthor, CoursesResult } from "types/course";
import { useAddCourse, useEditCourse } from "service/course";
import { RichTextEditor } from "components/rich-text-editor";
import { useQueryClient } from "react-query";
import { CourseItem } from "../../../../types/course";

export const CourseModal = ({ authorList }: { authorList: CourseAuthor[] }) => {
  const [form] = useForm();

  const { courseModalOpen, editingCourseId, close } = useCourseModal();

  const useMutationCourse = editingCourseId ? useEditCourse : useAddCourse;
  const editingCourseForm = useEditingCourseForm(editingCourseId);
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationCourse(useCoursesQueryKey());
  const [content, setContent] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    setContent("");
    close();
  };
  const submit = () => {
    form.validateFields().then(async () => {
      const { image, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingCourseId || "",
        content,
        image: image[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useEffect(() => {
    if (editingCourseForm) {
      const { image, content, ...restFieldsValue } = editingCourseForm;
      form.setFieldsValue({
        image: [{ url: image }],
        ...restFieldsValue,
      });
      setContent(content);
    }
  }, [form, editingCourseForm]);

  return (
    <Drawer
      title={editingCourseId ? "编辑文章" : "新增文章"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={courseModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={mutateLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="文章标题"
              rules={[{ required: true, message: "请输入文章标题" }]}
            >
              <Input placeholder="请输入文章标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author_id"
              label="文章分类"
              rules={[{ required: true, message: "请选择文章分类" }]}
            >
              <Select placeholder="请选择文章分类">
                {authorList?.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="文章排序" name="sort">
              <Input placeholder="请输入文章排序" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="image"
          label="分享图片"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
        <Form.Item label="文章内容" tooltip="排版自定义规则">
          <RichTextEditor content={content} setContent={setContent} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const useEditingCourseForm = (editingCourseId: string) => {
  const queryClient = useQueryClient();
  const coursesResult: CoursesResult | undefined = queryClient.getQueryData(
    useCoursesQueryKey()
  );
  const currentCourse = coursesResult
    ? coursesResult.list.find((item) => item.id === editingCourseId)
    : undefined;

  const editingCourseForm: CourseItem | undefined = currentCourse?.image
    ? currentCourse
    : undefined;
  return editingCourseForm;
};
