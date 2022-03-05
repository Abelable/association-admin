import styled from "@emotion/styled";
import { Button, Drawer } from "antd";
import { Row } from "components/lib";
import { useState } from "react";
import { useApplications, useLevelOptions } from "service/application";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useApplicationsSearchParams } from "./util";

export const Applications = () => {
  const statusOptions = [
    { id: 1, name: "未处理", value: "0" },
    { id: 2, name: "已处理", value: "1" },
    { id: 3, name: "已驳回", value: "2" },
  ];

  const [params, setParams] = useApplicationsSearchParams();
  const { data, isLoading, error } = useApplications(params);
  const { data: levelOptions } = useLevelOptions();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <Container drawerVisible={!!selectedRowKeys.length}>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          levelOptions={levelOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          error={error}
          statusOptions={statusOptions}
          levelOptions={levelOptions || []}
          params={params}
          setParams={setParams}
          setSelectedRowKeys={setSelectedRowKeys}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.page_size),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <Drawer
        visible={!!selectedRowKeys.length}
        style={{ position: "absolute" }}
        height={"8rem"}
        placement="bottom"
        mask={false}
        getContainer={false}
        closable={false}
      >
        <Row between={true}>
          <div>
            已选择 <SelectedCount>{selectedRowKeys.length}</SelectedCount> 项
          </div>
          <Row gap={true}>
            <Button>批量处理</Button>
            <Button type={"primary"} style={{ marginRight: 0 }}>
              批量导出
            </Button>
          </Row>
        </Row>
      </Drawer>
    </Container>
  );
};

const Container = styled.div<{ drawerVisible: boolean }>`
  position: relative;
  padding-bottom: ${(props) => (props.drawerVisible ? "8rem" : 0)};
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;

const SelectedCount = styled.span`
  color: #1890ff;
  font-weight: 600;
`;
