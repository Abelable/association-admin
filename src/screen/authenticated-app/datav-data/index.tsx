import styled from "@emotion/styled";

import { ValuationList } from "./components/valuation-list";
import { useValuations } from "service/view";
import { useEffect, useState } from "react";
import { Valuation } from "types/view";
import { ValuationModal } from "./components/valuation-modal";

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
      <ValuationList
        error={valuationError}
        loading={valuationLoading}
        dataSource={valuationList}
      />
      <ValuationModal valuations={valuationList} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
