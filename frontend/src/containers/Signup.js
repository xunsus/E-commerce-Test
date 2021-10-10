import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, signup } from "../store/actions/auth";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const initialState = {
  UserName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegistrationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setform] = useState(initialState);

  const switchMode = () => {
    setform(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = () => {
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  return (
    <Form
      {...formItemLayout}
      name="register"
      onFinish={handleSubmit}
      initialValues={{
        prefix: "86",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="UserName"
        label="UserName"
        rules={[
          {
            required: true,
            message: "Please input your UserName!",
            whitespace: true,
          },
        ]}
      >
        <Input
          onChange={(e) => setform({ ...form, UserName: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          onChange={(e) => setform({ ...form, password: e.target.value })}
        />
      </Form.Item>
      {isSignup && (
        <React.Fragment>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              onChange={(e) => setform({ ...form, email: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              onChange={(e) =>
                setform({ ...form, confirmPassword: e.target.value })
              }
            />
          </Form.Item>
        </React.Fragment>
      )}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          {isSignup ? "Sign Up" : "Sign In"}
        </Button>
      </Form.Item>

      <Button onClick={switchMode}>
        {isSignup
          ? "Already have an account? Sign in"
          : "Don't have an account? Sign Up"}
      </Button>
    </Form>
  );
}
