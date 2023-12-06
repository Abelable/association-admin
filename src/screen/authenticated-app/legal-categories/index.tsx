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
import { useLegalCategories, useDeleteLegalCategory } from "service/legal";
import { toNumber } from "utils";
import {
  useLegalCategoriesQueryKey,
  useLegalCategoriesSearchParams,
  useLegalCategoryModal,
} from "./util";
import { PlusOutlined } from "@ant-design/icons";
import { LegalCategoryModal } from "./components/legal-category-modal";
import { LegalCategory } from "types/legal";
import dayjs from "dayjs";

export const LegalCategories = () => {
  const [params, setParams] = useLegalCategoriesSearchParams();
  const { data, isLoading, error } = useLegalCategories(params);
  const { startEdit, open } = useLegalCategoryModal();
  const { mutate: deleteLegalCategory } = useDeleteLegalCategory(
    useLegalCategoriesQueryKey()
  );
  const confirmDeleteLegalCategory = (category: LegalCategory) => {
    Modal.confirm({
      title: "确定删除该政策指南分类吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLegalCategory(category),
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
          <h3>分类列表</h3>
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
              title: "分类id",
              dataIndex: "id",
            },
            {
              title: "分类",
              dataIndex: "name",
            },
            {
              title: "图片",
              render: (value, category) => (
                <img
                  style={{ width: "8.8rem", height: "6.2rem" }}
                  src={category.image}
                  alt=""
                />
              ),
            },
            {
              title: "排序",
              dataIndex: "sort",
              sorter: (a, b) => Number(a.sort) - Number(b.sort),
            },
            {
              title: "创建时间",
              render: (value, category) => (
                <span>
                  {category.created_at
                    ? dayjs(Number(category.created_at) * 1000).format(
                        "YYYY-MM-DD HH:mm"
                      )
                    : "无"}
                </span>
              ),
              sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
            },
            {
              title: "修改时间",
              render: (value, category) => (
                <span>
                  {category.updated_at
                    ? dayjs(Number(category.updated_at) * 1000).format(
                        "YYYY-MM-DD HH:mm"
                      )
                    : "无"}
                </span>
              ),
              sorter: (a, b) => Number(a.updated_at) - Number(b.updated_at),
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
                        onClick={() => confirmDeleteLegalCategory(category)}
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
        <LegalCategoryModal legalCategories={data?.list || []} />
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
