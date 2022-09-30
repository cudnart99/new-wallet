import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import "antd/dist/antd.css";
// import axios from "axios";
import {transfer} from "../ulis";

export default function ModalImport(props) {
    const [receiver, setReceiver] = useState("");

    return (
        <Modal
            title="Import token ERC20"
            style={{ top: 100 }}
            visible={props.visibleModalImport}
            onOk={props.handleOkModalImport}
            onCancel={props.handleCancelModalImport}
            width={600}
            height={400}
            footer={[
                <Button
                    key="ok"
                    type="primary"
                    onClick={async () => props.handleSubmitModalImport(receiver)}
                >
                    Submit
                </Button>,
            ]}
        >
            <div style={{ display: "flex" }}>
                <div style={{ width: "20%" }}>
                    <div>Địa chỉ token : </div>
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
        </Modal>
    );
}
