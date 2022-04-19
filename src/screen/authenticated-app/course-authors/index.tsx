import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { useCourseAuthors, useDeleteCourseAuthor } from "service/course";
import { toNumber } from "utils";
import {
  useCourseAuthorsQueryKey,
  useCourseAuthorsSearchParams,
  useCourseAuthorModal,
} from "./util";
import { PlusOutlined } from "@ant-design/icons";
import { CourseAuthorModal } from "./components/course-author-modal";
import { CourseAuthor } from "types/course";
import dayjs from "dayjs";

export const CourseAuthors = () => {
  const [params, setParams] = useCourseAuthorsSearchParams();
  const { data, isLoading, error } = useCourseAuthors(params);
  const { startEdit, open } = useCourseAuthorModal();
  const { mutate: deleteCourseAuthor } = useDeleteCourseAuthor(
    useCourseAuthorsQueryKey()
  );
  const confirmDeleteCourseAuthor = (category: CourseAuthor) => {
    Modal.confirm({
      title: "确定删除该作者吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCourseAuthor(category),
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
          <h3>作者列表</h3>
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
              title: "作者名称",
              dataIndex: "author_name",
            },
            {
              title: "头像",
              render: (value, user) => (
                <Avatar src={user.head_img} icon={<UserOutlined />} />
              ),
            },
            {
              title: "创建时间",
              render: (value, user) => (
                <span>
                  {dayjs(Number(user.created_at) * 1000).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                </span>
              ),
              width: "18rem",
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
                        onClick={() => confirmDeleteCourseAuthor(category)}
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
        <CourseAuthorModal courseAuthors={data?.list || []} />
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
