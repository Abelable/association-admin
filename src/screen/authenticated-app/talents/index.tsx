import styled from "@emotion/styled";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { Row } from "components/lib";
import { useExpertOptions, useTalents } from "service/talents";
import { toNumber } from "utils";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { useTalentsSearchParams } from "./util";

export const Talents = () => {
  const [params, setParams] = useTalentsSearchParams();
  const { data, isLoading, error } = useTalents(params);
  const { data: expertOptions } = useExpertOptions();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const exportTalents = (ids: string[]) => {
    window.location.href = `${
      process.env.REACT_APP_API_URL
    }/api/admin/enter-apply/personal-export?ids=${ids.join()}`;
  };

  return (
    <Container drawerVisible={!!selectedRowKeys.length}>
      <Main>
        <SearchPanel
          expertOptions={expertOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          expertOptions={expertOptions || []}
          error={error}
          params={params}
          setParams={setParams}
          setSelectedRowKeys={setSelectedRowKeys}
          exportTalents={exportTalents}
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
            <Button
              onClick={() => exportTalents(selectedRowKeys)}
              type={"primary"}
              style={{ marginRight: 0 }}
            >
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
