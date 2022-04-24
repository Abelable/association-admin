import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Checkbox, Popover, Tooltip } from "antd";
import styled from "@emotion/styled";
import { SettingOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/lib/table";
import type { TalentListItem } from "types/talent";

export const ColumnsSelect = ({
  defaultColumnTitleList,
  columnTitleList,
  defaultColumns,
  setColumns,
}: {
  defaultColumnTitleList: string[];
  columnTitleList: string[];
  defaultColumns: ColumnsType<TalentListItem>;
  setColumns: Dispatch<SetStateAction<ColumnsType<TalentListItem>>>;
}) => {
  const [checkedList, setCheckedList] = useState(columnTitleList);
  const [indeterminate, setIndeterminate] = useState(
    !!checkedList.length && checkedList.length < defaultColumnTitleList.length
  );
  const [checkAll, setCheckAll] = useState(
    checkedList.length === defaultColumnTitleList.length
  );

  useEffect(
    () => () =>
      window.localStorage.setItem(
        "talentColumnTitleList",
        JSON.stringify(checkedList)
      ),
    [checkedList]
  );

  const onChange = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(
      !!list.length && list.length < defaultColumnTitleList.length
    );
    setCheckAll(list.length === defaultColumnTitleList.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? defaultColumnTitleList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const Title = (
    <Checkbox
      indeterminate={indeterminate}
      onChange={onCheckAllChange}
      checked={checkAll}
    >
      列展示
    </Checkbox>
  );

  const Content = (
    <Checkbox.Group
      style={{ width: "26rem" }}
      options={defaultColumnTitleList}
      value={checkedList}
      onChange={onChange}
    />
  );

  return (
    <Popover
      placement="bottomLeft"
      title={Title}
      content={Content}
      trigger="click"
    >
      <Tooltip title="列设置">
        <Setting />
      </Tooltip>
    </Popover>
  );
};

const Setting = styled(SettingOutlined)`
  margin-right: 0;
  font-size: 1.6rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
