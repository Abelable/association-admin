import { Button, Input, Select, Switch, Table, TableProps } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { PlusOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { arrayMoveImmutable } from "array-move";
import { FormItem } from "types/custom-signup";
import { useEffect, useState } from "react";

interface FormBuilderProps extends Omit<TableProps<FormItem>, "dataSource"> {
  formList: FormItem[];
  setFormList: (list: FormItem[]) => void;
}

export const FormBuilder = ({
  formList,
  setFormList,
  ...restProps
}: FormBuilderProps) => {
  const typeOptions = [
    { id: 1, name: "单行文本框" },
    { id: 2, name: "多行文本框" },
    { id: 3, name: "数字输入框" },
    { id: 4, name: "单选按钮框" },
    { id: 5, name: "多选按钮框" },
    { id: 6, name: "日期选择框" },
    { id: 7, name: "图片上传框" },
    { id: 8, name: "富文本框" },
  ];

  // const [tempFormList, setTempFormList] = useState(formList)

  const addItem = () => {
    const defaultFormItem: Omit<FormItem, "id"> = {
      type: undefined,
      required: false,
      name: "",
      tips: "",
      options: undefined,
    };
    const list = [...formList];
    const id = list.sort((a, b) => a.id - b.id)[formList.length - 1].id + 1;
    setFormList([...formList, { id, ...defaultFormItem }]);
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [...formList],
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log("Sorted items: ", newData);
      setFormList([...newData]);
    }
  };

  const DraggableContainer = (props: any) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = formList.findIndex(
      (x: any) => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };

  let timeout: any;
  const editFormList = (pramas: Partial<FormItem>) => {
    const list = formList.map((item: any) =>
      item.id === pramas.id ? { ...item, ...pramas } : item
    );
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setFormList([...list]), 1200);
  };

  return (
    <>
      <Table
        style={{ width: "100%" }}
        rowKey={"id"}
        columns={[
          {
            title: "排序",
            dataIndex: "sort",
            render: () => <DragHandle />,
            width: "6rem",
          },
          {
            title: "选择类型",
            dataIndex: "type",
            render: (value, item) => (
              <Select
                defaultValue={value}
                onChange={(value: number) =>
                  editFormList({ id: item.id, type: value })
                }
                placeholder="请选择类型"
              >
                {typeOptions.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            ),
            width: "16rem",
          },
          {
            title: "选择必填",
            dataIndex: "required",
            render: (value, item) => (
              <Switch
                defaultChecked={value}
                onChange={(value: boolean) =>
                  editFormList({ id: item.id, required: value })
                }
              />
            ),
            width: "10rem",
          },
          {
            title: "填写名称",
            dataIndex: "name",
            render: (value, item) => (
              <Input
                defaultValue={value}
                onChange={(e) =>
                  editFormList({ id: item.id, name: e.target.value })
                }
                placeholder="请输入名称"
              />
            ),
            width: "22rem",
          },
          {
            title: "填写提示文本",
            dataIndex: "tips",
            render: (value, item) => (
              <Input
                defaultValue={value}
                onChange={(e) =>
                  editFormList({ id: item.id, tips: e.target.value })
                }
                placeholder="请输入提示文本"
              />
            ),
            width: "32rem",
          },
          {
            title: "添加选项",
            dataIndex: "options",
            render: (value, item) => (
              <Select
                style={{ width: "100%" }}
                defaultValue={value}
                onChange={(value: string[]) =>
                  editFormList({ id: item.id, options: value })
                }
                mode="tags"
                placeholder="输入后回车添加选项"
              />
            ),
          },
          {
            render: (value, item) => (
              <Delete
                onClick={() =>
                  setFormList([
                    ...formList.filter(
                      (_item: FormItem) => _item.id !== item.id
                    ),
                  ])
                }
              />
            ),
            width: "6rem",
          },
        ]}
        pagination={false}
        dataSource={formList}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
        {...restProps}
      />
      <Button
        style={{ marginTop: "2rem", width: "100%" }}
        icon={<PlusOutlined />}
        onClick={() => addItem()}
      >
        添加表单元素
      </Button>
    </>
  );
};

const SortableBody = SortableContainer((props: any) => <tbody {...props} />);
const SortableItem = SortableElement((props: any) => <tr {...props} />);

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));

const Delete = styled(DeleteOutlined)`
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: red;
  }
`;
