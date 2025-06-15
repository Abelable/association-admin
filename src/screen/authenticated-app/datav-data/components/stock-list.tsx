import styled from "@emotion/styled";
import { Button, Table, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import { useStockModal } from "../util";
import type { Stock } from "types/view";

interface ListProps extends TableProps<Stock> {
  error: Error | unknown;
}

export const StockList = ({ error, ...restProps }: ListProps) => {
  const { startEdit } = useStockModal();

  return (
    <Container>
      <Header between={true}>
        <h3>企业综合大类</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"name"}
        columns={[
          {
            title: "企业综合大类",
            dataIndex: "type",
          },
          {
            title: "省内企业数量",
            dataIndex: "in_province",
          },
          {
            title: "省外企业数量",
            dataIndex: "out_province",
          },
          {
            title: "国际企业数量",
            dataIndex: "international",
          },
          {
            title: "操作",
            render(value, stock) {
              return (
                <Button type="link" onClick={() => startEdit(stock.id)}>
                  编辑
                </Button>
              );
            },
            fixed: "right",
            width: "8rem",
          },
        ]}
        pagination={false}
        {...restProps}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  padding-bottom: 4rem;
  height: fit-content;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
