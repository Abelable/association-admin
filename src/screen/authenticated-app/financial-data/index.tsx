import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useFinancials } from "service/financial-data";
import { useFinancialsSearchParams } from "./util";

import { Menu } from "antd";
import { List } from "./components/list";

import type { TableItem } from "types/financial-data";

export const Financials = () => {
  const [type, setType] = useState("0");
  const [params, setParams] = useFinancialsSearchParams();
  const { data, isLoading, error } = useFinancials(params);
  const [tableList, setTableList] = useState<TableItem[]>([]);

  useEffect(() => {
    const defaultTableList: TableItem[] = [
      {
        subject: "会费收入",
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
      },
      {
        subject: "项目收入",
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
      },
      {
        subject: "服务收入",
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
      },
      {
        subject: "其他收入",
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
      },
      {
        subject: "总计收入",
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
      },
    ];

    if (data?.list) {
      for (let i = 0; i < 12; i++) {
        if (data.list[i]) {
          (defaultTableList[0] as any)[`${i + 1}`] = data.list[i].member_income;
          (defaultTableList[1] as any)[`${i + 1}`] =
            data.list[i].project_income;
          (defaultTableList[2] as any)[`${i + 1}`] =
            data.list[i].service_income;
          (defaultTableList[3] as any)[`${i + 1}`] = data.list[i].other_income;
          (defaultTableList[4] as any)[`${i + 1}`] = data.list[i].total_income;
        }
      }
      setTableList(defaultTableList);
    }
  }, [data?.list]);

  return (
    <Container>
      <TypeMenu>
        <Menu mode="horizontal" selectedKeys={[type]}>
          <Menu.Item key="0">
            <div onClick={() => setType("0")}>收入情况</div>
          </Menu.Item>
          <Menu.Item key="1">
            <div onClick={() => setType("1")}>支出情况</div>
          </Menu.Item>
        </Menu>
      </TypeMenu>
      <Main>
        <List
          error={error}
          type={type}
          params={params}
          setParams={setParams}
          loading={isLoading}
          dataSource={tableList}
        />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const TypeMenu = styled.div`
  background: #fff;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: calc(100% - 4.6rem);
  overflow: scroll;
`;
