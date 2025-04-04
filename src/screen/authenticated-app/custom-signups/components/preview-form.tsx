import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { OssUpload } from "components/oss-upload";
import { FormItem } from "types/custom-signup";

export const PreviewForm = ({ formList }: { formList: FormItem[] }) => {
  return (
    <Form layout="vertical">
      <Row gutter={16}>
        {formList.map((item) => {
          let formElem;
          switch (item.type) {
            case 1:
              formElem = (
                <Col span={12}>
                  <Form.Item
                    name={item.id}
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
                <Col span={24}>
                  <Form.Item
                    name={item.id}
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
                <Col span={12}>
                  <Form.Item
                    name={item.id}
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
                <Col span={12}>
                  <Form.Item
                    name={item.id}
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
                <Col span={12}>
                  <Form.Item
                    name={item.id}
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
                <Col span={24}>
                  <Form.Item
                    name={item.id}
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
  );
};
