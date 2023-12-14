import { useState } from "react";
import { Card } from "antd";
import styled from "@emotion/styled";

import { Valuation } from "./components/valuation";

export const Datav = () => {
  return (
    <Container>
      <MainWrap>
        <Main style={{ overflow: "scroll" }}>
          <Valuation />
        </Main>
      </MainWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
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
