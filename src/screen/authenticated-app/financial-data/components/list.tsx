import styled from "@emotion/styled";
import { Button, Table, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { useFinancialModal } from "../util";
import type {
  FinancialItem,
  FinancialsSearchParams,
} from "types/financial-data";

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
        ]}
        {...restProps}
        pagination={false}
      />
    </Container>
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
