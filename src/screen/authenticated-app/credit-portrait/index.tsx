import { useState } from "react";
import styled from "@emotion/styled";
import { useEvaluations } from "service/credit-portrait";
import { toNumber } from "utils";
import { usePortraitsSearchParams } from "./util";

import { Menu } from "antd";
import { PortraitModal } from "./components/portrait-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const Portraits = () => {
  const [type, setType] = useState("0");
  const [params, setParams] = usePortraitsSearchParams();
  const { data, isLoading, error } = useEvaluations(params);

  const categoryOptions = [
    { id: "1", name: "培训服务" },
    { id: "2", name: "政企合作" },
    { id: "3", name: "标准制定" },
  ];

  return (
    <Container>
      <TypeMenu>
        <Menu mode="horizontal" selectedKeys={[type]}>
          <Menu.Item key="0">
            <div onClick={() => setType("0")}>企业评价</div>
          </Menu.Item>
          <Menu.Item key="1">
            <div onClick={() => setType("1")}>判决案例</div>
          </Menu.Item>
        </Menu>
      </TypeMenu>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          categoryOptions={categoryOptions}
          error={error}
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
        <PortraitModal categoryOptions={categoryOptions} />
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
