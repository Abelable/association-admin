import { useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { useIncomes } from "service/financial-data";
import { useIncomesSearchParams } from "./util";

import { DatePicker, Menu } from "antd";
import { Row } from "components/lib";
import { IncomeList } from "./components/income-list";
import { IncomeModal } from "./components/income-modal";
import { IncomeDetailedChart } from "./components/income-detailed-chart";
import { IncomeMonthlyChart } from "./components/income-monthly-chart";

export const Financials = () => {
  const [type, setType] = useState("0");

  const [totalIncome, setTotalIncome] = useState("0.00");
  const [totalOutlay, setTotalOutlay] = useState("0.00");

  const [incomeParams, setIncomeParams] = useIncomesSearchParams();
  const { data: incomeData, isLoading, error } = useIncomes(incomeParams);

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
              <h3>收入表</h3>
              <TotalIncome>+¥{totalIncome}</TotalIncome>
            </TitleWrap>
            <DatePicker
              onChange={(date: any, dateString: string) =>
                setIncomeParams({ ...incomeParams, income_year: dateString })
              }
              defaultValue={moment(incomeParams.income_year || "")}
              disabledDate={(current: any) => current > moment()}
              picker="year"
            />
          </Header>
          <IncomeList
            error={error}
            params={incomeParams}
            setParams={setIncomeParams}
            loading={isLoading}
            setTotalIncome={setTotalIncome}
            financials={incomeData?.list}
          />
          <ChartWrap>
            <IncomeDetailedChart financials={incomeData?.list} />
            <IncomeMonthlyChart financials={incomeData?.list} />
          </ChartWrap>
        </Main>
      </MainWrap>
      <IncomeModal
        year={incomeParams.income_year}
        financials={incomeData?.list}
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
const TotalOutlay = styled.div`
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
