import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { CourseCategoryModal } from "./components/course-category-modal";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useCourseCategories,
  useDeleteCourseCategory,
} from "service/course-category";
import { toNumber } from "utils";
import {
  useCourseCategoriesQueryKey,
  useCourseCategoriesSearchParams,
  useCourseCategoryModal,
} from "./util";

import type { Category } from "types/category";

export const CourseCategories = () => {
  const [params, setParams] = useCourseCategoriesSearchParams();
  const { data, isLoading, error } = useCourseCategories(params);
  const { startEdit, open } = useCourseCategoryModal();
  const { mutate: deleteCourseCategory } = useDeleteCourseCategory(
    useCourseCategoriesQueryKey()
  );
  const confirmDeleteCourseCategory = (category: Category) => {
    Modal.confirm({
      title: "确定删除该分类吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCourseCategory(category),
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
              title: "分类名称",
              dataIndex: "name",
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
                        onClick={() => confirmDeleteCourseCategory(category)}
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
        <CourseCategoryModal categories={data?.list || []} />
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
