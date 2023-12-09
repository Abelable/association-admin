import { useQueryClient } from "react-query";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import {
  useAddApplication,
  useEditApplication,
  useGetNumberApplication,
} from "service/application";
import { useApplicationModal, useApplicationsQueryKey } from "../util";

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
  Cascader,
  DatePicker,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { Map } from "components/map";
import { useState, useEffect } from "react";
import options from "utils/region-options";

import {
  ApplicationsResult,
  LevelOption,
  ApplicationForm,
  ApplicationsItem,
  EvaluationOption,
  Region,
} from "types/application";

interface CategoryOption {
  text: string;
  value: number;
  subOptions?: CategoryOption[];
}

export const ApplicationModal = ({
  categoryOptions,
  levelOptions,
  evaluationOptions,
}: {
  categoryOptions: CategoryOption[];
  levelOptions: LevelOption[];
  evaluationOptions: EvaluationOption[];
}) => {
  const [form] = useForm();

  const [lng, setLng] = useState<undefined | number>();
  const [lat, setLat] = useState<undefined | number>();

  const { applicationModalOpen, editingApplicationId, close } =
    useApplicationModal();
  const editingApplicationForm =
    useEditingApplicationForm(editingApplicationId);

  const useMutationApplication = editingApplicationId
    ? useEditApplication
    : useAddApplication;
  const { mutateAsync, error, isLoading } = useMutationApplication(
    useApplicationsQueryKey()
  );
  const { mutate: getCode, data } = useGetNumberApplication();
  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    if (lng && lat) {
      form.setFieldsValue({
        longitude: `${lng}`,
        latitude: `${lat}`,
      });
    }
    if (data) {
      form.setFieldsValue({
        number: ("00000" + (data as { number: string }).number).slice(-3),
      });
    }
  }, [form, lat, lng, data]);

  const submit = () => {
    form.validateFields().then(async () => {
      const {
        number,
        company_name,
        short_name,
        website_url,
        ICP,
        company_type,
        staff_count,
        gang_count,
        revenue,
        trade_amount,
        contacter_name,
        contacter_job_title,
        contacter_mobile,
        license,
        member_level,
        logo,
        region,
        registration_time,
        ...rest
      } = form.getFieldsValue();

      const province = options.find((item: Region) => item.value === region[0]);
      const city = province?.children.find(
        (item: Region) => item.value === region[1]
      );
      const area = city?.children.find(
        (item: Region) => item.value === region[2]
      );
      const address = JSON.stringify({
        province: province?.label,
        city: city?.label,
        area: area?.label,
        region,
      });

      const licenseList: any[] = [];
      license && license.forEach((item: any) => licenseList.push(item.url));

      const applyContent = [
        { title: "企业入会编号", name: "number", value: number },
        { title: "企业名称", name: "company_name", value: company_name },
        { title: "企业简称", name: "short_name", value: short_name },
        { title: "网站（app）名称", name: "website_url", value: website_url },
        { title: "信用代码", name: "ICP", value: ICP },
        { title: "企业类型", name: "company_type", value: company_type.join() },
        { title: "上年度GMV", name: "trade_amount", value: trade_amount },
        { title: "上年度营收", name: "revenue", value: revenue },
        { title: "员工人数", name: "staff_count", value: staff_count },
        { title: "党员人数", name: "gang_count", value: gang_count },
        {
          title: "协会联系人姓名",
          name: "contacter_name",
          value: contacter_name,
        },
        {
          title: "协会联系人职务",
          name: "contacter_job_title",
          value: contacter_job_title,
        },
        {
          title: "协会联系人手机号",
          name: "contacter_mobile",
          value: contacter_mobile,
        },
        {
          title: "企业营业执照或副本",
          name: "license",
          value: licenseList.join(),
        },
        { title: "等级名称", name: "member_level", value: member_level || "" },
      ];

      const applicationItem: Partial<ApplicationsItem> = {
        id: editingApplicationId || undefined,
        level_id: `${member_level}`,
        apply_content_json: JSON.stringify(applyContent),
        logo: logo && logo.length ? logo[0].url : "",
        registration_time: `${moment(registration_time).unix()}`,
        address,
        number,
        ...rest,
      };
      await mutateAsync(applicationItem);
      closeModal();
    });
  };

  useDeepCompareEffect(() => {
    form.setFieldsValue(editingApplicationForm);
  }, [form, editingApplicationForm]);

  return (
    <Drawer
      title={editingApplicationId ? "编辑会员管理" : "新增会员管理"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      visible={applicationModalOpen}
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
          <Col span={24}>
            <div style={{ textAlign: "right" }}>
              <Form.Item
                name="number"
                style={{
                  marginBottom: "0",
                  display: "inline-block",
                  textAlign: "left",
                }}
                rules={[
                  { required: true, message: "请输入企业入会编号" },
                  {
                    pattern: /^\d{3}$/,
                    message: "请输入正确的入会编号(001-999)",
                  },
                ]}
              >
                <Input
                  placeholder="请输入企业入会编号"
                  maxLength={3}
                  style={{ width: "200px" }}
                />
              </Form.Item>
              <Button type="link" onClick={() => getCode()}>
                顺位
              </Button>
            </div>
          </Col>
        </Row>
        <Divider orientation="left">企业信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="logo"
              label="企业logo"
              tooltip="图片大小不能超过10MB"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload maxCount={1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="license"
              label="企业营业执照或副本"
              tooltip="图片大小不能超过10MB"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="company_type"
              label="企业类型"
              rules={[{ required: true, message: "请选择企业类型" }]}
            >
              <Select placeholder="请选择企业类型" showArrow>
                {categoryOptions.map((item) => (
                  <Select.Option key={item.value}>{item.text}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.status !== currentValues.status
            }
          >
            {({ getFieldValue }) =>
              categoryOptions.find(
                (item) => item.value === Number(getFieldValue("company_type"))
              )?.subOptions ? (
                <Col span={12}>
                  <Form.Item
                    name="company_sub_type"
                    label="企业二级类型（可多选）"
                    rules={[{ required: true, message: "请选择企业二级类型" }]}
                  >
                    <Select
                      placeholder="请选择企业二级类型"
                      mode="tags"
                      showArrow
                    >
                      {categoryOptions
                        .find(
                          (item) =>
                            item.value === Number(getFieldValue("company_type"))
                        )
                        ?.subOptions?.map((item) => (
                          <Select.Option key={item.value}>
                            {item.text}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              ) : (
                <></>
              )
            }
          </Form.Item>
        </Row>
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
              name="short_name"
              label="企业简称"
              rules={[{ required: true, message: "请输入企业简称" }]}
            >
              <Input placeholder="请输入企业简称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="region"
              label="企业所在地区"
              rules={[{ required: true, message: "请选择企业所在地区" }]}
            >
              <Cascader options={options} placeholder="请选择企业所在地区" />
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
              label="信用代码"
              rules={[{ required: true, message: "请输入信用代码" }]}
            >
              <Input placeholder="请输入信用代码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="trade_amount"
              label="上年度GMV（亿元）"
              rules={[{ required: true, message: "请输入上年度GMV" }]}
            >
              <Input placeholder="请输入上年度GMV" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="revenue"
              label="上年度营收（亿元）"
              rules={[{ required: true, message: "请输入上年度营收" }]}
            >
              <Input placeholder="请输入上年度营收" />
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
            <Form.Item name="member_level" label="企业等级名称">
              <Select placeholder="请选择企业等级名称">
                {levelOptions.map(({ id, level, name }) => (
                  <Select.Option key={id} value={level}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="registration_time"
              label="企业报名时间"
              rules={[{ required: true, message: "请选择报名时间" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                showTime
                placeholder="请选择企业报名时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="evaluation" label="企业评价">
              <Select placeholder="请选择企业评价">
                {evaluationOptions.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="introduction" label="企业简介">
              <Input.TextArea
                rows={4}
                maxLength={100}
                placeholder="100字内，主营业务、市场分布、所获荣誉等"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="企业所在经纬度" required>
              <Input.Group>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="longitude"
                      rules={[{ required: true, message: "请输入经度" }]}
                    >
                      <Input placeholder="请输入经度" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="latitude"
                      rules={[{ required: true, message: "请输入纬度" }]}
                    >
                      <Input placeholder="请输入纬度" />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
        <Map
          company={editingApplicationForm?.company_name}
          lng={lng}
          lat={lat}
          setLng={setLng}
          setLat={setLat}
        />
        <Divider orientation="left">联系人信息</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contacter_name"
              label="姓名"
              rules={[{ required: true, message: "请输入联系人姓名" }]}
            >
              <Input placeholder="请输入联系人姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contacter_job_title"
              label="职务"
              rules={[{ required: true, message: "请输入联系人职务" }]}
            >
              <Input placeholder="请输入联系人职务" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="contacter_mobile"
              label="工作联系方式"
              rules={[{ required: true, message: "请输入工作联系方式" }]}
            >
              <Input placeholder="请输入工作联系方式" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

const useEditingApplicationForm = (editingApplicationId: string) => {
  const queryClient = useQueryClient();
  const applicationsResult: ApplicationsResult | undefined =
    queryClient.getQueryData(useApplicationsQueryKey());
  const currentApplication = applicationsResult
    ? applicationsResult.list.find((item) => item.id === editingApplicationId)
    : undefined;

  let editingApplicationForm: ApplicationForm | undefined;

  if (currentApplication) {
    const {
      apply_content_json,
      logo,
      level_id,
      registration_time,
      created_at,
      evaluation,
      address,
      ...rest
    } = currentApplication;

    const formList = JSON.parse(apply_content_json);
    const list: string[][] = [];
    formList.forEach((item: { title: string; name: string; value: string }) => {
      list.push([item.name, item.value]);
    });
    const originForm = Object.fromEntries(list);

    const license: { [key in string]: string }[] = [];
    if (originForm.license) {
      const imgs = originForm.license.split(",");
      imgs.forEach((item: string) => {
        license.push({ url: item });
      });
    }

    editingApplicationForm = {
      ...rest,
      ...originForm,
      license,
      company_type: originForm.company_type.split(","),
      logo: logo ? [{ url: logo }] : [],
      member_level: Number(level_id) || undefined,
      registration_time: moment(
        registration_time
          ? Number(registration_time) * 1000
          : Number(created_at) * 1000
      ),
      region: address
        ? JSON.parse(address).region
        : originForm.address
        ? JSON.parse(originForm.address).region
        : undefined,
      evaluation: evaluation || undefined,
    };
  }

  return editingApplicationForm;
};
