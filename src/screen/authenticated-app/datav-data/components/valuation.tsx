import { useState, useEffect } from "react";
import { useForm } from "antd/lib/form/Form";

import { Card, Form, Row, Col, Input } from "antd";
import { useAddValuation, useEditValuation, useValuations } from "service/view";
import type { Valuation as ValuationItem } from "types/view";

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

  const [valuationList, setValuationList] = useState<Partial<ValuationItem>[]>(
    []
  );
  const { data } = useValuations();
  const { mutate: addValuation } = useAddValuation();
  const { mutate: editValuation } = useEditValuation();

  useEffect(() => {
    if (data) {
      const valuationList = quarterOptions.map((item) => {
        const valuation = data?.list.find(
          (item) =>
            item.year === quarterOptions[0].year &&
            item.name === quarterOptions[0].quarter
        );
        return (
          valuation || {
            id: undefined,
            year: item.year,
            name: item.quarter,
            num: undefined,
          }
        );
      });
      setValuationList(valuationList);

      const editingForm = {
        quarter_valuation_1: valuationList[0].num,
        quarter_valuation_2: valuationList[1].num,
        quarter_valuation_3: valuationList[2].num,
        quarter_valuation_4: valuationList[3].num,
      };
      form.setFieldsValue(editingForm);
    }
  }, [form, data]);

  const save = () => {
    const editingForm = form.getFieldsValue();
    if (
      editingForm["quarter_valuation_1"] &&
      editingForm["quarter_valuation_1"] !== valuationList[0].num
    ) {
      if (valuationList[0].id) {
        editValuation({
          ...valuationList[0],
          num: Number(editingForm["quarter_valuation_1"]),
        });
      } else {
        addValuation({
          ...valuationList[0],
          num: Number(editingForm["quarter_valuation_1"]),
        });
      }
    }
    if (
      editingForm["quarter_valuation_2"] &&
      editingForm["quarter_valuation_2"] !== valuationList[1].num
    ) {
      if (valuationList[1].id) {
        editValuation({
          ...valuationList[1],
          num: Number(editingForm["quarter_valuation_2"]),
        });
      } else {
        addValuation({
          ...valuationList[1],
          num: Number(editingForm["quarter_valuation_2"]),
        });
      }
    }
    if (
      editingForm["quarter_valuation_3"] &&
      editingForm["quarter_valuation_3"] !== valuationList[2].num
    ) {
      if (valuationList[2].id) {
        editValuation({
          ...valuationList[2],
          num: Number(editingForm["quarter_valuation_3"]),
        });
      } else {
        addValuation({
          ...valuationList[2],
          num: Number(editingForm["quarter_valuation_3"]),
        });
      }
    }
    if (
      editingForm["quarter_valuation_4"] &&
      editingForm["quarter_valuation_4"] !== valuationList[3].num
    ) {
      if (valuationList[3].id) {
        editValuation({
          ...valuationList[3],
          num: Number(editingForm["quarter_valuation_4"]),
        });
      } else {
        addValuation({
          ...valuationList[3],
          num: Number(editingForm["quarter_valuation_4"]),
        });
      }
    }
  };

  return (
    <Card title="浙江平台企业估值">
      <Form form={form} layout="vertical" onChange={save}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="quarter_valuation_1"
              label={`${quarterOptions[0].year}年第${quarterOptions[0].quarter}季度估值（亿元）`}
            >
              <Input
                placeholder={`请输入${quarterOptions[0].year}年第${quarterOptions[0].quarter}季度估值`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="quarter_valuation_2"
              label={`${quarterOptions[1].year}年第${quarterOptions[1].quarter}季度估值（亿元）`}
            >
              <Input
                placeholder={`请输入${quarterOptions[1].year}年第${quarterOptions[1].quarter}季度估值`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="quarter_valuation_3"
              label={`${quarterOptions[2].year}年第${quarterOptions[2].quarter}季度估值（亿元）`}
            >
              <Input
                placeholder={`请输入${quarterOptions[2].year}年第${quarterOptions[2].quarter}季度估值`}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="quarter_valuation_4"
              label={`${quarterOptions[3].year}年第${quarterOptions[3].quarter}季度估值（亿元）`}
            >
              <Input
                placeholder={`请输入${quarterOptions[3].year}年第${quarterOptions[3].quarter}季度估值`}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
