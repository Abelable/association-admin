import { useState } from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { useIncomes } from "service/financial-data";
import { useIncomesSearchParams } from "./util";

import { DatePicker, Menu } from "antd";
import { Row } from "components/lib";
import { List } from "./components/list";
import { IncomeModal } from "./components/financial-modal";
import { DetailedChart } from "./components/detailed-chart";
import { MonthlyChart } from "./components/monthly-chart";

export const Incomes = () => {
  const [type, setType] = useState("0");

  const [totalIncome, setTotalIncome] = useState("0.00");
  const [totalOutlays, setTotalOutlays] = useState("0.00");

  const [params, setParams] = useIncomesSearchParams();
  const { data, isLoading, error } = useIncomes(params);

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
                setParams({ ...params, select_year: dateString })
              }
              defaultValue={moment(params.select_year || "")}
              disabledDate={(current: any) => current > moment()}
              picker="year"
            />
          </Header>
          <List
            error={error}
            type={type}
            params={params}
            setParams={setParams}
            loading={isLoading}
            setTotalIncome={setTotalIncome}
            financials={data?.list}
          />
          <ChartWrap>
            <DetailedChart financials={data?.list} />
            <MonthlyChart financials={data?.list} />
          </ChartWrap>
        </Main>
      </MainWrap>
      <IncomeModal
        type={type}
        year={params.select_year}
        financials={data?.list}
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
const TotalOutlays = styled.div`
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
