import { useState } from "react";
import moment from "moment";
import styled from "@emotion/styled";

import { Button, DatePicker, Input, Select } from "antd";
import { Row } from "components/lib";

import type {
  ApplicationsSearchParams,
  EvaluationOption,
  LevelOption,
  StatusOption,
} from "types/application";
export interface SearchPanelProps {
  statusOptions: StatusOption[];
  evaluationOptions: EvaluationOption[];
  levelOptions: LevelOption[];
  params: Partial<ApplicationsSearchParams>;
  setParams: (params: Partial<ApplicationsSearchParams>) => void;
}

export const SearchPanel = ({
  statusOptions,
  evaluationOptions,
  levelOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    s_time: "",
    e_time: "",
    company_name: "",
    member_level: undefined,
    evaluation: undefined,
    is_deal: undefined,
  } as Partial<ApplicationsSearchParams>;

  const [temporaryParams, setTemporaryParams] = useState<
    Partial<ApplicationsSearchParams>
  >({});

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      s_time: formatString[0],
      e_time: formatString[1],
    });

  const setCompanyName = (evt: any) => {
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

  const setLevel = (member_level: any) =>
    setTemporaryParams({ ...temporaryParams, member_level });
  const clearLevel = () =>
    setTemporaryParams({ ...temporaryParams, member_level: undefined });

  const setEvaluation = (evaluation: any) =>
    setTemporaryParams({ ...temporaryParams, evaluation });
  const clearEvaluation = () =>
    setTemporaryParams({ ...temporaryParams, evaluation: undefined });

  const setStatus = (is_deal: any) =>
    setTemporaryParams({ ...temporaryParams, is_deal });
  const clearStatus = () =>
    setTemporaryParams({ ...temporaryParams, is_deal: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container>
      <Item>
        <div>报名时间：</div>
        <DatePicker.RangePicker
          value={
            temporaryParams.s_time
              ? [moment(temporaryParams.s_time), moment(temporaryParams.e_time)]
              : undefined
          }
          onChange={setDates}
        />
      </Item>
      <Item>
        <div>企业名称：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.company_name}
          onChange={setCompanyName}
          placeholder="请输入企业名称"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>等级名称：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.member_level}
          placeholder="请选择等级名称"
          allowClear={true}
          onSelect={setLevel}
          onClear={clearLevel}
        >
          {levelOptions?.map(({ id, level, name }) => (
            <Select.Option key={id} value={level}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>状态：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.is_deal}
          placeholder="请选择状态"
          allowClear={true}
          onSelect={setStatus}
          onClear={clearStatus}
        >
          {statusOptions?.map(({ id, value, name }) => (
            <Select.Option key={id} value={value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>企业评价：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.evaluation}
          placeholder="请选择企业评价"
          allowClear={true}
          onSelect={setEvaluation}
          onClear={clearEvaluation}
        >
          {evaluationOptions?.map(({ value, name }) => (
            <Select.Option key={value} value={value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <ButtonWrap gap={true}>
        <Button onClick={clear}>重置</Button>
        <Button
          type={"primary"}
          style={{ marginRight: 0 }}
          onClick={() => setParams({ ...params, ...temporaryParams })}
        >
          查询
        </Button>
      </ButtonWrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
  padding: 2.4rem 16.8rem 0 2.4rem;
  background: #fff;
`;

const Item = styled(Row)`
  margin-right: 2rem;
  padding-bottom: 2.4rem;
`;

const ButtonWrap = styled(Row)`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;
`;
