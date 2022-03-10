import { useState } from "react";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import { UsersSearchParams } from "types/user";
import moment from "moment";
import styled from "@emotion/styled";

export interface SearchPanelProps {
  params: Partial<UsersSearchParams>;
  setParams: (params: Partial<UsersSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    s_time: "",
    e_time: "",
    nickname: "",
  } as Partial<UsersSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<UsersSearchParams>>(params);

  const setDates = (dates: any, formatString: [string, string]) =>
    setTemporaryParams({
      ...temporaryParams,
      s_time: formatString[0],
      e_time: formatString[1],
    });

  const setNickname = (evt: any) => {
    // onInputClear
    if (!evt.target.value && evt.type !== "change") {
      setTemporaryParams({
        ...temporaryParams,
        nickname: "",
      });
      return;
    }

    setTemporaryParams({
      ...temporaryParams,
      nickname: evt.target.value,
    });
  };

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>注册时间：</div>
          <DatePicker.RangePicker
            value={
              temporaryParams.s_time
                ? [
                    moment(temporaryParams.s_time),
                    moment(temporaryParams.e_time),
                  ]
                : undefined
            }
            onChange={setDates}
          />
        </Row>
        <Row>
          <div>微信昵称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.nickname}
            onChange={setNickname}
            placeholder="请输入微信昵称"
            allowClear={true}
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
