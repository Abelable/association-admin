import styled from "@emotion/styled";

import { useStocks, useTatistics, useValuations } from "service/view";

import { ValuationList } from "./components/valuation-list";
import { ValuationModal } from "./components/valuation-modal";
import { StatisticList } from "./components/statistic-list";
import { StatisticModal } from "./components/statistic-modal";
import { StockList } from "./components/stock-list";
import { StockModal } from "./components/stock-modal";

export const Datav = () => {
  const {
    data: valuation,
    error: valuationError,
    isLoading: valuationLoading,
  } = useValuations();

  const {
    data: tatistic,
    error: tatisticError,
    isLoading: tatisticLoading,
  } = useTatistics();

  const {
    data: stock,
    error: stockError,
    isLoading: stockLoading,
  } = useStocks();

  return (
    <Container>
      <StatisticList
        error={tatisticError}
        loading={tatisticLoading}
        dataSource={tatistic?.list || []}
      />

      <div style={{ width: "50%" }}>
        <ValuationList
          error={valuationError}
          loading={valuationLoading}
          dataSource={valuation?.list || []}
        />
        <StockList
          error={stockError}
          loading={stockLoading}
          dataSource={stock?.list || []}
        />
      </div>

      <StatisticModal />
      <ValuationModal valuations={valuation?.list || []} />
      <StockModal />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
