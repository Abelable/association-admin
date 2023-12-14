import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";

import { Card, Form, Row, Col, Input } from "antd";

interface QuarterOptions {
  year: number;
  quarter: number;
}

let quarterOptions: QuarterOptions[] = [];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
if ([1, 2, 3].includes(month)) {
  quarterOptions = [
    { year: year - 1, quarter: 2 },
    { year: year - 1, quarter: 3 },
    { year: year - 1, quarter: 4 },
    { year, quarter: 1 },
  ];
} else if ([4, 5, 6].includes(month)) {
  quarterOptions = [
    { year: year - 1, quarter: 3 },
    { year: year - 1, quarter: 4 },
    { year, quarter: 1 },
    { year, quarter: 2 },
  ];
} else if ([7, 8, 9].includes(month)) {
  quarterOptions = [
    { year: year - 1, quarter: 4 },
    { year, quarter: 1 },
    { year, quarter: 2 },
    { year, quarter: 3 },
  ];
} else if ([10, 11, 12].includes(month)) {
  quarterOptions = [
    { year, quarter: 1 },
    { year, quarter: 2 },
    { year, quarter: 3 },
    { year, quarter: 4 },
  ];
}

export const Valuation = () => {
  const [form] = useForm();

  return (
    <Card title="企业季度估值">
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="quarter_valuation_1"
              label={`${quarterOptions[0].year}年第${quarterOptions[0].quarter}季度估值（亿元）`}
            >
              <Input
                placeholder={`请输入${quarterOptions[0].year}年第${quarterOptions[0].quarter}季度估值`}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quarter_valuation_2"
              label={`${quarterOptions[1].year}年第${quarterOptions[1].quarter}季度估值（亿元）`}
            >
              <Input
                placeholder={`请输入${quarterOptions[1].year}年第${quarterOptions[1].quarter}季度估值`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
