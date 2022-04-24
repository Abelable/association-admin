import { useState } from "react";
import { Checkbox, Popover, Tooltip } from "antd";
import styled from "@emotion/styled";
import { SettingOutlined } from "@ant-design/icons";

export const ColumnsSelect = () => {
  const plainOptions = [
    "照片",
    "姓名",
    "性别",
    "照片",
    "身份证号",
    "政治面貌",
    "毕业院校",
    "学历及专业",
    "专家库意向",
  ];
  const [checkedList, setCheckedList] = useState(plainOptions);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: any[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
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
      options={plainOptions}
      value={checkedList}
      onChange={onChange}
    />
  );

  return (
    <Popover
      placement="bottomRight"
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
