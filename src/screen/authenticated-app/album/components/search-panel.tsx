import { useState } from "react";
import { Button, Input, Select } from "antd";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { AlbumListSearchParams } from "types/album";

export interface SearchPanelProps {
  cityOptions: { id: number; name: string }[];
  params: Partial<AlbumListSearchParams>;
  setParams: (params: Partial<AlbumListSearchParams>) => void;
}

export const SearchPanel = ({
  cityOptions,
  params,
  setParams,
}: SearchPanelProps) => {
  const defaultParams = {
    title: "",
    city_id: undefined,
  } as Partial<AlbumListSearchParams>;

  const [temporaryParams, setTemporaryParams] =
    useState<Partial<AlbumListSearchParams>>(params);

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

  const setCityId = (city_id: number) =>
    setTemporaryParams({ ...temporaryParams, city_id });
  const clearCityId = () =>
    setTemporaryParams({ ...temporaryParams, city_id: undefined });

  const clear = () => {
    setParams({ ...params, ...defaultParams });
    setTemporaryParams({ ...temporaryParams, ...defaultParams });
  };

  return (
    <Container marginBottom={1.6} between={true}>
      <Row gap={true}>
        <Row>
          <div>活动标题：</div>
          <Input
            style={{ width: "20rem" }}
            value={temporaryParams.title}
            onChange={setTitle}
            placeholder="请输入活动标题"
            allowClear={true}
          />
        </Row>
        <Row>
          <div>是否展示：</div>
          <Select
            style={{ width: "20rem" }}
            value={temporaryParams.city_id}
            placeholder="请选择是否展示"
            allowClear={true}
            onSelect={setCityId}
            onClear={clearCityId}
          >
            {cityOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
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
