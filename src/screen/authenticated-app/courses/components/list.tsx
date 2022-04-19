import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCourseModal, useCoursesQueryKey } from "../util";
import { CourseAuthor, CourseItem, CoursesSearchParams } from "types/course";
import { useDeleteCourse } from "service/course";

interface ListProps extends TableProps<CourseItem> {
  authorList: CourseAuthor[];
  error: Error | unknown;
  params: Partial<CoursesSearchParams>;
  setParams: (params: Partial<CoursesSearchParams>) => void;
}

export const List = ({
  authorList,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useCourseModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>课堂列表</h3>
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
            render: (value, course, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
            width: "8rem",
          },
          {
            title: "封面",
            render: (value, course) => (
              <img
                style={{ width: "8.8rem", height: "6.2rem" }}
                src={course.cover_img}
                alt=""
              />
            ),
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "关联作者",
            render: (value, course) => (
              <Author>
                <Avatar src={course.author.head_img} icon={<UserOutlined />} />
                <span style={{ marginLeft: "1rem" }}>
                  {course.author.author_name}
                </span>
              </Author>
            ),
          },
          {
            title: "视频标签",
            render: (value, course) =>
              course.tags.map((item, index) => <Tag key={index}>{item}</Tag>),
          },
          {
            title: "密码",
            dataIndex: "password",
          },
          {
            title: "权重",
            dataIndex: "sort",
            width: "8rem",
          },
          {
            title: "状态",
            render: (value, course) => (
              <span>
                {course.try_time ? `试看${course.try_time}分钟` : "免费"}
              </span>
            ),
          },
          {
            title: "创建时间",
            render: (value, course) => (
              <span>
                {dayjs(Number(course.created_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
          },
          {
            title: "操作",
            render(value, course) {
              return <More course={course} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ course }: { course: CourseItem }) => {
  const { mutate: deleteCourse } = useDeleteCourse(useCoursesQueryKey());

  const { startEdit } = useCourseModal();

  const confirmDeleteCourse = (course: CourseItem) => {
    Modal.confirm({
      title: "确定删除该文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCourse(course),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(course.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteCourse(course)} key={"delete"}>
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

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  display: inline-block;
  margin: 0.5rem 1rem 0.5rem 0;
  padding: 0 1rem;
  border: 1px solid #d1d1d1;
  border-radius: 0.5rem;
`;
