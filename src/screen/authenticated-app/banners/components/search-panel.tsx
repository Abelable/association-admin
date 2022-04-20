import { useState } from "react";
import { Button, Input, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { BannersSearchParams } from "types/banner";

export interface SearchPanelProps {
  params: Partial<BannersSearchParams>;
  setParams: (params: Partial<BannersSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    is_show: "",
    title: "",
  } as Partial<BannersSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<BannersSearchParams>>(params);

  const setLevel = (is_show: any) =>
    setTemporaryParams({ ...temporaryParams, is_show });
  const clearLevel = () =>
    setTemporaryParams({ ...temporaryParams, is_show: "" });

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

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>是否展示：</div>
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.is_show}
            placeholder="请选择是否展示"
            allowClear={true}
            onSelect={setLevel}
            onClear={clearLevel}
          >
            {[
              { name: "显示", value: "1" },
              { name: "隐藏", value: "0" },
            ].map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
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
