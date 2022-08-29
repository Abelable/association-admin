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
import dayjs from "dayjs";
import { useTrendModal, useTrendsQueryKey } from "../util";
import type {
  TrendForm,
  TrendItem,
  TrendsSearchParams,
} from "types/secretary-trends";
import type { SearchPanelProps } from "./search-panel";

import { useDeleteTrend } from "service/secretary-trends";

interface ListProps extends TableProps<TrendItem>, SearchPanelProps {
  error: Error | unknown;
  params: Partial<TrendsSearchParams>;
  setParams: (params: Partial<TrendsSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useTrendModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>秘书处动态列表</h3>
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
            title: "编号",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
          },
          {
            title: "标题",
            dataIndex: "title",
            width: "20rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            width: "10rem",
            sorter: (a, b) => Number(a.sort) - Number(b.sort),
          },
          {
            title: "创建时间",
            render: (value, service) => (
              <span>
                {dayjs(Number(service.created_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
            width: "16rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: "是否展示",
            dataIndex: "is_show",
            width: "8rem",
          },
          {
            title: "操作",
            render(value, service) {
              return <More service={service} />;
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

const More = ({ service }: { service: TrendForm }) => {
  const { mutate: deleteTrend } = useDeleteTrend(useTrendsQueryKey());

  const { startEdit } = useTrendModal();

  const confirmDeleteTrend = (id: string) => {
    Modal.confirm({
      title: "确定删除该智库文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteTrend(service),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(service.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteTrend(service.id)}
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
