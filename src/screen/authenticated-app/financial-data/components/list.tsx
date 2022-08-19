import styled from "@emotion/styled";
import { Button, Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useFinancialModal, useFinancialsQueryKey } from "../util";
import type {
  FinancialForm,
  FinancialItem,
  FinancialsSearchParams,
} from "types/financial-data";
import { useDeleteFinancial } from "service/financial-data";

interface ListProps extends TableProps<FinancialItem> {
  type: string;
  error: Error | unknown;
  params: Partial<FinancialsSearchParams>;
  setParams: (params: Partial<FinancialsSearchParams>) => void;
}

export const List = ({
  type,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useFinancialModal();

  return (
    <Container>
      <Header between={true}>
        <TitleWrap>
          <h3>{type === "0" ? "收入表" : "支出表"}</h3>
          {type === "0" ? (
            <TotalRevenue>+¥1239.99</TotalRevenue>
          ) : (
            <TotalOutlays>-¥1239.99</TotalOutlays>
          )}
        </TitleWrap>
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
        {...restProps}
      />
    </Container>
  );
};

const More = ({ service }: { service: FinancialForm }) => {
  const { mutate: deleteFinancial } = useDeleteFinancial(
    useFinancialsQueryKey()
  );

  const { startEdit } = useFinancialModal();

  const confirmDeleteFinancial = (id: string) => {
    Modal.confirm({
      title: "确定删除该智库文章吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteFinancial(service),
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
            onClick={() => confirmDeleteFinancial(service.id)}
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

const TitleWrap = styled.div`
  display: flex;
  align-items: baseline;
`;
const TotalRevenue = styled.div`
  margin-left: 2rem;
  color: red;
  font-size: 1.4rem;
  font-weight: bold;
`;
const TotalOutlays = styled.div`
  margin-left: 2rem;
  color: green;
  font-size: 1.4rem;
  font-weight: bold;
`;
