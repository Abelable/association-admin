import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useExpendModal } from "../util";

import { Table, TableProps } from "antd";
import { ErrorBox } from "components/lib";
import { EditOutlined } from "@ant-design/icons";

import type {
  ExpendTableItem,
  ExpendsSearchParams,
  ExpendItem,
} from "types/financial-data";

interface ListProps extends TableProps<ExpendTableItem> {
  error: Error | unknown;
  params: Partial<ExpendsSearchParams>;
  setParams: (params: Partial<ExpendsSearchParams>) => void;
  setTotalExpend: (expend: string) => void;
  financials: ExpendItem[] | undefined;
}

export const ExpendList = ({
  error,
  params,
  setParams,
  setTotalExpend,
  financials,
  ...restProps
}: ListProps) => {
  const [tableList, setTableList] = useState<ExpendTableItem[]>([]);
  const { startEdit } = useExpendModal();

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
    const defaultTableList: ExpendTableItem[] = [
      {
        subject: "人员工资",
        ...dataItem,
      },
      {
        subject: "技术服务支出",
        ...dataItem,
      },
      {
        subject: "招待费",
        ...dataItem,
      },
      {
        subject: "会议费",
        ...dataItem,
      },
      {
        subject: "差旅费",
        ...dataItem,
      },
      {
        subject: "其他支出",
        ...dataItem,
      },
      {
        subject: "总支出",
        ...dataItem,
      },
    ];

    if (financials) {
      let expend = 0;
      for (let i = 0; i < 12; i++) {
        if (financials[i]) {
          const {
            member_expend,
            technology_expend,
            entertain_expend,
            meeting_expend,
            travel_expend,
            other_expend,
          } = financials[i];
          const totalExpend =
            Number(member_expend) +
            Number(technology_expend) +
            Number(entertain_expend) +
            Number(meeting_expend) +
            Number(travel_expend) +
            Number(other_expend);
          (defaultTableList[0] as any)[`${i + 1}`] =
            Number(member_expend).toFixed(2);
          (defaultTableList[1] as any)[`${i + 1}`] =
            Number(technology_expend).toFixed(2);
          (defaultTableList[2] as any)[`${i + 1}`] =
            Number(entertain_expend).toFixed(2);
          (defaultTableList[3] as any)[`${i + 1}`] =
            Number(meeting_expend).toFixed(2);
          (defaultTableList[4] as any)[`${i + 1}`] = totalExpend.toFixed(2);
          expend += totalExpend;
        }
      }
      setTotalExpend(expend.toFixed(2));
      setTableList(defaultTableList);
    }
  }, [financials, setTotalExpend]);

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
                <span>{`${params.expend_year}年1月`}</span>
                <EditOutlined
                  style={{ marginLeft: ".4rem", color: "#1890ff" }}
                />
              </Edit>
            ),
            dataIndex: "1",
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 1 ? (
                `${params.expend_year}年2月`
              ) : (
                <Edit onClick={() => startEdit("1")}>
                  <span>{`${params.expend_year}年2月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "2",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 1 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 2 ? (
                `${params.expend_year}年3月`
              ) : (
                <Edit onClick={() => startEdit("2")}>
                  <span>{`${params.expend_year}年3月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "3",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 2 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 3 ? (
                `${params.expend_year}年4月`
              ) : (
                <Edit onClick={() => startEdit("3")}>
                  <span>{`${params.expend_year}年4月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "4",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 3 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 4 ? (
                `${params.expend_year}年5月`
              ) : (
                <Edit onClick={() => startEdit("4")}>
                  <span>{`${params.expend_year}年5月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "5",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 4 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 5 ? (
                `${params.expend_year}年6月`
              ) : (
                <Edit onClick={() => startEdit("5")}>
                  <span>{`${params.expend_year}年6月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "6",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 5 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 6 ? (
                `${params.expend_year}年7月`
              ) : (
                <Edit onClick={() => startEdit("6")}>
                  <span>{`${params.expend_year}年7月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "7",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 6 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 7 ? (
                `${params.expend_year}年8月`
              ) : (
                <Edit onClick={() => startEdit("7")}>
                  <span>{`${params.expend_year}年8月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "8",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 7 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 8 ? (
                `${params.expend_year}年9月`
              ) : (
                <Edit onClick={() => startEdit("8")}>
                  <span>{`${params.expend_year}年9月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "9",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 8 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 9 ? (
                `${params.expend_year}年10月`
              ) : (
                <Edit onClick={() => startEdit("9")}>
                  <span>{`${params.expend_year}年10月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "10",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 9 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 10 ? (
                `${params.expend_year}年11月`
              ) : (
                <Edit onClick={() => startEdit("10")}>
                  <span>{`${params.expend_year}年11月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "11",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 10 ? (
                <></>
              ) : (
                <>{value}</>
              ),
          },
          {
            title:
              params.expend_year === `${new Date().getFullYear()}` &&
              new Date().getMonth() < 11 ? (
                `${params.expend_year}年12月`
              ) : (
                <Edit onClick={() => startEdit("11")}>
                  <span>{`${params.expend_year}年12月`}</span>
                  <EditOutlined
                    style={{ marginLeft: ".4rem", color: "#1890ff" }}
                  />
                </Edit>
              ),
            dataIndex: "12",
            render: (value, item) =>
              params.expend_year === `${new Date().getFullYear()}` &&
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
