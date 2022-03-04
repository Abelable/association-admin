import "moment/locale/zh-cn";
import locale from "antd/lib/date-picker/locale/zh_CN";
import { useState } from "react";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import { SearchOutlined } from "@ant-design/icons";
import { UsersSearchParams } from "types/user";
import moment from "moment";

export interface SearchPanelProps {
  params: Partial<UsersSearchParams>;
  setParams: (params: Partial<UsersSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const [temporaryParams, setTemporaryParams] =
    useState<Partial<UsersSearchParams>>(params);

  const setDates = (dates: any, formatString: [string, string]) => {
    setTemporaryParams({
      ...temporaryParams,
      s_time: formatString[0],
      e_time: formatString[1],
    });
  };

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

  return (
    <Row marginBottom={2} gap={true}>
      <Row>
        <div>注册时间：</div>
        <DatePicker.RangePicker
          value={
            temporaryParams.s_time
              ? [moment(temporaryParams.s_time), moment(temporaryParams.e_time)]
              : undefined
          }
          locale={locale}
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
      <Button
        type={"primary"}
        icon={<SearchOutlined />}
        onClick={() => setParams({ ...params, ...temporaryParams })}
      >
        查询
      </Button>
    </Row>
  );
};
