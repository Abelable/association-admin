import { Table, TableProps } from "antd";
import { ErrorBox } from "components/lib";

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
}: ListProps) => {
  return (
    <>
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
          },
          {
            title: `${params.select_year || new Date().getFullYear()}年2月`,
            dataIndex: "2",
            render: (value, item) =>
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 1 ? (
                <></>
              ) : (
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
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
                <>{value}</>
              ),
          },
        ]}
        {...restProps}
        bordered={true}
        pagination={false}
      />
    </>
  );
};
