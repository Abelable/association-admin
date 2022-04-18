import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import {
  useArticleCategories,
  useDeleteArticleCategory,
} from "service/article";
import { toNumber } from "utils";
import {
  useArticleCategoriesQueryKey,
  useArticleCategoriesSearchParams,
  useArticleCategoryModal,
} from "./util";
import { PlusOutlined } from "@ant-design/icons";
import { ArticleCategoryModal } from "./components/article-category-modal";

export const ArticleCategories = () => {
  const [params, setParams] = useArticleCategoriesSearchParams();
  const { data, isLoading, error } = useArticleCategories(params);
  const { startEdit, open } = useArticleCategoryModal();
  const { mutate: deleteArticleCategory } = useDeleteArticleCategory(
    useArticleCategoriesQueryKey()
  );
  const confirmDeleteArticleCategory = (id: string) => {
    Modal.confirm({
      title: "确定删除该文章分类吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteArticleCategory(id),
    });
  };
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
          <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
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
                      <Menu.Item
                        onClick={() => startEdit(category.id)}
                        key={"edit"}
                      >
                        编辑
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          confirmDeleteArticleCategory(category.id)
                        }
                        key={"delete"}
                      >
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
        <ArticleCategoryModal articleCategories={data?.list || []} />
      </Main>
    </Container>
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
