import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { useQueryClient } from "react-query";
import type {
  CustomSignupUsersResult,
  CustomSignupUserForm,
  CustomSignupUsersItem,
  FormItem,
} from "types/custom-signup";
import {
  useCustomSignupUserModal,
  useCustomSignupUsersQueryKey,
} from "../util";
import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import {
  useAddCustomSignupUser,
  useEditCustomSignupUser,
} from "service/custom-signup";
import { ErrorBox } from "components/lib";
import { cleanObject } from "utils";

export const CustomSignupUserModal = () => {
  const [form] = useForm();

  const { customSignupUserModalOpen, editingCustomSignupUserId, close } =
    useCustomSignupUserModal();
  const { editingCustomSignupUserForm, formTypeList } =
    useEditingCustomSignupUserForm(editingCustomSignupUserId);

  console.log("editingCustomSignupUserForm", editingCustomSignupUserForm);

  const useMutationCustomSignupUser = editingCustomSignupUserId
    ? useEditCustomSignupUser
    : useAddCustomSignupUser;
  const { mutateAsync, error, isLoading } = useMutationCustomSignupUser(
    useCustomSignupUsersQueryKey()
  );

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const submit = () => {
    form.validateFields().then(async () => {
      // const {} = form.getFieldsValue();
      // await mutateAsync(customSignupUserItem);
      closeModal();
    });
  };

  useEffect(() => {
    if (editingCustomSignupUserForm) {
      console.log("editingCustomSignupUserForm", editingCustomSignupUserForm);
      setTimeout(() => {
        form.setFieldsValue(editingCustomSignupUserForm);
      }, 2000);
    }
  }, [form, editingCustomSignupUserForm]);

  return (
    <Drawer
      title={editingCustomSignupUserId ? "编辑报名列表" : "新增报名列表"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={customSignupUserModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={isLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Row gutter={16}>
          {formTypeList.map((item, index) => {
            let formElem;
            switch (item.type) {
              case 1:
                formElem = (
                  <Col span={12} key={index}>
                    <Form.Item
                      name={`${index}`}
                      label={item.name}
                      rules={[
                        {
                          required: item.required,
                          message: `请输入${item.name}`,
                        },
                      ]}
                    >
                      <Input placeholder={`请输入${item.name}`} />
                    </Form.Item>
                  </Col>
                );
                break;

              case 2:
                formElem = (
                  <Col span={24} key={index}>
                    <Form.Item
                      name={`${index}`}
                      label={item.name}
                      rules={[
                        {
                          required: item.required,
                          message: `请输入${item.name}`,
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder={`请输入${item.name}`}
                      />
                    </Form.Item>
                  </Col>
                );
                break;

              case 3:
                formElem = (
                  <Col span={12} key={index}>
                    <Form.Item
                      name={`${index}`}
                      label={item.name}
                      rules={[
                        {
                          required: item.required,
                          message: `请输入${item.name}`,
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        placeholder={`请输入${item.name}`}
                      />
                    </Form.Item>
                  </Col>
                );
                break;

              case 4:
                formElem = (
                  <Col span={12} key={index}>
                    <Form.Item
                      name={`${index}`}
                      label={item.name}
                      rules={[
                        {
                          required: item.required,
                          message: `请输入${item.name}`,
                        },
                      ]}
                    >
                      <Select placeholder={`请输入${item.name}`} showArrow>
                        {item.options?.map((_item) => (
                          <Select.Option key={_item}>{_item}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                );
                break;

              case 5:
                formElem = (
                  <Col span={12} key={index}>
                    <Form.Item
                      name={`${index}`}
                      label={item.name}
                      rules={[
                        {
                          required: item.required,
                          message: `请输入${item.name}`,
                        },
                      ]}
                    >
                      <Select
                        placeholder={`请输入${item.name}`}
                        mode="tags"
                        showArrow
                      >
                        {item.options?.map((_item) => (
                          <Select.Option key={_item}>{_item}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                );
                break;

              case 6:
                formElem = (
                  <Col span={24} key={index}>
                    <Form.Item
                      name={`${index}`}
                      label={item.name}
                      rules={[
                        {
                          required: item.required,
                          message: `请上传${item.name}`,
                        },
                      ]}
                    >
                      <OssUpload maxCount={1} />
                    </Form.Item>
                  </Col>
                );
                break;
            }
            return formElem;
          })}
        </Row>
      </Form>
    </Drawer>
  );
};

const useEditingCustomSignupUserForm = (editingCustomSignupUserId: string) => {
  const queryClient = useQueryClient();
  const customSignupUsersResult: CustomSignupUsersResult | undefined =
    queryClient.getQueryData(useCustomSignupUsersQueryKey());
  const currentCustomSignupUser = customSignupUsersResult
    ? customSignupUsersResult.list.find(
        (item) => item.id === editingCustomSignupUserId
      )
    : undefined;
  // console.log("editingCustomSignupUserId", editingCustomSignupUserId)
  // console.log("currentCustomSignupUser", currentCustomSignupUser)

  const formList = currentCustomSignupUser
    ? currentCustomSignupUser?.apply_content_json
    : [];
  console.log("formList", formList);
  const list: string[][] = [];
  formList.forEach(
    (item: { title: string; name: string; value: string }, index: number) => {
      list.push([`${index}`, item.value]);
    }
  );
  const originForm = Object.fromEntries(list);

  const editingCustomSignupUserForm: CustomSignupUserForm | undefined =
    originForm ? originForm : undefined;

  const formTypeList: FormItem[] = currentCustomSignupUser
    ? JSON.parse(currentCustomSignupUser.customEvent.enter_from_json)
    : [];
  console.log("formTypeList", formTypeList);

  console.log("originForm", originForm);
  return { editingCustomSignupUserForm, formTypeList };
};
