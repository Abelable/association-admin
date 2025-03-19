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
import { useIndustryModal, useIndustryListQueryKey } from "../util";
import {
  Industry,
  IndustryItem,
  IndustryListSearchParams,
} from "types/industry";
import { useDeleteIndustry } from "service/industry";

interface ListProps extends TableProps<IndustryItem> {
  cityOptions: { id: number; name: string }[];
  error: Error | unknown;
  params: Partial<IndustryListSearchParams>;
  setParams: (params: Partial<IndustryListSearchParams>) => void;
}

export const List = ({
  cityOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useIndustryModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>浙江产业带列表</h3>
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
            title: "id",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
          },
          {
            title: "地区",
            dataIndex: "city_id",
            render: (value) => (
              <>{cityOptions.find((item) => item.id === +value)?.name}</>
            ),
            width: "20rem",
          },
          {
            title: "核心产业带",
            dataIndex: "main",
            width: "20rem",
          },
          {
            title: "核心TOP行业",
            dataIndex: "top",
            width: "20rem",
          },
          {
            title: "创建时间",
            dataIndex: "created_at",
            render: (value) => (
              <span>
                {dayjs(Number(value) * 1000).format("YYYY-MM-DD HH:mm")}
              </span>
            ),
            width: "12rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: "修改时间",
            dataIndex: "updated_at",
            render: (value) => (
              <span>
                {dayjs(Number(value) * 1000).format("YYYY-MM-DD HH:mm")}
              </span>
            ),
            width: "12rem",
            sorter: (a, b) => Number(a.updated_at) - Number(b.updated_at),
          },
          {
            title: "操作",
            render(value, openInfo) {
              return <More openInfo={openInfo} />;
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

const More = ({ openInfo }: { openInfo: Industry }) => {
  const { mutate: deleteIndustry } = useDeleteIndustry(
    useIndustryListQueryKey()
  );

  const { startEdit } = useIndustryModal();

  const confirmDeleteIndustry = (id: string) => {
    Modal.confirm({
      title: "确定删除该浙江产业带吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteIndustry(openInfo),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(openInfo.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteIndustry(openInfo.id)}
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
