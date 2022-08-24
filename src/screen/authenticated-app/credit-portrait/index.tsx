import { useState } from "react";
import styled from "@emotion/styled";
import { useEvaluations } from "service/credit-portrait";
import { toNumber } from "utils";
import { usePortraitsSearchParams } from "./util";

import { Menu } from "antd";
import { PortraitModal } from "./components/portrait-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useSentences } from "../../../service/credit-portrait";

export const Portraits = () => {
  const [type, setType] = useState("0");
  const [params, setParams] = usePortraitsSearchParams();

  const usePortraits = type === "0" ? useEvaluations : useSentences;
  const { data, isLoading, error } = usePortraits(params);

  const evaluationOptions = [
    { id: "1", name: "独角兽" },
    { id: "2", name: "上市" },
    { id: "3", name: "荣誉" },
  ];

  const sentenceOptions = [
    { id: "1", name: "处罚" },
    { id: "2", name: "舆情" },
    { id: "3", name: "投诉" },
    { id: "4", name: "违法线索" },
    { id: "5", name: "投诉举报" },
    { id: "6", name: "负面舆情" },
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
          type={type}
          categoryOptions={type === "0" ? evaluationOptions : sentenceOptions}
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
        <PortraitModal
          type={type}
          categoryOptions={type === "0" ? evaluationOptions : sentenceOptions}
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
