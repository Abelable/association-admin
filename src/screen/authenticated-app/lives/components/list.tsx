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
import { SearchPanelProps } from "./search-panel";
import { useLivesQueryKey, useLiveModal } from "../util";
import { useDeleteLive } from "service/live";

import type { Live } from "types/live";

interface ListProps extends TableProps<Live>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useLiveModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>直播列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1500 }}
        columns={[
          {
            title: "直播id",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
          },
          {
            title: "封面",
            dataIndex: "cover",
            render: (value) => (
              <img
                style={{ width: "11.5rem", height: "5rem" }}
                src={value}
                alt=""
              />
            ),
            width: "16rem",
          },
          {
            title: "标题",
            dataIndex: "title",
            width: "26rem",
          },
          {
            title: "平台",
            dataIndex: "title",
            width: "26rem",
          },
          {
            title: "公司",
            dataIndex: "title",
            width: "26rem",
          },
          {
            title: "地址",
            dataIndex: "title",
            width: "26rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            width: "10rem",
          },
          {
            title: "操作",
            render(value, live) {
              return <More id={live.id} />;
            },
            fixed: "right",
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: string }) => {
  const { mutate: deleteLive } = useDeleteLive(useLivesQueryKey());

  const { startEdit } = useLiveModal();

  const confirmDeleteLive = (id: string) => {
    Modal.confirm({
      title: "确定删除该头图吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLive(id),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteLive(id)} key={"delete"}>
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
