import { Col, Row } from "antd";
import CareLibraryIcon from "./../../assets/Login/care-library-icon.png";
import LazyIcon from "./../../assets/Login/lazy-icon-care.png";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import { useSignInPostRequestMutation } from "../../store/Slices/Signin";
import Footer from "../../layout/Footer/Footer";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

//comment for testing
const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  let navigate = useNavigate();

  const [signInPostRequest, { isLoading }] = useSignInPostRequestMutation();

  function renderDashboard(role: string): string {
    if (role === "carer") {
      return "/carer-dashboard";
    } else if (role === "carer_coordinator") {
      return "/coordinator-dashboard";
    } else if (role === "client") {
      return "/client-dashboard";
    } else if (role === "training_instructor") {
      return "/instructor-dashboard";
    } else if (role === "system_admin") {
      return "/super-admin-dashboard";
    } else {
      return "/";
    }
  }

  const onFinish = async (values: any) => {
    const payload = {
      email: values.username,
      password: values.password,
    };

    const {error,data}: any = await signInPostRequest({
      payload,
    });
    const role = data?.data?.user?.roleData?.name

    if (!error) {
      const userData = {
        username: data?.data?.email,
        token: data?.data?.accessToken,
        refreshToken: data?.data?.refreshToken,
        cognitoId: data?.data?.user?.cognitoId,
        id: data?.data?.user?._id,
        role,
      };
      const stringifyData = JSON.stringify(userData);
      localStorage.setItem("careUserData", stringifyData);
      navigate(renderDashboard(role));
    } else {
      setErrorMessage(error?.data?.message)
    }
  };

  const validateEmail = (rule:any, value:any, callback:any) => {
    if (!value) {
      callback();
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        callback();
      } else {
        callback('Invalid format of email');
      }
    }
  };

  return (
    <Row className="care-signin">
      {/* Left Div */}
      <Col xs={0} sm={0} lg={12} xl={14}>
        <div className="left-outer-div">
          <div className="inner-left-div">
            <div>
              <h1 className="heading-1">
                <span className="pink-color">Sign In</span>
                <span> to</span>
              </h1>
              <h3 className="heading-3">Care Library</h3>
            </div>
            {/* <div>
              <p className="p-tag-description-1">If you don't have an account register</p>
              <p className="p-tag-description-2">
                You can
                <span className="pink-color fw-600"> Register</span>
                <span> here!</span>
              </p>
            </div> */}
            <div className="demo-wrap">
              <div className="demo-content">
                <img src={LazyIcon} alt="care-library-icon" />
              </div>
            </div>
          </div>
        </div>
      </Col>
      {/* Right Div for form */}
      <Col xs={24} sm={24} lg={12} xl={10}>
        <div className="right-outer-div">
          <div className="img-div">
            <img src={CareLibraryIcon} alt="care-library-icon" width={199} height={91} />
          </div>
          <div>
            <h2 className="Sign-in-heading">Sign In</h2>
            <Form name="email" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  }, { validator: validateEmail }
                ]}
              >
                <Input placeholder="Username" className="input-style" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                {/* <Input.Password placeholder="Password" /> */}
                <Input.Password
                  placeholder="Password"
                  className="input-style"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
              <p style={{ color: "red" }}>{errorMessage}</p>
              <div style={{ textAlign: "end", margin: "10px 0px 20px 0px" }}>
                <Link to="" className="forgot-password-style">
                  Forgot Password?
                </Link>
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className=" btn-signin fw-600 "
                  block
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <Footer />
            {/* <p className="fs-15-n-gray">
              Resend <span className="pink-color">Log In</span> Details
            </p> */}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
