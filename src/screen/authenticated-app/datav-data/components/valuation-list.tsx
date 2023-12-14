import styled from "@emotion/styled";
import { Button, Menu, Table, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import type { Valuation } from "types/view";

interface ListProps extends TableProps<Valuation> {
  error: Error | unknown;
}

export const ValuationList = ({ error, ...restProps }: ListProps) => {
  const edit = (id: string) => {};

  return (
    <Container>
      <Header between={true}>
        <h3>浙江平台企业估值</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"name"}
        columns={[
          {
            title: "季度",
            render: (value, valuation) =>
              `${valuation.year}年第${valuation.name}季度`,
          },
          {
            title: "估值（亿元）",
            dataIndex: "num",
          },
          {
            title: "操作",
            render(value, valuation) {
              return (
                <Button type="link" onClick={() => edit(valuation?.id)}>
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
  margin-bottom: 2.4rem;
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
