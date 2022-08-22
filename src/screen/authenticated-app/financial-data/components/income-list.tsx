import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useIncomeModal } from "../util";

import { Table, TableProps } from "antd";
import { ErrorBox } from "components/lib";
import { EditOutlined } from "@ant-design/icons";

import type {
  TableItem,
  IncomesSearchParams,
  IncomeItem,
} from "types/financial-data";

interface ListProps extends TableProps<TableItem> {
  error: Error | unknown;
  params: Partial<IncomesSearchParams>;
  setParams: (params: Partial<IncomesSearchParams>) => void;
  setTotalIncome: (income: string) => void;
  financials: IncomeItem[] | undefined;
}

export const IncomeList = ({
  error,
  params,
  setParams,
  setTotalIncome,
  financials,
  ...restProps
}: ListProps) => {
  const [tableList, setTableList] = useState<TableItem[]>([]);
  const { startEdit } = useIncomeModal();

  useEffect(() => {
    const dataItem = {
      "1": "0.00",
      "2": "0.00",
      "3": "0.00",
      "4": "0.00",
      "5": "0.00",
      "6": "0.00",
      "7": "0.00",
      "8": "0.00",
      "9": "0.00",
      "10": "0.00",
      "11": "0.00",
      "12": "0.00",
    };
    const defaultTableList: TableItem[] = [
      {
        subject: "会费收入",
        ...dataItem,
      },
      {
        subject: "项目收入",
        ...dataItem,
      },
      {
        subject: "服务收入",
        ...dataItem,
      },
      {
        subject: "其他收入",
        ...dataItem,
      },
      {
        subject: "总计收入",
        ...dataItem,
      },
    ];

    if (financials) {
      let income = 0;
      for (let i = 0; i < 12; i++) {
        if (financials[i]) {
          const {
            member_income,
            project_income,
            service_income,
            other_income,
          } = financials[i];
          const totalIncome =
            Number(member_income) +
            Number(project_income) +
            Number(service_income) +
            Number(other_income);
          (defaultTableList[0] as any)[`${i + 1}`] = member_income;
          (defaultTableList[1] as any)[`${i + 1}`] = project_income;
          (defaultTableList[2] as any)[`${i + 1}`] = service_income;
          (defaultTableList[3] as any)[`${i + 1}`] = other_income;
          (defaultTableList[4] as any)[`${i + 1}`] = totalIncome.toFixed(2);
          income += totalIncome;
        }
      }
      setTotalIncome(income.toFixed(2));
      setTableList(defaultTableList);
    }
  }, [financials, setTotalIncome]);

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
            title: (
              <Edit onClick={() => startEdit("0")}>
                <span>{`${params.select_year}年1月`}</span>
                <EditOutlined
                  style={{ marginLeft: ".4rem", color: "#1890ff" }}
                />
              </Edit>
            ),
            dataIndex: "1",
          },
          {
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 1 ? (
                `${params.select_year}年2月`
              ) : (
                <Edit onClick={() => startEdit("1")}>
                  <span>{`${params.select_year}年2月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 2 ? (
                `${params.select_year}年3月`
              ) : (
                <Edit onClick={() => startEdit("2")}>
                  <span>{`${params.select_year}年3月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 3 ? (
                `${params.select_year}年4月`
              ) : (
                <Edit onClick={() => startEdit("3")}>
                  <span>{`${params.select_year}年4月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 4 ? (
                `${params.select_year}年5月`
              ) : (
                <Edit onClick={() => startEdit("4")}>
                  <span>{`${params.select_year}年5月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 5 ? (
                `${params.select_year}年6月`
              ) : (
                <Edit onClick={() => startEdit("5")}>
                  <span>{`${params.select_year}年6月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 6 ? (
                `${params.select_year}年7月`
              ) : (
                <Edit onClick={() => startEdit("6")}>
                  <span>{`${params.select_year}年7月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 7 ? (
                `${params.select_year}年8月`
              ) : (
                <Edit onClick={() => startEdit("7")}>
                  <span>{`${params.select_year}年8月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 8 ? (
                `${params.select_year}年9月`
              ) : (
                <Edit onClick={() => startEdit("8")}>
                  <span>{`${params.select_year}年9月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 9 ? (
                `${params.select_year}年10月`
              ) : (
                <Edit onClick={() => startEdit("9")}>
                  <span>{`${params.select_year}年10月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 10 ? (
                `${params.select_year}年11月`
              ) : (
                <Edit onClick={() => startEdit("10")}>
                  <span>{`${params.select_year}年11月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
            title:
              params.select_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 11 ? (
                `${params.select_year}年12月`
              ) : (
                <Edit onClick={() => startEdit("11")}>
                  <span>{`${params.select_year}年12月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
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
        dataSource={tableList}
        bordered={true}
        pagination={false}
      />
    </>
  );
};

const Edit = styled.div`
  cursor: pointer;
`;
