import { Table, TablePaginationConfig } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { TableProps } from "antd";
import { User } from "types/user";
import { SearchPanelProps } from "./SearchPanel";

export interface ListProps extends TableProps<User>, SearchPanelProps {}

export const List = ({ params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) => {
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });
  };

  return (
    <Table
      rowKey={"id"}
      columns={[
        {
          title: "编号",
          render: (value, user, index) =>
            `${
              index +
              1 +
              ((params.page ? params.page : 1) - 1) *
                (params.page_size ? params.page_size : 10)
            }`,
        },
        {
          title: "微信头像",
          render: (value, user) => <Avatar src={user.avatar_url} />,
        },
        {
          title: "微信昵称",
          dataIndex: "nickname",
        },
        {
          title: "性别",
          render: (value, user) => (
            <span>
              {user.gender === "0" ? "未知" : user.gender === "1" ? "男" : "女"}
            </span>
          ),
        },
        {
          title: "地区",
          render: (value, user) => <span>{user.province || "无"}</span>,
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
  );
};
const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
`;
