import { useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { useExpends, useIncomes } from "service/financial-data";
import { useFinancialsSearchParams } from "./util";

import { DatePicker, Menu } from "antd";
import { Row } from "components/lib";
import { IncomeList } from "./components/income-list";
import { IncomeModal } from "./components/income-modal";
import { IncomeDetailedChart } from "./components/income-detailed-chart";
import { IncomeMonthlyChart } from "./components/income-monthly-chart";
import { ExpendList } from "./components/expend-list";
import { ExpendModal } from "./components/expend-modal";
import { ExpendDetailedChart } from "./components/expend-detailed-chart";
import { ExpendMonthlyChart } from "./components/expend-monthly-chart";
import { ExpendItem, IncomeItem } from "types/financial-data";

export const Financials = () => {
  const [type, setType] = useState("0");
  const [totalIncome, setTotalIncome] = useState("0.00");
  const [totalExpend, setTotalExpend] = useState("0.00");
  const [params, setParams] = useFinancialsSearchParams();

  const useFinancials = type === "0" ? useIncomes : useExpends;
  const { data, isLoading, error } = useFinancials(params);

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
      <MainWrap>
        <Main style={{ overflow: "scroll" }}>
          <Header between={true}>
            <TitleWrap>
              <h3>{type === "0" ? "收入表" : "支出表"}</h3>
              {type === "0" ? (
                <TotalIncome>+¥{totalIncome}</TotalIncome>
              ) : (
                <TotalExpend>-¥{totalExpend}</TotalExpend>
              )}
            </TitleWrap>
            <DatePicker
              onChange={(date: any, dateString: string) =>
                setParams({
                  ...params,
                  select_year: dateString,
                })
              }
              defaultValue={moment(params.select_year || "")}
              disabledDate={(current: any) => current > moment()}
              picker="year"
            />
          </Header>
          {type === "0" ? (
            <IncomeList
              error={error}
              params={params}
              setParams={setParams}
              loading={isLoading}
              setTotalIncome={setTotalIncome}
              financials={data?.list as IncomeItem[]}
            />
          ) : (
            <ExpendList
              error={error}
              params={params}
              setParams={setParams}
              loading={isLoading}
              setTotalExpend={setTotalExpend}
              financials={data?.list as ExpendItem[]}
            />
          )}

          <ChartWrap>
            {type === "0" ? (
              <>
                <IncomeDetailedChart financials={data?.list as IncomeItem[]} />
                <IncomeMonthlyChart financials={data?.list as IncomeItem[]} />
              </>
            ) : (
              <>
                <ExpendDetailedChart financials={data?.list as ExpendItem[]} />
                <ExpendMonthlyChart financials={data?.list as ExpendItem[]} />
              </>
            )}
          </ChartWrap>
        </Main>
      </MainWrap>
      <IncomeModal
        year={params.select_year}
        financials={data?.list as IncomeItem[]}
      />
      <ExpendModal
        year={params.select_year}
        financials={data?.list as ExpendItem[]}
      />
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

const MainWrap = styled.div`
  padding: 2.4rem;
  height: calc(100% - 4.6rem);
  overflow: scroll;
`;

const Main = styled.div`
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
const TotalIncome = styled.div`
  margin-left: 2rem;
  color: red;
  font-size: 1.4rem;
  font-weight: bold;
`;
const TotalExpend = styled.div`
  margin-left: 2rem;
  color: green;
  font-size: 1.4rem;
  font-weight: bold;
`;

const ChartWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
`;
