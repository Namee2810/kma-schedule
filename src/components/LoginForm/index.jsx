import { CloseOutlined, LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, notification } from "antd";
import userAPI from "api/userAPI";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./style.scss";

const layout = {
  labelCol: {
    lg: 7,
    md: 6,
    sm: 6,
  },
  wrapperCol: {
    lg: 12,
    md: 14,
    sm: 14,
  },
};
const rememberLayout = {
  wrapperCol: {
    lg: { offset: 7, span: 12 },
    md: { offset: 6, span: 12 },
    sm: { offset: 6, span: 12 },
    xs: { offset: 8, span: 12 },
  },
};
const buttonLayout = {
  wrapperCol: {
    lg: { offset: 6, span: 12 },
    md: { offset: 6, span: 12 },
    sm: { offset: 7, span: 12 },
    xs: { offset: 0, span: 12 },
  },
}

function LoginForm() {
  const [form] = Form.useForm();
  const [logging, setLogging] = useState(false);
  let history = useHistory();

  const onFinish = async (values) => {
    if (!logging) {
      setLogging(true);
      await userAPI.login({
        username: values.username,
        password: values.password
      })
        .then(res => {
          switch (res.status) {
            case 400: {
              notification.error({
                message: "Mã sinh viên hoặc mật khẩu không chính xác 😢",
              });
              form.resetFields();
              setTimeout(() => {
                setLogging(false);
              }, 500);
              break
            }
            case 200: {
              notification.success({
                message: "Đăng nhập thành công 🎉",
              });
              if (res.token) localStorage.setItem("token", res.token);
              history.push("/dashboard");
              break;
            }
            default: {
              notification.error({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau 😢",
              });
              setTimeout(() => {
                setLogging(false);
              }, 500);
            }
          }
        })
        .catch(err => {
          notification.error({
            message: "Đã xảy ra lỗi, vui lòng thử lại sau 😢 !",
          });
          console.log(err)
          setTimeout(() => {
            setLogging(false);
          }, 500);
        });
    }
  };
  const handleCloseLoginForm = () => {
    document.getElementById("LoginForm").style.transform = "translateY(0)";
  }

  return (
    <div className="LoginForm" id="LoginForm">
      <div className="LoginForm__close" onClick={handleCloseLoginForm}><CloseOutlined /></div>
      <Form className="LoginForm__form"
        form={form}
        labelAlign="right"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        {...layout}
        size="large"
      >
        <Form.Item
          label="Mã sinh viên"
          name="username"
          rules={[{ required: true, message: 'Hãy nhập mã sinh viên!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
        <Form.Item
          {...rememberLayout}
          name="remember" valuePropName="checked"
        >
          <Checkbox>Duy trì đăng nhập</Checkbox>
        </Form.Item>
        <Form.Item
          {...buttonLayout}
        >
          <button type="submit" className="button button__animation" style={{ width: "192px" }}>
            {logging ? <LoadingOutlined style={{ fontSize: "24px" }} /> : "Đăng nhập"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;