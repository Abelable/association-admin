import { toNumber } from "utils";
import { useUsers } from "service/user";

import { Button, DatePicker, Input, Table, TableProps } from "antd";
import { Row } from "components/lib";
import { SearchOutlined } from "@ant-design/icons";

import "moment/locale/zh-cn";
import locale from "antd/lib/date-picker/locale/zh_CN";

import { User } from "types/user";
import styled from "@emotion/styled";
import dayjs from "dayjs";

export const Users = () => {
  const { data, isLoading } = useUsers({ page: 1 });
  const pagination = {
    current: toNumber(data?.page),
    pageSize: toNumber(data?.page_size),
    total: toNumber(data?.total),
  };

  return (
    <div>
      <SearchPanel />
      <List
        dataSource={data?.list}
        loading={isLoading}
        pagination={pagination}
      />
    </div>
  );
};

const SearchPanel = () => {
  return (
    <Row marginBottom={2} gap={true}>
      <Row>
        <div>注册时间：</div>
        <DatePicker.RangePicker locale={locale} />
      </Row>
      <Row>
        <div>微信昵称：</div>
        <Input style={{ width: "20rem" }} placeholder="请输入微信昵称" />
      </Row>
      <Button type={"primary"} icon={<SearchOutlined />}>
        查询
      </Button>
    </Row>
  );
};

interface ListProps extends TableProps<User> {}

const List = (props: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      columns={[
        {
          title: "编号",
          render: (value, user, index) => `${index + 1}`,
        },
        {
          title: "微信头像",
          render: (value, user, index) => <Avatar src={user.avatar_url} />,
        },
        {
          title: "微信昵称",
          dataIndex: "nickname",
        },
        {
          title: "性别",
          render: (value, user, index) => (
            <span>{user.gender === "1" ? "男" : "女"}</span>
          ),
        },
        {
          title: "地区",
          dataIndex: "province",
        },
        {
          title: "注册时间",
          render: (value, user, index) => (
            <span>
              {user.created_at
                ? dayjs(Number(user.created_at) * 1000).format(
                    "YYYY-MM-DD hh:mm"
                  )
                : "无"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

const Avatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
`;
