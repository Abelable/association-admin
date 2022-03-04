import { toNumber } from "utils";
import { useUsers } from "service/user";

import {
  Button,
  DatePicker,
  Input,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { Row } from "components/lib";
import { SearchOutlined } from "@ant-design/icons";

import "moment/locale/zh-cn";
import locale from "antd/lib/date-picker/locale/zh_CN";

import { User, UsersSearchParams } from "types/user";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useState } from "react";

export const Users = () => {
  const [params, setParams] = useState<Partial<UsersSearchParams>>({ page: 1 });
  const { data, isLoading } = useUsers(params);
  const pagination = {
    current: toNumber(data?.page),
    pageSize: toNumber(data?.page_size),
    total: toNumber(data?.total),
  };

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} />
      <List
        params={params}
        setParams={setParams}
        dataSource={data?.list}
        loading={isLoading}
        pagination={pagination}
      />
    </div>
  );
};

interface SearchPanelProps {
  params: Partial<UsersSearchParams>;
  setParams: (params: Partial<UsersSearchParams>) => void;
}

const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const [temporaryParams, setTemporaryParams] = useState<
    Partial<UsersSearchParams>
  >({});
  const setDates = (dates: any) => {
    setTemporaryParams({
      ...temporaryParams,
      s_time: dates ? `${dayjs(dates[0]).valueOf()}` : "",
      e_time: dates ? `${dayjs(dates[1]).valueOf()}` : "",
    });
  };
  const setNicename = (evt: any) => {
    setTemporaryParams({
      ...temporaryParams,
      nickname: evt.target.value,
    });
  };

  return (
    <Row marginBottom={2} gap={true}>
      <Row>
        <div>注册时间：</div>
        <DatePicker.RangePicker locale={locale} onChange={setDates} />
      </Row>
      <Row>
        <div>微信昵称：</div>
        <Input
          style={{ width: "20rem" }}
          onChange={setNicename}
          placeholder="请输入微信昵称"
          allowClear={true}
        />
      </Row>
      <Button
        type={"primary"}
        icon={<SearchOutlined />}
        onClick={() => setParams({ ...params, ...temporaryParams })}
      >
        查询
      </Button>
    </Row>
  );
};

interface ListProps extends TableProps<User>, SearchPanelProps {}

const List = ({ params, setParams, ...restProps }: ListProps) => {
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
