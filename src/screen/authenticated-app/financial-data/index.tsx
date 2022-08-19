import { useState } from "react";
import styled from "@emotion/styled";
import { useFinancials } from "service/financial-data";
import { toNumber } from "utils";
import { useFinancialsSearchParams } from "./util";

import { Menu } from "antd";
import { List } from "./components/list";

export const Financials = () => {
  const [type, setType] = useState("0");
  const [params, setParams] = useFinancialsSearchParams();
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
      <Main>
        <List
          error={error}
          type={type}
          params={params}
          setParams={setParams}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
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
