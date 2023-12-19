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

interface QuarterOptions {
  year: number;
  quarter: number;
}

const categoryOptions = [
  {
    text: "计算机应用类平台",
    value: 1,
    subOptions: [
      { text: "SAAS系统", value: 11 },
      { text: "创新技术", value: 12 },
      { text: "大数据", value: 13 },
      { text: "工业互联网", value: 14 },
      { text: "技术服务", value: 15 },
      { text: "开发工具", value: 16 },
      { text: "行业综合服务", value: 17 },
      { text: "云计算", value: 18 },
      { text: "综合类", value: 19 },
    ],
  },
  {
    text: "网络销售类平台",
    value: 2,
    subOptions: [
      { text: "MCN机构", value: 21 },
      { text: "跨境", value: 22 },
      { text: "农业", value: 23 },
      { text: "商品交易", value: 24 },
      { text: "专业商品", value: 25 },
      { text: "综合类", value: 26 },
    ],
  },
  {
    text: "生活服务类平台",
    value: 3,
    subOptions: [
      { text: "交通出行", value: 31 },
      { text: "教育培训", value: 32 },
      { text: "配送服务", value: 33 },
      { text: "人才服务", value: 34 },
      { text: "生活服务", value: 35 },
      { text: "市场服务", value: 36 },
      { text: "文化旅游", value: 37 },
      { text: "医疗健康", value: 38 },
      { text: "运输物流", value: 39 },
    ],
  },
  {
    text: "社交娱乐类平台",
    value: 4,
    subOptions: [
      { text: "社交", value: 41 },
      { text: "视频直播", value: 42 },
      { text: "综合类", value: 43 },
    ],
  },
  { text: "金融服务类平台", value: 5 },
  { text: "信息资讯类平台", value: 6 },
  { text: "其他类", value: 7 },
];

let quarterOptions: QuarterOptions[] = [];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
if ([1, 2, 3].includes(month)) {
  quarterOptions = [
    { year: year - 1, quarter: 2 },
    { year: year - 1, quarter: 3 },
    { year: year - 1, quarter: 4 },
    { year, quarter: 1 },
  ];
} else if ([4, 5, 6].includes(month)) {
  quarterOptions = [
    { year: year - 1, quarter: 3 },
    { year: year - 1, quarter: 4 },
    { year, quarter: 1 },
    { year, quarter: 2 },
  ];
} else if ([7, 8, 9].includes(month)) {
  quarterOptions = [
    { year: year - 1, quarter: 4 },
    { year, quarter: 1 },
    { year, quarter: 2 },
    { year, quarter: 3 },
  ];
} else if ([10, 11, 12].includes(month)) {
  quarterOptions = [
    { year, quarter: 1 },
    { year, quarter: 2 },
    { year, quarter: 3 },
    { year, quarter: 4 },
  ];
}

