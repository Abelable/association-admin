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
import { useLegalModal, useLegalsQueryKey } from "../util";
import { LegalCategory, LegalItem, LegalsSearchParams } from "types/legal";
import { useDeleteLegal } from "service/legal";

interface ListProps extends TableProps<LegalItem> {
  categoryList: LegalCategory[];
  error: Error | unknown;
  params: Partial<LegalsSearchParams>;
  setParams: (params: Partial<LegalsSearchParams>) => void;
}

export const List = ({
  categoryList,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useLegalModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      page_size: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <h3>政策列表</h3>
        <Button onClick={open} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1900 }}
        columns={[
          {
            title: "政策id",
            dataIndex: "id",
            fixed: "left",
            width: "8rem",
          },
          {
            title: "标题",
            dataIndex: "title",
            width: "30rem",
          },
          {
            title: "图片",
            render: (value, legal) => (
              <img style={{ width: "8.8rem" }} src={legal.image} alt="" />
            ),
            width: "14rem",
          },
          {
            title: "排序",
            dataIndex: "sort",
            width: "8rem",
          },
          {
            title: "分类标签",
            render: (value, legal) => (
              <span>
                {
                  categoryList.find((item) => item.id === legal.category_id)
                    ?.name
                }
              </span>
            ),
            width: "20rem",
          },
          {
            title: "发布机构",
            dataIndex: "effective_from",
            width: "30rem",
          },
          {
            title: "发布日期",
            render: (value, legal) =>
              legal.promulgation_time ? (
                <span>
                  {dayjs(Number(legal.promulgation_time) * 1000).format(
                    "YYYY-MM-DD"
                  )}
                </span>
              ) : (
                <></>
              ),
            width: "12rem",
            sorter: (a, b) =>
              Number(a.promulgation_time) - Number(b.promulgation_time),
          },
          {
            title: "创建时间",
            render: (value, legal) => (
              <span>
                {dayjs(Number(legal.created_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
            width: "12rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: "修改时间",
            render: (value, legal) => (
              <span>
                {dayjs(Number(legal.updated_at) * 1000).format(
                  "YYYY-MM-DD HH:mm"
                )}
              </span>
            ),
            width: "12rem",
            sorter: (a, b) => Number(a.updated_at) - Number(b.updated_at),
          },
          {
            title: "操作",
            render(value, legal) {
              return <More legal={legal} />;
            },
            width: "8rem",
            fixed: "right",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ legal }: { legal: LegalItem }) => {
  const { mutate: deleteLegal } = useDeleteLegal(useLegalsQueryKey());

  const { startEdit } = useLegalModal();

  const confirmDeleteLegal = (legal: LegalItem) => {
    Modal.confirm({
      title: "确定删除该文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteLegal(legal),
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => startEdit(legal.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item onClick={() => confirmDeleteLegal(legal)} key={"delete"}>
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
