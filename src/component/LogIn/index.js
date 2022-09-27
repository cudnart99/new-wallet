import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { WrapperStyled } from "./styled";
import "antd/dist/antd.css";
// import axios from "axios";

export default function LogIn() {
  const [state, _setState] = useState([]);
  const Registration = () => {
    window.location.href = "http://localhost:3000/registration";
  };

  //   useEffect(() => {
  //     axios
  //       .get(`https://61fe8846a58a4e00173c98aa.mockapi.io/taiKhoan`)
  //       .then((res) => {
  //         _setState(res.data);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  const onFinish = (values) => {
    window.location.href = "http://localhost:3000/account";
    // console.log("Success:", values);
    // let check = 0;
    // for (let i = 0; i < Object.keys(state).length; i++) {
    //   if (
    //     state[i].tenDangNhap == values.tenDangNhap &&
    //     state[i].matKhau == values.matKhau
    //   ) {
    //     check = 1;
    //     // console.log("hello",state[i].vaiTro);
    //     if (state[i].vaiTro == "admin") {
    //       window.location.href = "http://localhost:3000/nav/admin/home";
    //     }
    //     else if (state[i].vaiTro == "staff") {
    //       window.location.href = `http://localhost:3000/nav/staff/home?id=${state[i].maTaiKhoan}`;
    //     }
    //     else if (state[i].vaiTro == "customer") {
    //       window.location.href = `http://localhost:3000/nav/customer/home?id=${state[i].maTaiKhoan}`;
    //     }
    //   }
    // }
    // if (check === 0) {
    //   Modal.error({
    //     title: "Sai tài khoản hoặc mật khẩu",
    //   });
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    Modal.error({
      title: "Sai tài khoản hoặc mật khẩu",
    });
  };
  return (
    <WrapperStyled>
      <h1 className="title">Welcome to ivirse wallet</h1>
      <div className="login">
        <div className="login-title">Đăng nhập</div>
        <Form
          name="basic"
          style={{ padding: 30 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* <Form.Item
            label="Tài khoản"
            name="tenDangNhap"
            style={{ width: "300px" }}
            rules={[{ required: true, message: "Hãy nhập tài khoản" }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            style={{ width: "300px" }}
            rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginLeft: "40px" }}>
          <a onClick={Registration}>
            Bạn chưa có tài khoản ? Nhấp vào đây để đăng kí
          </a>
        </div>
      </div>
    </WrapperStyled>
  );
}
