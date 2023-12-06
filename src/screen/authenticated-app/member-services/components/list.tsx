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
import { useServiceModal, useServicesQueryKey } from "../util";
import type {
  ServiceForm,
  ServiceItem,
  ServicesSearchParams,
} from "types/member-service";
import type { SearchPanelProps } from "./search-panel";

import { useDeleteService } from "service/member-service";

interface ListProps extends TableProps<ServiceItem>, SearchPanelProps {
  error: Error | unknown;
  params: Partial<ServicesSearchParams>;
  setParams: (params: Partial<ServicesSearchParams>) => void;
}

export const List = ({
  error,
  categoryOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useServiceModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>服务列表</h3>
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
            title: "服务id",
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
            title: "图片",
            render: (value, service) => (
              <img
                style={{ width: "8.8rem", height: "6.2rem" }}
                src={service.image}
                alt=""
              />
            ),
            width: "12rem",
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
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </span>
            ),
            width: "16rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: "关联标签",
            render: (value, service) => (
              <>
                {
                  categoryOptions.find(
                    (item) => item.id === service.category_id
                  )?.name
                }
              </>
            ),
            width: "12rem",
          },
          {
            title: "是否展示",
            dataIndex: "status",
            width: "8rem",
            render: (value, portrait) => <>{value === "1" ? "是" : "否"}</>,
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

const More = ({ service }: { service: ServiceForm }) => {
  const { mutate: deleteService } = useDeleteService(useServicesQueryKey());

  const { startEdit } = useServiceModal();

  const confirmDeleteService = (id: string) => {
    Modal.confirm({
      title: "确定删除该智库文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteService(service),
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
            onClick={() => confirmDeleteService(service.id)}
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
