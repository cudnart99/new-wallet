import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Modal,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import "../index.css";
// import axios from "axios";
import { WrapperStyled } from "./styled";

export default function Registration() {
  const [visible, setVisible] = useState(false);
  const [taiKhoan, setTaiKhoan] = useState([]);
  const [khachHang, setKhachHang] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(`https://61fe8846a58a4e00173c98aa.mockapi.io/taiKhoan`)
  //       .then((res) => {
  //         setTaiKhoan(res.data);
  //       })
  //       .catch((error) => console.log(error));

  //     axios
  //       .get(`https://61fe8846a58a4e00173c98aa.mockapi.io/khachHang`)
  //       .then((res) => {
  //         setKhachHang(res.data);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  const { TextArea } = Input;
  const onFinish = (values) => {
    // values.firstVaxDate = values.firstVaxDate.format("L");
    // values.secondVaxDate = values.secondVaxDate.format("L");
    // console.log("Success:", values);
    setVisible(true);
    // axios
    //   .post(`https://61fe8846a58a4e00173c98aa.mockapi.io/khachHang`, {
    //     hoTen: values.hoTen,
    //     ngaySinh: values.ngaySinh,
    //     gioiTinh: values.gioiTinh,
    //     diaChi: values.diaChi,
    //     tuoi: values.tuoi,
    //     sdt: values.sdt,
    //     mail: values.mail,
    //     cmnd: values.cmnd,
    //     bhyt: values.bhyt,
    //     danToc: values.danToc,
    //     ngheNghiep: values.ngheNghiep,
    //     donViCongTac: values.donViCongTac,
    //     maKhachHang: Object.keys(khachHang).length + 1,
    //     maTaiKhoan: Object.keys(taiKhoan).length + 1,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios
    //   .post(`https://61fe8846a58a4e00173c98aa.mockapi.io/taiKhoan`, {
    //     tenDangNhap: values.tenDangNhap,
    //     matKhau: values.matKhau,
    //     vaiTro: "customer",
    //     maTaiKhoan: Object.keys(taiKhoan).length + 1,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    Modal.error({
      title: "Đăng kí thất bại",
    });
  };
  return (
    <WrapperStyled>
      <h1 className="title">Welcome to ivirse wallet</h1>
      <div className="res">
        <div className="res-title">Đăng kí</div>
        <Form
          name="basic"
          style={{ padding: 30 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tạo mật khẩu"
            name="matKhau"
            style={{ width: "300px" }}
            rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="xacNhanMatKhau"
            style={{ width: "300px" }}
            rules={[{ required: true, message: "Hãy xác nhận mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 5 }}>
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Thông báo"
        style={{ top: 100 }}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={400}
        footer={[
          <Button
            key="ok"
            href="http://localhost:3000/"
            type="primary"
            onClick={() => setVisible(false)}
          >
            OK
          </Button>,
        ]}
      >
        <p>Đăng kí thành công</p>
      </Modal>
    </WrapperStyled>
  );
}
