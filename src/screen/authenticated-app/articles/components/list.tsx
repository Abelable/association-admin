import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useArticleModal, useArticlesQueryKey } from "../util";
import { ArticleItem, ArticlesSearchParams } from "types/article";
import { useDeleteArticle } from "service/article";

interface ListProps extends TableProps<ArticleItem> {
  error: Error | unknown;
  params: Partial<ArticlesSearchParams>;
  setParams: (params: Partial<ArticlesSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useArticleModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>文章列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            render: (value, article, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "图片",
            render: (value, article) => (
              <img
                style={{ width: "8.8rem", height: "6.2rem" }}
                src={article.img}
                alt=""
              />
            ),
          },
          {
            title: "排序",
            dataIndex: "sort",
          },
          {
            title: "观看数",
            dataIndex: "show_look",
          },
          {
            title: "点赞数",
            dataIndex: "show_like",
          },
          {
            title: "分类标签",
            dataIndex: "class_name",
          },
          {
            title: "创建时间",
            render: (value, article) => (
              <span>
                {dayjs(Number(article.created_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
          },
          {
            title: "修改时间",
            render: (value, article) => (
              <span>
                {dayjs(Number(article.updated_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
          },
          {
            title: "操作",
            render(value, article) {
              return <More id={article.id} />;
            },
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: string }) => {
  const { mutate: deleteArticle } = useDeleteArticle(useArticlesQueryKey());

  const { startEdit } = useArticleModal();

  const confirmDeleteArticle = (id: string) => {
    Modal.confirm({
      title: "确定删除该文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteArticle(id),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteArticle(id)} key={"delete"}>
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
