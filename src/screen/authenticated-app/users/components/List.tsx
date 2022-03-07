import styled from "@emotion/styled";
import dayjs from "dayjs";
import { Avatar, Table, TablePaginationConfig, TableProps } from "antd";
import { SearchPanelProps } from "./search-panel";
import { UserOutlined } from "@ant-design/icons";
import { User } from "types/user";
import { ErrorBox } from "components/lib";

interface ListProps extends TableProps<User>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Title>用户列表</Title>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "编号",
            render: (value, user, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
          },
          {
            title: "微信头像",
            render: (value, user) => (
              <Avatar src={user.avatar_url} icon={<UserOutlined />} />
            ),
          },
          {
            title: "微信昵称",
            dataIndex: "nickname",
          },
          {
            title: "性别",
            render: (value, user) => (
              <span>
                {user.gender === "0"
                  ? "未知"
                  : user.gender === "1"
                  ? "男"
                  : "女"}
              </span>
            ),
          },
          {
            title: "地区",
            render: (value, user) => (
              <span>
                {user.province ? `${user.province}${user.city}` : "暂无"}
              </span>
            ),
          },
          {
            title: "注册时间",
            render: (value, user) => (
              <span>
                {user.created_at
                  ? dayjs(Number(user.created_at) * 1000).format(
                      "YYYY-MM-DD HH:mm"
                    )
                  : "无"}
              </span>
            ),
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Title = styled.h3`
  margin-bottom: 2.4rem;
`;
