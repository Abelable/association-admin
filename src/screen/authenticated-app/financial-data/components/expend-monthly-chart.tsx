import { Card } from "antd";
import EChartsReact from "echarts-for-react";
import { useState, useEffect } from "react";

import type { ExpendItem } from "types/financial-data";

export const ExpendMonthlyChart = ({
  financials,
}: {
  financials: ExpendItem[] | undefined;
}) => {
  const [source, setSource] = useState<number[]>([]);

  useEffect(() => {
    if (financials) {
      const list = [];
      for (let i = 0; i < 12; i++) {
        if (financials[i]) {
          list.push(
            Number(financials[i].member_expend) +
              Number(financials[i].technology_expend) +
              Number(financials[i].entertain_expend) +
              Number(financials[i].meeting_expend) +
              Number(financials[i].travel_expend) +
              Number(financials[i].other_expend)
          );
        } else {
          list.push(0);
        }
      }
      setSource(list);
    }
  }, [financials]);

  return (
    <Card style={{ flex: 1 }} title="月度支出情况">
      <EChartsReact
        style={{
          height: "400px",
        }}
        option={{
          xAxis: {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: source,
              type: "line",
              smooth: true,
            },
          ],
        }}
      />
    </Card>
  );
};
