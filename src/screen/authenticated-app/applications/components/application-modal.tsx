import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useQueryClient } from "react-query";
import { PlusOutlined } from "@ant-design/icons";
import {
  ApplicationsResult,
  ApplicationForm,
  LevelOption,
} from "types/application";
import { useApplicationModal, useApplicationsQueryKey } from "../util";
import { useMemo } from "react";

export const ApplicationModal = ({
  levelOptions,
}: {
  levelOptions: LevelOption[];
}) => {
  const { applicationModalOpen, editingApplicationId, close } =
    useApplicationModal();
  const editingApplicationForm =
    useEditingApplicationForm(editingApplicationId);
  console.log("editingApplicationForm", editingApplicationForm);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Drawer
      title={editingApplicationId ? "编辑申请列表" : "新增申请列表"}
      size={"large"}
      onClose={close}
      visible={applicationModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={close}>取消</Button>
          <Button onClick={close} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Divider orientation="left">企业信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="company_name"
              label="企业名称"
              rules={[{ required: true, message: "请输入企业名称" }]}
            >
              <Input placeholder="请输入企业名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="website_url"
              label="网站（app）名称"
              rules={[{ required: true, message: "请输入网站(app)名称" }]}
            >
              <Input placeholder="请输入网站(app)名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ICP"
              label="ICP备案号"
              rules={[{ required: true, message: "请输入ICP备案号" }]}
            >
              <Input placeholder="请输入ICP备案号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="company_type"
              label="企业类型（可多选）"
              rules={[{ required: true, message: "请选择企业类型" }]}
            >
              <Select placeholder="请选择企业类型" mode="tags" showArrow>
                {["第三方平台", "自营平台", "非平台"].map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="website_type"
              label="网站电子商务类型（可多选）"
              rules={[{ required: true, message: "请选择网站电子商务类型" }]}
            >
              <Select
                placeholder="请选择网站电子商务类型"
                mode="tags"
                showArrow
              >
                {["B2B", "B2C", "C2C", "G2C", "其他"].map((item) => (
                  <Select.Option key={item}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="staff_count"
              label="员工人数"
              rules={[{ required: true, message: "请输入员工人数" }]}
            >
              <Input placeholder="请输入员工人数" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gang_count"
              label="党员人数"
              rules={[{ required: true, message: "请输入党员人数" }]}
            >
              <Input placeholder="请输入党员人数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_commodity"
              label="交易商品（服务）"
              rules={[{ required: true, message: "请输入交易商品（服务）" }]}
            >
              <Input placeholder="请输入交易商品（服务）" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="member_count" label="注册会员数量（个）">
              <Input placeholder="请输入注册会员数量" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_commodity"
              label="平台网站内经营者数量（个）"
            >
              <Input placeholder="请输入平台网站内经营者数量" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="trade_count"
              label="上年交易笔数（笔）"
              rules={[{ required: true, message: "请输入上年交易笔数" }]}
            >
              <Input placeholder="请输入上年交易笔数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_amount"
              label="上年交易额（元）"
              rules={[{ required: true, message: "请输入上年交易额" }]}
            >
              <Input placeholder="请输入上年交易额" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="member_level" label="企业等级名称">
              <Select placeholder="请选择企业等级名称">
                {levelOptions.map((item) => (
                  <Select.Option key={item.id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="license"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          label="企业营业执照或副本"
          rules={[{ required: true, message: "请上传企业营业执照或副本" }]}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
          >
            {
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>点击上传</div>
              </div>
            }
          </Upload>
        </Form.Item>
        <Divider orientation="left">负责人信息</Divider>
      </Form>
    </Drawer>
  );
};

const useEditingApplicationForm = (editingApplicationId: string) => {
  const queryClient = useQueryClient();
  const applicationsResult =
    (queryClient.getQueryData(
      useApplicationsQueryKey()
    ) as ApplicationsResult) || null;
  const currentApplication = applicationsResult
    ? applicationsResult.list.find((item) => item.id === editingApplicationId)
    : null;
  const formList = currentApplication
    ? JSON.parse(currentApplication?.apply_content_json)
    : [];

  const list: string[][] = [];
  formList.forEach((item: { title: string; name: string; value: string }) => {
    list.push([item.name, item.value]);
  });
  const editingApplicationForm = Object.fromEntries(list);

  return useMemo(() => editingApplicationForm, [editingApplicationForm]);
};
