import styled from "@emotion/styled";
import { Button, Table, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import type { Valuation } from "types/view";
import { useValuationModal } from "../util";

interface ListProps extends TableProps<Valuation> {
  error: Error | unknown;
}

export const ValuationList = ({ error, ...restProps }: ListProps) => {
  const { startEdit } = useValuationModal();

  return (
    <Container>
      <Header between={true}>
        <h3>企业估值</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"name"}
        columns={[
          {
            title: "季度",
            dataIndex: "name",
          },
          {
            title: "估值（亿元）",
            dataIndex: "num",
          },
          {
            title: "操作",
            render(value, valuation) {
              return (
                <Button type="link" onClick={() => startEdit(valuation.name)}>
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
  padding-bottom: 4rem;
  height: fit-content;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
