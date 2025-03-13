import { useState } from "react";
import { Button, Input } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { OpenInfoListSearchParams } from "types/open-info";

export interface SearchPanelProps {
  params: Partial<OpenInfoListSearchParams>;
  setParams: (params: Partial<OpenInfoListSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    title: "",
  } as Partial<OpenInfoListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<OpenInfoListSearchParams>>(params);

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
