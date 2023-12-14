import styled from "@emotion/styled";
import { Button, Table, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import { useTatisticModal } from "../util";
import type { Tatistic } from "types/view";

interface ListProps extends TableProps<Tatistic> {
  error: Error | unknown;
}

export const StatisticList = ({ error, ...restProps }: ListProps) => {
  const { startEdit } = useTatisticModal();

  return (
    <Container style={{ width: "50%", marginRight: "2.4rem" }}>
      <Header between={true}>
        <h3>数据统计</h3>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"name"}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "数据",
            dataIndex: "num",
          },
          {
            title: "数据趋势",
            dataIndex: "type",
          },
          {
            title: "数据比例",
            dataIndex: "rate",
            render: (value) => `${value}%`,
          },
          {
            title: "操作",
            render(value, tatistic) {
              return (
                <Button type="link" onClick={() => startEdit(tatistic.id)}>
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
  height: fit-content;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
