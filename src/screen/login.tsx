import styled from "@emotion/styled";
import { Button, Form, Input } from "antd";
import { ErrorBox } from "components/lib";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { AuthForm } from "types/authForm";
import { useState } from "react";
import { useAuth } from "context/auth-context";
import { useAsync } from "utils/use-async";

export const LoginScreen = () => {
  const [error, setError] = useState<Error | null>(null);
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (form: AuthForm) => {
    try {
      await run(login(form));
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <Container>
      <Main>
        <Login>
          <Title>欢迎登录～</Title>
          <ErrorBox error={error} />
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
              <Button
                loading={isLoading}
                size="large"
                htmlType="submit"
                type="primary"
                block
              >
                登录
              </Button>
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
  width: 97rem;
  height: 51.6rem;
  border-radius: 2rem;
  background: url("https://img.ubo.vip/mp/association/admin/illus.png")
    left/53.5rem 100% no-repeat;
  overflow: hidden;
`;

const Login = styled.div`
  position: absolute;
  right: 0;
  padding: 9rem 6.5rem 2.5rem;
  width: 43.5rem;
  height: 100%;
  background: #fff;
`;

const Title = styled.h2`
  margin-bottom: 5rem;
  color: #327efe;
  font-size: 3rem;
`;

const Copyright = styled.div`
  position: absolute;
  left: 50%;
  bottom: 2.5rem;
  transform: translateX(-50%);
  color: #999;
  font-size: 1.2rem;
`;
