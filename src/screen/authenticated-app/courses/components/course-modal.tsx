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
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { OssVideoUpload } from "components/oss-video-upload";
import { ErrorBox } from "components/lib";
import { CourseAuthor, CoursesResult, CourseItem } from "types/course";
import { useAddCourse, useEditCourse } from "service/course";
import { RichTextEditor } from "components/rich-text-editor";
import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import type { Category } from "types/category";

export const CourseModal = ({
  authorList,
  courseCategoryOptions,
}: {
  authorList: CourseAuthor[];
  courseCategoryOptions: Category[];
}) => {
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
  const [isTry, setIsTry] = useState(false);

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
      const { cover_img, video, tags, ...restFieldsValue } =
        form.getFieldsValue();
      await mutateAsync({
        id: editingCourseId || "",
        cover_img: cover_img[0].url,
        media_url: video[0].url,
        duration: video[0].duration,
        is_try: isTry ? 1 : 0,
        tags: tags.length > 3 ? tags.slice(0, 3).join() : tags.join(),
        introduction,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
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
        cover_img: [{ url: cover_img }],
        video: [
          { name: `${title}.mp4`, url: media_url, cover: cover_img, duration },
        ],
        tags: typeof tags === "string" ? (tags as string).split(",") : tags,
        author_id: `${author_id}`,
        ...restFieldsValue,
      });
      setIntroduction(introduction);
      setIsTry(!!is_try);
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
          <OssVideoUpload />
        </Form.Item>
        <Form.Item
          name="cover_img"
          label="视频封面"
          tooltip="图片大小不能超过10MB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "请上传视频封面" }]}
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
              rules={[
                {
                  required: true,
                  type: "array",
                  max: 3,
                  message: "请输入视频标签(最大数量为3个)",
                },
              ]}
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
              rules={[{ required: true, message: "请选择关联作者" }]}
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
            <Form.Item label="课堂权重" name="sort">
              <Input placeholder="请输入课堂权重" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="category_id" label="课堂分类">
              <Select placeholder="请选择课堂分类">
                {courseCategoryOptions.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="观看人数" name="views">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="请输入观看人数"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="是否试看">
              <Switch checked={isTry} onChange={setIsTry} />
            </Form.Item>
          </Col>
        </Row>

        {isTry ? (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="试看时间（分钟）"
                name="try_time"
                rules={[{ required: true, message: "请输入试看时间" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入试看时间"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="观看密码"
                name="password"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^\d{6}$/, "g"),
                    message: "请输入6位数字密码",
                  },
                ]}
              >
                <Input placeholder="请输入6位数字密码" />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <></>
        )}
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
