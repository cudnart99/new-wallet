import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import "antd/dist/antd.css";
// import axios from "axios";
import {transfer} from "../ulis";

export default function ModalTransfer(props) {
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleSubmit = async () => {
    //     setVisibleModal(false);
    //     await transfer(props.privateTransfer, props.addressTransfer, receiver, amount);
    // };

    const handleCancel = () => {
        setIsModalOpen(false);
      };



    return (
        <Modal
            title="Transfer"
            style={{ top: 100 }}
            visible={props.visibleModal}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
            width={600}
            height={400}
            footer={[
                <Button
                    key="ok"
                    type="primary"
                    onClick={async () => props.handleSubmit(receiver, amount)}
                >
                    Transfer
                </Button>,
            ]}
        >
            <div style={{ display: "flex" }}>
                <div style={{ width: "20%" }}>
                    <div>Địa chỉ nhận : </div>
                </div>
                <div style={{ width: "80%" }}>
                    <Input
                        style={{
                            marginLeft: "20px",
                            width: "350px",
                        }}
                        placeholder="Nhập địa chỉ nhận"
                        onChange={(e) => setReceiver(e.target.value)}
                    />
                </div>
            </div>

            <div style={{ marginTop: "10px", display: "flex" }}>
                <div style={{ width: "20%" }}>
                    <div>Số tiền chuyển : </div>
                </div>
                <div style={{ width: "80%" }}>
                    <Input
                        style={{
                            marginLeft: "20px",
                            width: "350px",
                        }}
                        placeholder="Nhập số token chuyển"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
}
