import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Checkbox, Popover, Tooltip } from "antd";
import styled from "@emotion/styled";
import { SettingOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/lib/table";
import type { TalentListItem } from "types/talent";

export const ColumnsSelect = ({
  defaultColumns,
  setColumns,
}: {
  defaultColumns: ColumnsType<TalentListItem>;
  setColumns: Dispatch<SetStateAction<ColumnsType<TalentListItem>>>;
}) => {
  const defaultList = [
    "照片",
    "姓名",
    "性别",
    "身份证号",
    "政治面貌",
    "毕业院校",
    "学历及专业",
    "专家库意向",
    "工作单位",
    "具体工作部门或所",
    "现任职务",
    "参加工作日期",
    "手机号",
    "固话",
    "电子邮箱",
    "传真",
    "微信号",
    "QQ",
    "人才分类",
    "总评分",
    "报名时间",
  ];
  const list = window.localStorage.getItem("talentColumns")
    ? (JSON.parse(
        window.localStorage.getItem("talentColumns") as string
      ) as string[])
    : defaultList;

  const [checkedList, setCheckedList] = useState(list);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(list.length === defaultList.length);

  useEffect(
    () => () =>
      window.localStorage.setItem("talentColumns", JSON.stringify(checkedList)),
    [checkedList]
  );

  const onChange = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < defaultList.length);
    setCheckAll(list.length === defaultList.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? defaultList : []);
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
      options={defaultList}
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
