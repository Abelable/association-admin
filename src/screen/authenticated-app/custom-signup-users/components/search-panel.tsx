import styled from "@emotion/styled";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import { useState } from "react";
import moment from "moment";
import type { CustomSignupUsersSearchParams } from "types/custom-signup";

export interface SearchPanelProps {
  params: Partial<CustomSignupUsersSearchParams>;
  setParams: (params: Partial<CustomSignupUsersSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    start_time: "",
    end_time: "",
    name: "",
    mobile: "",
  } as Partial<CustomSignupUsersSearchParams>;

  const [temporaryParams, setTemporaryParams] = useState<
    Partial<CustomSignupUsersSearchParams>
  >({});

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      start_time: formatString[0],
      end_time: formatString[1],
    });

  const setName = (evt: any) => {
    // onInputClear
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

  const setMobile = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        mobile: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      mobile: evt.target.value,
    });
  };

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
        <div>手机号：</div>
        <Input
          style={{ width: "20rem" }}
          value={temporaryParams.mobile}
          onChange={setMobile}
          placeholder="请输入手机号"
          allowClear={true}
        />
      </Item>
      <Item>
        <div>报名时间：</div>
        <DatePicker.RangePicker
          value={
            temporaryParams.start_time
              ? [
                  moment(temporaryParams.start_time),
                  moment(temporaryParams.end_time),
                ]
              : undefined
          }
          onChange={setDates}
        />
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
