import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useArticleModal, useArticlesQueryKey } from "../util";
import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { ArticleCategory } from "types/article";
import { useAddArticle, useEditArticle } from "service/article";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";

export const ArticleModal = ({
  categoryList,
}: {
  categoryList: ArticleCategory[];
}) => {
  const [form] = useForm();

  const {
    isLoading,
    articleModalOpen,
    editingArticleId,
    editingArticleForm,
    close,
  } = useArticleModal();

  const useMutationArticle = editingArticleId ? useEditArticle : useAddArticle;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationArticle(useArticlesQueryKey());
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
      const { img, ...restFieldsValue } = form.getFieldsValue();
      await mutateAsync({
        id: editingArticleId || "",
        content,
        img: img[0].url,
        ...restFieldsValue,
      });
      closeModal();
    });
  };

  useEffect(() => {
    if (editingArticleForm) {
      const { img, content, ...restFieldsValue } = editingArticleForm;
      form.setFieldsValue({ img: [{ url: img }], ...restFieldsValue });
      setContent(content);
    }
  }, [form, editingArticleForm]);

  return (
    <Drawer
      title={editingArticleId ? "编辑文章" : "新增文章"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={articleModalOpen}
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
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <Form form={form} layout="vertical">
          <ErrorBox error={error} />
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="文章标题"
                rules={[{ required: true, message: "请输入文章标题" }]}
              >
                <Input placeholder="请输入头图标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="article_class_id"
                label="文章分类"
                rules={[{ required: true, message: "请选择文章分类" }]}
              >
                <Select placeholder="请选择文章分类">
                  {categoryList?.map(({ id, title }) => (
                    <Select.Option key={id} value={id}>
                      {title}
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
            <Col span={12}>
              <Form.Item label="虚拟点赞数" name="virtual_like">
                <Input placeholder="请输入虚拟点赞数" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="虚拟观看数" name="virtual_look">
                <Input placeholder="请输入虚拟观看数" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="img"
            label="分享图片"
            tooltip="图片大小不能超过10MB"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <OssUpload maxCount={1} />
          </Form.Item>
          <Form.Item label="文章内容" tooltip="排版自定义规则">
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};

const Loading = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
