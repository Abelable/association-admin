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
  FormItem,
} from "types/custom-signup";
import {
  useCustomSignupUserModal,
  useCustomSignupUsersQueryKey,
} from "../util";
import { useForm } from "antd/lib/form/Form";
import { OssUpload } from "components/oss-upload";
import {
  useAddCustomSignupUser,
  useEditCustomSignupUser,
} from "service/custom-signup";
import { ErrorBox } from "components/lib";
import { cleanObject } from "utils";
import useDeepCompareEffect from "use-deep-compare-effect";

export const CustomSignupUserModal = () => {
  const [form] = useForm();

  const { customSignupUserModalOpen, editingCustomSignupUserId, close } =
    useCustomSignupUserModal();
  const {
    editingCustomSignupUserForm,
    formTypeList,
    tagsFormIndexList,
    imageFormIndexList,
  } = useEditingCustomSignupUserForm(editingCustomSignupUserId);

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
      const fieldsValue = form.getFieldsValue();
      tagsFormIndexList.forEach(
        (item) => (fieldsValue[item] = fieldsValue[item].join())
      );
      imageFormIndexList.forEach(
        (item) => (fieldsValue[item] = fieldsValue[item][0].url)
      );
      const applyContent: { title: string; name: string; value: string }[] = [];
      formTypeList.forEach((item, index) => {
        switch (item.name) {
          case "姓名":
            applyContent.push({
              title: "姓名",
              name: "name",
              value: fieldsValue[index],
            });
            break;

          case "邮箱":
            applyContent.push({
              title: "邮箱",
              name: "email",
              value: fieldsValue[index],
            });
            break;

          case "手机号":
            applyContent.push({
              title: "手机号",
              name: "mobile",
              value: fieldsValue[index],
            });
            break;

          default:
            applyContent.push({
              title: item.name,
              name: "",
              value: fieldsValue[index],
            });
            break;
        }
      });

      const customSignupUserItem: { id?: string } = cleanObject({
        id: editingCustomSignupUserId || undefined,
        apply_content_json: JSON.stringify(applyContent),
      });

      await mutateAsync(customSignupUserItem);
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    editingCustomSignupUserForm &&
      form.setFieldsValue(editingCustomSignupUserForm);
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
                      rules={
                        item.name.includes("手机")
                          ? [
                              {
                                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                message: "请输入正确的手机号",
                              },
                            ]
                          : item.name.includes("邮箱")
                          ? [
                              {
                                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                message: "请输入正确的邮箱地址",
                              },
                            ]
                          : [
                              {
                                required: item.required,
                                message: `请输入${item.name}`,
                              },
                            ]
                      }
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
                      rules={
                        item.name.includes("手机")
                          ? [
                              {
                                pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                                message: "请输入正确的手机号",
                              },
                            ]
                          : [
                              {
                                required: item.required,
                                message: `请输入${item.name}`,
                              },
                            ]
                      }
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
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
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

  const formTypeList: FormItem[] = currentCustomSignupUser
    ? JSON.parse(currentCustomSignupUser.customEvent.enter_from_json)
    : [];

  const tagsFormIndexList: number[] = [];
  const imageFormIndexList: number[] = [];
  formTypeList.forEach((item, index) => {
    if (item.type === 5) tagsFormIndexList.push(index);
    if (item.type === 6) imageFormIndexList.push(index);
  });

  const formList = currentCustomSignupUser
    ? typeof currentCustomSignupUser?.apply_content_json === "string"
      ? JSON.parse(currentCustomSignupUser?.apply_content_json)
      : currentCustomSignupUser?.apply_content_json
    : [];
  const list: string[][] = [];
  formList.forEach(
    (item: { title: string; name: string; value: string }, index: number) => {
      list.push([`${index}`, item.value]);
    }
  );
  const originForm = Object.fromEntries(list);

  tagsFormIndexList.forEach((item) => {
    originForm[item] = originForm[item].split(",");
  });

  imageFormIndexList.forEach((item) => {
    originForm[item] = [{ url: originForm[item] }];
  });

  const editingCustomSignupUserForm: CustomSignupUserForm | undefined =
    originForm ? originForm : undefined;

  return {
    editingCustomSignupUserForm,
    formTypeList,
    tagsFormIndexList,
    imageFormIndexList,
  };
};
