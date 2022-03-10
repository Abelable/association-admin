import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import {
  useAddArticleCategory,
  useArticleCategories,
  useEditArticleCategory,
} from "service/article";
import { toNumber } from "utils";
import {
  useArticleCategoriesQueryKey,
  useArticleCategoriesSearchParams,
  useArticleCategoryModal,
} from "./util";
import { PlusOutlined } from "@ant-design/icons";
import { ArticleCategory } from "../../../types/article";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";

export const ArticleCategories = () => {
  const [params, setParams] = useArticleCategoriesSearchParams();
  const { data, isLoading, error } = useArticleCategories(params);
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Main>
        <Header between={true}>
          <h3>文章分类列表</h3>
          <Button onClick={() => {}} type={"primary"} icon={<PlusOutlined />}>
            新增
          </Button>
        </Header>
        <ErrorBox error={error} />
        <Table
          rowKey={"id"}
          dataSource={data?.list}
          loading={isLoading}
          columns={[
            {
              title: "编号",
              render: (value, user, index) =>
                `${
                  index +
                  1 +
                  ((params.page || 1) - 1) * (params.page_size || 10)
                }`,
            },
            {
              title: "分类名称",
              dataIndex: "title",
            },
            {
              title: "排序（越大越在前面）",
              dataIndex: "sort",
            },
            {
              title: "操作",
              render: (value, category) => (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => {}} key={"edit"}>
                        编辑
                      </Menu.Item>
                      <Menu.Item onClick={() => {}} key={"delete"}>
                        删除
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
                </Dropdown>
              ),
            },
          ]}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
          onChange={setPagination}
        />
        <ArticleCategoryModal articleCategories={data?.list} />
      </Main>
    </Container>
  );
};

const ArticleCategoryModal = ({
  articleCategories,
}: {
  articleCategories: ArticleCategory[];
}) => {
  const [form] = useForm();
  const { articleCategoryModalOpen, editingArticleCategoryId, close } =
    useArticleCategoryModal();
  const articleCategory = articleCategories.find(
    (item) => item.id === editingArticleCategoryId
  );
  const useMutationArticleCategory = editingArticleCategoryId
    ? useEditArticleCategory
    : useAddArticleCategory;
  const { mutateAsync, isLoading, error } = useMutationArticleCategory(
    useArticleCategoriesQueryKey()
  );

  useEffect(() => {
    form.setFieldsValue(articleCategory);
  }, [articleCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...articleCategory, ...form.getFieldsValue() });
      close();
    });
  };

  return (
    <Modal
      title={editingArticleCategoryId ? "编辑文章分类" : "新增文章分类"}
      visible={articleCategoryModalOpen}
      confirmLoading={isLoading}
      onOk={confirm}
      onCancel={close}
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

const Container = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const Main = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
