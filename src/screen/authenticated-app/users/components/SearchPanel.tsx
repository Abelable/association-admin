import "moment/locale/zh-cn";
import locale from "antd/lib/date-picker/locale/zh_CN";
import { useState } from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Input } from "antd";
import { Row } from "components/lib";
import { SearchOutlined } from "@ant-design/icons";
import { UsersSearchParams } from "types/user";

export interface SearchPanelProps {
  params: Partial<UsersSearchParams>;
  setParams: (params: Partial<UsersSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const [temporaryParams, setTemporaryParams] = useState<
    Partial<UsersSearchParams>
  >({});
  const setDates = (dates: any) => {
    setTemporaryParams({
      ...temporaryParams,
      s_time: dates ? `${dayjs(dates[0]).valueOf()}` : "",
      e_time: dates ? `${dayjs(dates[1]).valueOf()}` : "",
    });
  };
  const setNicename = (evt: any) => {
    setTemporaryParams({
      ...temporaryParams,
      nickname: evt.target.value,
    });
  };

  return (
    <Row marginBottom={2} gap={true}>
      <Row>
        <div>注册时间：</div>
        <DatePicker.RangePicker locale={locale} onChange={setDates} />
      </Row>
      <Row>
        <div>微信昵称：</div>
        <Input
          style={{ width: "20rem" }}
          onChange={setNicename}
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
