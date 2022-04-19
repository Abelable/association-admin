import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  InputNumber,
} from "antd";
import { useCourseModal, useCoursesQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-video-upload";
import { ErrorBox } from "components/lib";
import { CourseAuthor, CoursesResult, CourseItem } from "types/course";
import { useAddCourse, useEditCourse } from "service/course";
import { RichTextEditor } from "components/rich-text-editor";
import { useQueryClient } from "react-query";

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
  const [introduction, setIntroduction] = useState("");

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    setIntroduction("");
    close();
  };

  const submit = () => {
    form.validateFields().then(async () => {
      const { video, is_try, tags, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingCourseId || "",
        cover_img: video[0].cover,
        media_url: video[0].url,
        duration: video[0].duration,
        is_try: is_try ? 1 : 0,
        tags: tags.join(),
        introduction,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useEffect(() => {
    if (editingCourseForm) {
      const {
        title,
        cover_img,
        media_url,
        duration,
        author_id,
        tags,
        is_try,
        introduction,
        ...restFieldsValue
      } = editingCourseForm;
      form.setFieldsValue({
        title,
        video: [
          { name: `${title}.mp4`, url: cover_img, cover: cover_img, duration },
        ],
        tags: typeof tags === "string" ? (tags as string).split(",") : tags,
        author_id: `${author_id}`,
        is_try: !!is_try,
        ...restFieldsValue,
      });
      setIntroduction(introduction);
    }
  }, [form, editingCourseForm]);

  return (
    <Drawer
      title={editingCourseId ? "编辑课堂" : "新增课堂"}
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
        <Form.Item
          name="video"
          label="上传视频"
          rules={[{ required: true, message: "请上传视频" }]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <OssUpload maxCount={1} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="作品名称"
              rules={[{ required: true, message: "请输入作品名称" }]}
            >
              <Input placeholder="请输入作品名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="视频标签"
              rules={[{ required: true, message: "请输入视频标签" }]}
              tooltip="最多可生成3个标签"
            >
              <Select mode="tags" placeholder="输入后回车生产标签" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="author_id"
              label="关联作者"
              rules={[{ required: true, message: "请选择作者" }]}
            >
              <Select placeholder="请选择作者">
                {authorList?.map(({ id, author_name }) => (
                  <Select.Option key={id} value={id}>
                    {author_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="课堂权重"
              name="sort"
              rules={[{ required: true, message: "请输入课堂权重" }]}
            >
              <Input placeholder="请输入课堂权重" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={3}>
            <Form.Item name="is_try" label="是否试看" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item label="试看时间（分钟）" name="try_time">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入课堂权重"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="观看密码" name="password">
              <Input placeholder="请输入6位数字密码" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="简介说明" tooltip="排版自定义规则">
          <RichTextEditor content={introduction} setContent={setIntroduction} />
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
    ? coursesResult.list.find((item) => item.id === Number(editingCourseId))
    : undefined;

  const editingCourseForm: CourseItem | undefined = currentCourse?.id
    ? currentCourse
    : undefined;

  return editingCourseForm;
};
