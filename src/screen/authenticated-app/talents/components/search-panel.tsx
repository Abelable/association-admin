import styled from "@emotion/styled";
import { Button, Input, Select } from "antd";
import { Row } from "components/lib";
import {
  TalentsSearchParams,
  ExpertOption,
  CategoryOption,
} from "types/talent";
import { useState } from "react";
export interface SearchPanelProps {
  expertOptions: ExpertOption[];
  categoryOptions: CategoryOption[];
  params: Partial<TalentsSearchParams>;
  setParams: (params: Partial<TalentsSearchParams>) => void;
}

export const SearchPanel = ({
  expertOptions,
  categoryOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    name: "",
    employer: "",
    department: "",
    expert_intent_id: undefined,
  } as Partial<TalentsSearchParams>;

  const [temporaryParams, setTemporaryParams] = useState<
    Partial<TalentsSearchParams>
  >({});

  const setName = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        name: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      name: evt.target.value,
    });
  };

  const setEmployer = (evt: any) => {
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        employer: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      employer: evt.target.value,
    });
  };

  const setDepartment = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        department: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      department: evt.target.value,
    });
  };

  const setExpert = (expert_intent_id: any) =>
    setTemporaryParams({ ...temporaryParams, expert_intent_id });
  const clearExpert = () =>
    setTemporaryParams({ ...temporaryParams, expert_intent_id: undefined });

  const setCategory = (talent_classification: any) =>
    setTemporaryParams({ ...temporaryParams, talent_classification });
  const clearCategory = () =>
    setTemporaryParams({
      ...temporaryParams,
      talent_classification: undefined,
    });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container>
      <Item>
        <div>姓名：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.name}
          onChange={setName}
          placeholder="请输入姓名"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>工作单位：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.employer}
          onChange={setEmployer}
          placeholder="请输入工作单位"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>具体工作部门或所：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.department}
          onChange={setDepartment}
          placeholder="请输入具体工作部门或所"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>专家库意向：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.expert_intent_id}
          placeholder="请选择专家库意向"
          allowClear={true}
          onSelect={setExpert}
          onClear={clearExpert}
        >
          {expertOptions?.map(({ id, title }) => (
            <Select.Option key={id} value={id}>
              {title}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>分类：</div>
        <Select
          style={{ width: "20rem" }}
          value={temporaryParams.talent_classification}
          placeholder="请选择人才分类"
          allowClear={true}
          onSelect={setCategory}
          onClear={clearCategory}
        >
          {categoryOptions?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
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
