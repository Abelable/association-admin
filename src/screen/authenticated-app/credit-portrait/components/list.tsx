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
import { usePortraitModal, usePortraitsQueryKey } from "../util";
import type {
  CategoryOption,
  PortraitForm,
  PortraitItem,
  PortraitsSearchParams,
} from "types/credit-portrait";
import type { SearchPanelProps } from "./search-panel";

import { useDeleteEvaluation } from "service/credit-portrait";

interface ListProps extends TableProps<PortraitItem>, SearchPanelProps {
  type: string;
  categoryOptions: CategoryOption[];
  error: Error | unknown;
  params: Partial<PortraitsSearchParams>;
  setParams: (params: Partial<PortraitsSearchParams>) => void;
}

export const List = ({
  type,
  error,
  categoryOptions,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = usePortraitModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>企业评价列表</h3>
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
            title: "企业名称",
            dataIndex: "company_name",
            width: "20rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            width: "8rem",
            sorter: (a, b) => Number(a.sort) - Number(b.sort),
          },
          {
            title: "创建时间",
            render: (value, portrait) => (
              <span>
                {dayjs(Number(portrait.created_at) * 1000).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </span>
            ),
            width: "16rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: `${type === "0" ? "企业评价" : "判决情况"}`,
            render: (value, portrait) => (
              <>
                {
                  categoryOptions.find(
                    (item) => item.id === portrait.evaluation
                  )?.name
                }
              </>
            ),
            width: "10rem",
          },
          {
            title: "触发时间",
            render: (value, portrait) => (
              <span>
                {dayjs(Number(portrait.promulgation_time) * 1000).format(
                  "YYYY-MM-DD"
                )}
              </span>
            ),
            width: "10rem",
            sorter: (a, b) =>
              Number(a.promulgation_time) - Number(b.promulgation_time),
          },
          {
            title: "是否展示",
            dataIndex: "status",
            width: "8rem",
            render: (value, portrait) => <>{value === "1" ? "是" : "否"}</>,
          },
          {
            title: "操作",
            render(value, portrait) {
              return <More portrait={portrait} />;
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

const More = ({ portrait }: { portrait: PortraitForm }) => {
  const { mutate: deletePortrait } = useDeleteEvaluation(
    usePortraitsQueryKey()
  );

  const { startEdit } = usePortraitModal();

  const confirmDeletePortrait = (id: string) => {
    Modal.confirm({
      title: "确定删除该智库文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deletePortrait(portrait),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(portrait.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeletePortrait(portrait.id)}
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
