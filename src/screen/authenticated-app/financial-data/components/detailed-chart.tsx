import styled from "@emotion/styled";

import { Card } from "antd";
import EChartsReact from "echarts-for-react";
import { FinancialItem } from "types/financial-data";
import { useState, useEffect } from "react";

export const DetailedChart = ({
  financials,
}: {
  financials: FinancialItem[] | undefined;
}) => {
  const [source, setSource] = useState<(string | number)[][]>([]);

  useEffect(() => {
    if (financials) {
      const list = [];
      for (let i = 0; i < 12; i++) {
        if (financials[i]) {
          list.push([
            `${i + 1}月`,
            Number(financials[i].member_income),
            Number(financials[i].project_income),
            Number(financials[i].service_income),
            Number(financials[i].other_income),
          ]);
        } else {
          list.push([`${i + 1}月`, 0, 0, 0, 0]);
        }
      }
      setSource(list);
    }
  }, [financials]);

  return (
    <Wrap style={{ flex: 1 }} title="各收入情况对比">
      <EChartsReact
        style={{
          width: "100%",
          height: "400px",
        }}
        option={{
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ["product", "会费收入", "项目收入", "服务收入", "其他收入"],
              ...source,
            ],
          },
          xAxis: { type: "category" },
          yAxis: {},
          series: [
            { type: "bar" },
            { type: "bar" },
            { type: "bar" },
            { type: "bar" },
          ],
        }}
      />
    </Wrap>
  );
};

const Wrap = styled(Card)`
  margin-right: 2.4rem;
  flex: 1;
`;
