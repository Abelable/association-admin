import { useState } from "react";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { PortraitsSearchParams } from "types/credit-portrait";
import moment from "moment";

export interface SearchPanelProps {
  params: Partial<PortraitsSearchParams>;
  setParams: (params: Partial<PortraitsSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    name: "",
    company_name: undefined,
    s_time: undefined,
    e_time: undefined,
    ps_time: undefined,
    pe_time: undefined,
  } as Partial<PortraitsSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<PortraitsSearchParams>>(params);

  const setTitle = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        title: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      title: evt.target.value,
    });
  };

  const setName = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        company_name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      company_name: evt.target.value,
    });
  };

  const setTriggerDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      s_time: formatString[0],
      e_time: formatString[1],
    });

  const setAddDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      ps_time: formatString[0],
      pe_time: formatString[1],
    });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>标题：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.title}
            onChange={setTitle}
            placeholder="请输入标题"
            allowClear={true}
          />
        </Row>
        <Row>
          <div>企业名称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.company_name}
            onChange={setName}
            placeholder="请输入企业名称"
            allowClear={true}
          />
        </Row>
        <Row>
          <div>触发时间：</div>
          <DatePicker.RangePicker
            value={
              temporaryParams.s_time
                ? [
                    moment(temporaryParams.s_time),
                    moment(temporaryParams.e_time),
                  ]
                : undefined
            }
            onChange={setTriggerDates}
          />
        </Row>
        <Row>
          <div>触发时间：</div>
          <DatePicker.RangePicker
            value={
              temporaryParams.ps_time
                ? [
                    moment(temporaryParams.ps_time),
                    moment(temporaryParams.pe_time),
                  ]
                : undefined
            }
            onChange={setAddDates}
          />
        </Row>
      </Row>
      <Row gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          style={{ marginRight: 0 }}
          type={"primary"}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
          查询
        </Button>
      </Row>
    </Container>
  );
};

const Container = styled(Row)`
  padding: 2.4rem;
  background: #fff;
`;
