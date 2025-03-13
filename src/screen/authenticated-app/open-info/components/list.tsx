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
import { useOpenInfoModal, useOpenInfoListQueryKey } from "../util";
import {
  OpenInfo,
  OpenInfoItem,
  OpenInfoListSearchParams,
} from "types/open-info";
import { useDeleteOpenInfo } from "service/open-info";

interface ListProps extends TableProps<OpenInfoItem> {
  error: Error | unknown;
  params: Partial<OpenInfoListSearchParams>;
  setParams: (params: Partial<OpenInfoListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useOpenInfoModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>公开信息列表</h3>
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
            title: "封面",
            render: (value, openInfo) => (
              <img style={{ width: "8.8rem" }} src={openInfo.cover} alt="" />
            ),
            width: "14rem",
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
            title: "修改时间",
            render: (value, openInfo) => (
              <span>
                {dayjs(Number(openInfo.updated_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
            width: "16rem",
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

const More = ({ openInfo }: { openInfo: OpenInfo }) => {
  const { mutate: deleteOpenInfo } = useDeleteOpenInfo(
    useOpenInfoListQueryKey()
  );

  const { startEdit } = useOpenInfoModal();

  const confirmDeleteOpenInfo = (id: string) => {
    Modal.confirm({
      title: "确定删除该公开信息吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteOpenInfo(openInfo),
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
            onClick={() => confirmDeleteOpenInfo(openInfo.id)}
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
