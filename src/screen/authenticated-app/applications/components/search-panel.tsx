import styled from "@emotion/styled";
import { Button, DatePicker, Input, Select } from "antd";
import { Row } from "components/lib";
import { ApplicationsSearchParams, LevelOption } from "types/application";
import { useState } from "react";
export interface SearchPanelProps {
  levelOptions: LevelOption[];
  params: Partial<ApplicationsSearchParams>;
  setParams: (params: Partial<ApplicationsSearchParams>) => void;
}

export const SearchPanel = ({
  levelOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const [temporaryParams, setTemporaryParams] = useState<
    Partial<ApplicationsSearchParams>
  >({});

  const setLevel = (member_level: any) =>
    setTemporaryParams({ ...temporaryParams, member_level });
  const clearLevel = () =>
    setTemporaryParams({ ...temporaryParams, member_level: 0 });

  return (
    <Container>
      <Item>
        <div>报名时间：</div>
        <DatePicker.RangePicker />
      </Item>
      <Item>
        <div>姓名：</div>
        <Input style={{ width: "20rem" }} placeholder="请输入姓名" />
      </Item>
      <Item>
        <div>手机号：</div>
        <Input style={{ width: "20rem" }} placeholder="请输入手机号" />
      </Item>
      <Item>
        <div>邮箱：</div>
        <Input style={{ width: "20rem" }} placeholder="请输入邮箱" />
      </Item>
      <Item>
        <div>等级名称：</div>
        <Select
          style={{ width: "20rem" }}
          placeholder="请选择等级名称"
          allowClear={true}
          onSelect={setLevel}
          onClear={clearLevel}
        >
          {levelOptions?.map((option) => (
            <Select.Option key={option.id} value={option.level}>
              {option.name}
            </Select.Option>
          ))}
        </Select>
      </Item>
      <Item>
        <div>状态：</div>
        <Select
          style={{ width: "20rem" }}
          placeholder="请选择状态"
          allowClear={true}
        ></Select>
      </Item>
      <ButtonWrap gap={true}>
        <Button>重置</Button>
        <Button type={"primary"} style={{ marginRight: 0 }}>
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
