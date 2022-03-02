import styled from "@emotion/styled";
import { Form, Input } from "antd";
import { LongButton } from "components/lib";
import { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

export const UnauthenticatedApp = () => {
  const [isLoading] = useState(false);
  const handleSubmit = () => {};

  return (
    <Container>
      <Main>
        <Login>
          <Title>欢迎登录～</Title>
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                size="large"
                id="username"
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
                type="text"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                id="password"
                size="large"
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                type="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <LongButton
                loading={isLoading}
                size="large"
                htmlType="submit"
                type="primary"
              >
                登录
              </LongButton>
            </Form.Item>
          </Form>
          <Copyright>Copyright©️2020浙江有播提供支持</Copyright>
        </Login>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  background: url("https://img.ubo.vip/mp/association/admin/bg.png") center/100%
    100% no-repeat;
`;
const Main = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 970px;
  height: 516px;
  border-radius: 20px;
  background: url("https://img.ubo.vip/mp/association/admin/illus.png")
    left/535px 100% no-repeat;
  overflow: hidden;
`;

const Login = styled.div`
  position: absolute;
  right: 0;
  padding: 90px 65px 25px;
  width: 435px;
  height: 100%;
  background: #fff;
`;

const Title = styled.h2`
  margin-bottom: 50px;
  color: #327efe;
  font-size: 30px;
`;

const Copyright = styled.div`
  position: absolute;
  left: 50%;
  bottom: 25px;
  transform: translateX(-50%);
  color: #999;
  font-size: 12px;
`;
