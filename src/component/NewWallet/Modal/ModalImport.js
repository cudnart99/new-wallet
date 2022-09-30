import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import "antd/dist/antd.css";
// import axios from "axios";
import {
  transfer,
  getSymbolOfTokenImport,
  getBalanceOfTokenImport,
} from "../ulis";

export default function ModalImport({
  visibleModalImport,
  setVisibleModalImport,
  infoTokenImport,
}) {
  const [receiver, setReceiver] = useState("");
  const handleSubmitModalImport = async (addressToken) => {
    var existing = await JSON.parse(
      localStorage.getItem(`${infoTokenImport.address}`)
    );

    if (existing) {
      let sym = await getSymbolOfTokenImport(
        infoTokenImport.private,
        addressToken
      );
      let balance = await getBalanceOfTokenImport(
        infoTokenImport.private,
        infoTokenImport.address,
        addressToken
      );
      let info = {
        address: addressToken,
        nameToken: sym,
        balance: balance.toString(),
      };
      existing.tokenImport = [...existing.tokenImport, info];

      localStorage.setItem(
        `${infoTokenImport.address}`,
        JSON.stringify(existing)
      );

      alert("import success");
    } else {
      let sym = await getSymbolOfTokenImport(
        infoTokenImport.private,
        addressToken
      );
      let balance = await getBalanceOfTokenImport(
        infoTokenImport.private,
        infoTokenImport.address,
        addressToken
      );
      localStorage.setItem(
        `${infoTokenImport.address}`,
        JSON.stringify({
          priKey: infoTokenImport.private,
          tokenImport: [
            {
              address: addressToken,
              nameToken: sym,
              balance: balance.toString(),
            },
          ],
        })
      );
      alert("import success");
    }
    setVisibleModalImport(false);
  };

  const handleCancel = () => {
    setVisibleModalImport(false);
  };

  const handleOk = () => {
    setVisibleModalImport(false);
  };
  return (
    <Modal
      title="Import token ERC20"
      style={{ top: 100 }}
      visible={visibleModalImport}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      width={600}
      height={400}
      footer={[
        <Button
          key="ok"
          type="primary"
          onClick={async () => handleSubmitModalImport(receiver)}
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
