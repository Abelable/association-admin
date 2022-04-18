import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Avatar,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useWisdomModal, useWisdomsQueryKey } from "../util";
import { WisdomForm, WisdomItem, WisdomsSearchParams } from "types/wisdom";
import { useDeleteWisdom } from "service/wisdom";

interface ListProps extends TableProps<WisdomItem> {
  error: Error | unknown;
  params: Partial<WisdomsSearchParams>;
  setParams: (params: Partial<WisdomsSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useWisdomModal();

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
            render: (value, wisdom, index) =>
              `${
                index + 1 + ((params.page || 1) - 1) * (params.page_size || 10)
              }`,
            width: "8rem",
          },
          {
            title: "人物名称",
            dataIndex: "name",
            width: "20rem",
          },
          {
            title: "头像",
            render: (value, wisdom) => (
              <Avatar src={wisdom.head_img} icon={<UserOutlined />} />
            ),
            width: "16rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            width: "12rem",
          },
          {
            title: "曾获荣誉",
            dataIndex: "honor",
          },
          {
            title: "领域（简介）",
            dataIndex: "field",
          },
          {
            title: "修改时间",
            render: (value, wisdom) => (
              <span>
                {dayjs(Number(wisdom.updated_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
            width: "18rem",
          },
          {
            title: "操作",
            render(value, wisdom) {
              return <More wisdom={wisdom} />;
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

const More = ({ wisdom }: { wisdom: WisdomForm }) => {
  const { mutate: deleteWisdom } = useDeleteWisdom(useWisdomsQueryKey());

  const { startEdit } = useWisdomModal();

  const confirmDeleteWisdom = (id: string) => {
    Modal.confirm({
      title: "确定删除该智库文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteWisdom(wisdom),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(wisdom.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteWisdom(wisdom.id)}
            key={"delete"}
          >
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
