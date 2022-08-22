import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { Card } from "antd";
import EChartsReact from "echarts-for-react";

import type { ExpendItem } from "types/financial-data";

export const ExpendDetailedChart = ({
  financials,
}: {
  financials: ExpendItem[] | undefined;
}) => {
  const [source, setSource] = useState<(string | number)[][]>([]);

  useEffect(() => {
    if (financials) {
      const list = [];
      for (let i = 0; i < 12; i++) {
        if (financials[i]) {
          list.push([
            `${i + 1}月`,
            Number(financials[i].member_expend),
            Number(financials[i].technology_expend),
            Number(financials[i].entertain_expend),
            Number(financials[i].meeting_expend),
            Number(financials[i].travel_expend),
            Number(financials[i].other_expend),
          ]);
        } else {
          list.push([`${i + 1}月`, 0, 0, 0, 0]);
        }
      }
      setSource(list);
    }
  }, [financials]);

  return (
    <Wrap style={{ flex: 1 }} title="各支出情况对比">
      <EChartsReact
        style={{
          height: "400px",
        }}
        option={{
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              [
                "product",
                "人员工资",
                "技术服务支出",
                "招待费",
                "会议费",
                "差旅费",
                "其他支出",
              ],
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