export const ApplicationModal = ({
  levelOptions,
  evaluationOptions,
}: {
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
        company_sub_type,
        staff_count,
        gang_count,
        user_count,
        merchant_count,
        revenue,
        tax_amount,
        trade_amount,
        contacter_name,
        contacter_job_title,
        contacter_mobile,
        license,
        member_level,
        logo,
        region,
        registration_time,
        sub_evaluation,
        quarter_valuation_1,
        quarter_valuation_2,
        quarter_valuation_3,
        quarter_valuation_4,
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
        { title: "企业类型", name: "company_type", value: company_type },
        {
          title: "企业二级类型",
          name: "company_sub_type",
          value: company_sub_type.join(),
        },
        { title: "上年度GMV", name: "trade_amount", value: trade_amount },
        { title: "上年度营收", name: "revenue", value: revenue },
        { title: "上年度纳税额", name: "tax_amount", value: tax_amount },
        { title: "员工人数", name: "staff_count", value: staff_count },
        { title: "党员人数", name: "gang_count", value: gang_count },
        { title: "用户数量", name: "user_count", value: user_count },
        { title: "商家数量", name: "merchant_count", value: merchant_count },
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
        {
          title: "企业评价补充信息",
          name: "sub_evaluation",
          value: sub_evaluation,
        },
        {
          title: "季度估值",
          name: "quarter_valuation",
          value: JSON.stringify(
            quarterOptions.map((item, index) => ({
              ...item,
              value: [
                quarter_valuation_1,
                quarter_valuation_2,
                quarter_valuation_3,
                quarter_valuation_4,
              ][index],
            }))
          ),
        },
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
        <Divider orientation="left">企业管理</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Input.Group compact>
              <Form.Item
                name="number"
                label="企业入会编号"
                rules={[
                  {
                    pattern: /^\d{3}$/,
                    message: "请输入正确的入会编号(001-999)",
                  },
                ]}
              >
                <Input
                  style={{ width: "272px" }}
                  placeholder="请输入企业入会编号"
                />
              </Form.Item>
              <Button
                style={{ marginTop: "30px" }}
                type="primary"
                onClick={() => getCode()}
              >
                顺位
              </Button>
            </Input.Group>
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
              name="evaluation"
              label="企业评价"
              rules={[{ required: true, message: "请选择企业评价" }]}
            >
              <Select placeholder="请选择企业评价">
                {evaluationOptions.map(({ name, value }) => (
                  <Select.Option key={value} value={value}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.evaluation !== currentValues.evaluation
              }
            >
              {({ getFieldValue }) => {
                const subOptions = evaluationOptions.find(
                  (item) => item.value === getFieldValue("evaluation")
                )?.subOptions;
                return subOptions ? (
                  <Form.Item name="sub_evaluation" label="补充企业评价">
                    <Select placeholder="请选择补充类型">
                      {evaluationOptions
                        .find(
                          (item) => item.value === getFieldValue("evaluation")
                        )
                        ?.subOptions?.map((item) => (
                          <Select.Option key={item.value}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                ) : (
                  <></>
                );
              }}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.evaluation !== currentValues.evaluation
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue("evaluation") === "1" ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="quarter_valuation_1"
                    label={`${quarterOptions[0].year}年第${quarterOptions[0].quarter}季度估值（亿元）`}
                  >
                    <Input
                      placeholder={`请输入${quarterOptions[0].year}年第${quarterOptions[0].quarter}季度估值`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="quarter_valuation_2"
                    label={`${quarterOptions[1].year}年第${quarterOptions[1].quarter}季度估值（亿元）`}
                  >
                    <Input
                      placeholder={`请输入${quarterOptions[1].year}年第${quarterOptions[1].quarter}季度估值`}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <></>
            );
          }}
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.evaluation !== currentValues.evaluation
          }
        >
          {({ getFieldValue }) => {
            return getFieldValue("evaluation") === "1" ? (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="quarter_valuation_3"
                    label={`${quarterOptions[2].year}年第${quarterOptions[2].quarter}季度估值（亿元）`}
                  >
                    <Input
                      placeholder={`请输入${quarterOptions[2].year}年第${quarterOptions[2].quarter}季度估值`}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="quarter_valuation_4"
                    label={`${quarterOptions[3].year}年第${quarterOptions[3].quarter}季度估值（亿元）`}
                  >
                    <Input
                      placeholder={`请输入${quarterOptions[3].year}年第${quarterOptions[3].quarter}季度估值`}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <></>
            );
          }}
        </Form.Item>
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
              name="website_url"
              label="网站（app）名称"
              rules={[{ required: true, message: "请输入网站(app)名称" }]}
            >
              <Input placeholder="请输入网站(app)名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ICP"
              label="信用代码"
              rules={[{ required: true, message: "请输入信用代码" }]}
            >
              <Input placeholder="请输入信用代码" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="trade_amount"
              label="上年度GMV（亿元）"
              rules={[{ required: true, message: "请输入上年度GMV" }]}
            >
              <Input placeholder="请输入上年度GMV" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="revenue"
              label="上年度营收（亿元）"
              rules={[{ required: true, message: "请输入上年度营收" }]}
            >
              <Input placeholder="请输入上年度营收" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="tax_amount"
              label="上年度纳税额（亿元）"
              rules={[{ required: true, message: "请输入上年度纳税额" }]}
            >
              <Input placeholder="请输入上年度纳税额" />
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
              name="user_count"
              label="用户数量"
              rules={[{ required: true, message: "请输入用户数量" }]}
            >
              <Input placeholder="请输入用户数量" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="merchant_count"
              label="商家数量"
              rules={[{ required: true, message: "请输入商家数量" }]}
            >
              <Input placeholder="请输入商家数量" />
            </Form.Item>
          </Col>
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.company_type !== currentValues.company_type
              }
            >
              {({ getFieldValue }) => {
                const subCategoryOptions = categoryOptions.find(
                  (item) => item.value === Number(getFieldValue("company_type"))
                )?.subOptions;
                return subCategoryOptions ? (
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
                ) : (
                  <></>
                );
              }}
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
            <Form.Item
              name="region"
              label="企业所在地区"
              rules={[{ required: true, message: "请选择企业所在地区" }]}
            >
              <Cascader options={options} placeholder="请选择企业所在地区" />
            </Form.Item>
          </Col>
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

    let quarterValuationFormData = {};
    if (originForm.quarter_valuation) {
      const quarterValuation = JSON.parse(originForm.quarter_valuation);
      quarterValuationFormData = {
        quarter_valuation_1: quarterValuation.find(
          (_item: any) =>
            _item.year === quarterOptions[0].year &&
            _item.quarter === quarterOptions[0].quarter
        ).value,
        quarter_valuation_2: quarterValuation.find(
          (_item: any) =>
            _item.year === quarterOptions[1].year &&
            _item.quarter === quarterOptions[1].quarter
        ).value,
        quarter_valuation_3: quarterValuation.find(
          (_item: any) =>
            _item.year === quarterOptions[2].year &&
            _item.quarter === quarterOptions[2].quarter
        ).value,
        quarter_valuation_4: quarterValuation.find(
          (_item: any) =>
            _item.year === quarterOptions[3].year &&
            _item.quarter === quarterOptions[3].quarter
        ).value,
      };
    }

    const companyType = `${
      categoryOptions.find(
        (item) => item.text === originForm.company_type.split(",")[0]
      )?.value
    }`;
    editingApplicationForm = {
      ...rest,
      ...originForm,
      ...quarterValuationFormData,
      license,
      company_type: companyType || originForm.company_type,
      company_sub_type: originForm.company_sub_type
        ? originForm.company_sub_type.split(",")
        : undefined,
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
