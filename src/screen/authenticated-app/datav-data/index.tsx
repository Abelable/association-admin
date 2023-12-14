import styled from "@emotion/styled";

import { useStocks, useTatistics, useValuations } from "service/view";
import { useEffect, useState } from "react";

import { ValuationList } from "./components/valuation-list";
import { ValuationModal } from "./components/valuation-modal";
import { StatisticList } from "./components/statistic-list";
import { StatisticModal } from "./components/statistic-modal";
import { StockList } from "./components/stock-list";
import { StockModal } from "./components/stock-modal";

import type { Valuation } from "types/view";

interface QuarterOptions {
  year: string;
  name: string;
}

let quarterOptions: QuarterOptions[] = [];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
if ([1, 2, 3].includes(month)) {
  quarterOptions = [
    { year: `${year - 1}`, name: "2" },
    { year: `${year - 1}`, name: "3" },
    { year: `${year - 1}`, name: "4" },
    { year: `${year}`, name: "1" },
  ];
} else if ([4, 5, 6].includes(month)) {
  quarterOptions = [
    { year: `${year - 1}`, name: "3" },
    { year: `${year - 1}`, name: "4" },
    { year: `${year}`, name: "1" },
    { year: `${year}`, name: "1" },
  ];
} else if ([7, 8, 9].includes(month)) {
  quarterOptions = [
    { year: `${year - 1}`, name: "4" },
    { year: `${year}`, name: "1" },
    { year: `${year}`, name: "2" },
    { year: `${year}`, name: "3" },
  ];
} else if ([10, 11, 12].includes(month)) {
  quarterOptions = [
    { year: `${year}`, name: "1" },
    { year: `${year}`, name: "2" },
    { year: `${year}`, name: "3" },
    { year: `${year}`, name: "4" },
  ];
}

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

  const [valuationList, setValuationList] = useState<Valuation[]>([]);

  useEffect(() => {
    if (valuation) {
      const valuationList = quarterOptions.map((item) => {
        const valuationItem = valuation?.list.find(
          (_item) => _item.year === item.year && _item.name === item.name
        );
        return (
          valuationItem || {
            ...item,
            id: "",
            num: "",
          }
        );
      });
      setValuationList(valuationList);
    }
  }, [valuation]);

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
          dataSource={valuationList}
        />
        <StockList
          error={stockError}
          loading={stockLoading}
          dataSource={stock?.list || []}
        />
      </div>

      <StatisticModal />
      <ValuationModal valuations={valuationList} />
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
