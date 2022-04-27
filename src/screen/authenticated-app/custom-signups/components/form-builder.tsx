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
    { id: 6, name: "图片上传框" },
  ];

  const addItem = () => {
    const defaultFormItem: Omit<FormItem, "id"> = {
      type: undefined,
      required: false,
      name: "",
      options: undefined,
    };
    const list = [...formList];
    const id = list.sort((a, b) => a.id - b.id)[formList.length - 1].id + 1;
    setFormList([...formList, { id, ...defaultFormItem }]);
  };
  const selectType = (id: number) => (type: number) => {
    const list = formList.map((item: any) =>
      item.id === id ? { ...item, type } : item
    );
    setFormList([...list]);
  };
  const switchRequired = (id: number) => (required: boolean) => {
    const list = formList.map((item: any) =>
      item.id === id ? { ...item, required } : item
    );
    setFormList([...list]);
  };
  const setName = (id: number) => (e: any) => {
    const list = formList.map((item: any) =>
      item.id === id ? { ...item, name: e.target.value } : item
    );
    setFormList([...list]);
  };
  const setOptions = (id: number) => (options: string[]) => {
    const list = formList.map((item: any) =>
      item.id === id ? { ...item, options } : item
    );
    setFormList([...list]);
  };

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = formList.findIndex(
      (x: any) => x.index === restProps["data-row-key"]
    );
    return <SortableItem index={index} {...restProps} />;
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

  return (
    <>
      <Table
        style={{ width: "100%" }}
        rowKey={"id"}
        scroll={{ x: 1000 }}
        columns={[
          {
            title: "排序",
            dataIndex: "sort",
            render: () => <DragHandle />,
            width: "6rem",
            fixed: "left",
          },
          {
            title: "选择类型",
            dataIndex: "type",
            render: (value, item) => (
              <Select
                defaultValue={value}
                onChange={selectType(item.id)}
                placeholder="请选择类型"
              >
                {typeOptions.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            ),
            width: "12rem",
          },
          {
            title: "选择必填",
            dataIndex: "required",
            render: (value, item) => (
              <Switch
                defaultChecked={value}
                onChange={switchRequired(item.id)}
              />
            ),
            width: "8rem",
          },
          {
            title: "填写名称",
            dataIndex: "name",
            render: (value, item) => (
              <Input
                defaultValue={value}
                onChange={setName(item.id)}
                placeholder="请输入名称"
              />
            ),
            width: "18rem",
          },
          {
            title: "添加选项",
            dataIndex: "options",
            render: (value, item) => (
              <Select
                style={{ width: "100%" }}
                defaultValue={value}
                disabled={![4, 5].includes(item.type || 0)}
                onChange={setOptions(item.id)}
                mode="tags"
                placeholder="输入后回车添加选项"
              />
            ),
            width: "30rem",
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
            fixed: "right",
          },
        ]}
        pagination={false}
        dataSource={formList}
        // components={{
        //   body: {
        //     wrapper: DraggableContainer,
        //     row: DraggableBodyRow,
        //   },
        // }}
        {...restProps}
      />
      <Button
        style={{ marginTop: "2rem", width: "100%" }}
        icon={<PlusOutlined />}
        onClick={addItem}
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
