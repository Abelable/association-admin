import styled from "@emotion/styled";
import { useFinancialModal } from "../util";

import { Table, TableProps } from "antd";
import { ErrorBox } from "components/lib";
import { EditOutlined } from "@ant-design/icons";

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
  const { startEdit } = useFinancialModal();

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
        bordered={true}
        pagination={false}
      />
    </>
  );
};

const Edit = styled.div`
  cursor: pointer;
`;
