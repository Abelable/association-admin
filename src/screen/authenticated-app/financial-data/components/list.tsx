import moment from "moment";
import styled from "@emotion/styled";

import { DatePicker, InputNumber, Table, TableProps } from "antd";
import { ErrorBox, Row } from "components/lib";

import type { TableItem, FinancialsSearchParams } from "types/financial-data";

interface ListProps extends TableProps<TableItem> {
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
}: ListProps) => (
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
      <DatePicker
        defaultValue={moment()}
        disabledDate={(current: any) => current > moment()}
        picker="year"
      />
    </Header>
    <ErrorBox error={error} />
    <Table
      rowKey={"subject"}
      columns={[
        {
          title: "科目",
          dataIndex: "subject",
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年1月`,
          dataIndex: "1",
          render: (value, item) => (
            <InputNumber
              defaultValue={Number(value)}
              step="0.01"
              bordered={false}
            />
          ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年2月`,
          dataIndex: "2",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 1 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年3月`,
          dataIndex: "3",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 2 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年4月`,
          dataIndex: "4",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 3 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年5月`,
          dataIndex: "5",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 4 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年6月`,
          dataIndex: "6",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 5 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年7月`,
          dataIndex: "7",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 6 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年8月`,
          dataIndex: "8",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 7 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年9月`,
          dataIndex: "9",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 8 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年10月`,
          dataIndex: "10",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 9 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年11月`,
          dataIndex: "11",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 10 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
        {
          title: `${params.select_year || new Date().getFullYear()}年12月`,
          dataIndex: "12",
          render: (value, item) =>
            params.select_year === `${new Date().getFullYear()}` &&
            new Date().getMonth() < 11 ? (
              <></>
            ) : (
              <InputNumber
                defaultValue={Number(value)}
                step="0.01"
                bordered={false}
              />
            ),
        },
      ]}
      {...restProps}
      bordered={true}
      pagination={false}
    />
  </Container>
);

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
