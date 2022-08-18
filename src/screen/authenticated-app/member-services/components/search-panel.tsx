import { useState } from "react";
import { Button, Input } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { WisdomsSearchParams } from "types/wisdom";

export interface SearchPanelProps {
  params: Partial<WisdomsSearchParams>;
  setParams: (params: Partial<WisdomsSearchParams>) => void;
}

export const SearchPanel = ({ params, setParams }: SearchPanelProps) => {
  const defaultParams = {
    name: "",
  } as Partial<WisdomsSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<WisdomsSearchParams>>(params);

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

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>人物名称：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.name}
            onChange={setName}
            placeholder="请输入人物名称"
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
