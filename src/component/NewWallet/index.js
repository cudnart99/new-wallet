import React, { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { WrapperStyled } from "./styled";
import { Input, Button, Modal, Space, Table, Tag, AutoComplete } from "antd";
import { ethers, Wallet } from "ethers";
import { getBalance, transfer } from "./ulis";

export default function NewWallet() {
  const [privateWallet, setPrivateWallet] = useState("");
  const [newPrivateWallet, setNewPrivateWallet] = useState("");
  const [visiblePrivate, setVisiblePrivate] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleAccount, setVisibleAccount] = useState(false);
  const [HDNode, setHDNode] = useState({});
  const [data, setData] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [privateTransfer, setPrivateTransfer] = useState("");
  const [addressTransfer, setAddressTransfer] = useState("");

  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => {
        return <div style={{ wordBreak: "break-word" }}>{text}</div>;
      },
    },
    // {
    //   title: "Public key",
    //   dataIndex: "public",
    //   key: "public",
    //   render: (text) => {
    //     return <div style={{ wordBreak: "break-word" }}>{text}</div>;
    //   },
    // },
    {
      title: "Private key",
      dataIndex: "private",
      key: "private",
      render: (text) => {
        return <div style={{ wordBreak: "break-word" }}>{text}</div>;
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Transfer",
      dataIndex: "transfer",
      key: "transfer",
      render: (value, data) => {
        // console.log(value,"value");
        return (
          <Button type="primary" onClick={() => handleTransfer(data)}>
            Transfer
          </Button>
        );
      },
    },
  ];

  const handleTransfer = (data) => {
    setVisibleModal(true);
    setPrivateTransfer(data.private);
    setAddressTransfer(data.address);
    console.log(data, "data");
  };

  const handleImport = async () => {
    let newHDNode = await ethers.utils.HDNode.fromMnemonic(privateWallet);
    setHDNode(newHDNode);
    const derivedNode = newHDNode.derivePath(`m/44'/60'/0'/0/0`);
    let balanceOf = await getBalance(derivedNode.privateKey);
    setData([{
      address: derivedNode.address,
      // public: "1231231312312313123123123123213213123123213123",
      private: derivedNode.privateKey,
      balance: balanceOf,
    }]);
    setVisibleAccount(true);
  };

  const handleCreate = async () => {
    const newWord = await Wallet.createRandom().mnemonic;
    setNewPrivateWallet(newWord.phrase);
    setVisiblePrivate(true);
  };

  const handleCreateAccount = async () => {
    const derivedNode = HDNode.derivePath(`m/44'/60'/0'/0/${data.length}`);
    let balanceOf = await getBalance(derivedNode.privateKey);
    var newObj = {};
    newObj.address = derivedNode.address;
    // newObj.public = "456789045678904567890456789045678904567890";
    newObj.private = derivedNode.privateKey;
    newObj.balance = balanceOf;
    setData((data) => [...data, newObj]);
  };

  return (
    <WrapperStyled>
      <h1 className="title">Welcome to ivirse wallet</h1>

      <Button
        style={{
          marginLeft: "100px",
          marginTop: "30px",
        }}
        type="primary"
        onClick={() => handleCreate()}
      >
        Tạo ví
      </Button>
      {visiblePrivate && (
        <div
          style={{
            marginLeft: "100px",
            marginTop: "10px",
          }}
        >
          Cụm từ bí mật mới là : {newPrivateWallet}
        </div>
      )}

      <Input.Group compact>
        <Input
          style={{
            marginTop: "30px",
            marginLeft: "100px",
            width: "850px",
          }}
          placeholder="Nhập 12 kí tự bí mật"
          onChange={(e) => setPrivateWallet(e.target.value)}
        />
        <Button
          style={{
            marginTop: "30px",
          }}
          type="primary"
          onClick={() => handleImport()}
        >
          Nhập ví
        </Button>
      </Input.Group>

      {visibleAccount && (
        <>
          <Button
            style={{
              marginTop: "30px",
              marginLeft: "100px",
            }}
            onClick={() => handleCreateAccount()}
          >
            Tạo tài khoản mới
          </Button>
          <Table
            style={{
              marginTop: "10px",
              marginLeft: "100px",
              width: "950px",
            }}
            columns={columns}
            dataSource={data}
          />
        </>
      )}

      <Modal
        title="Transfer"
        style={{ top: 100 }}
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
        width={600}
        height={400}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() =>
              transfer(privateTransfer, addressTransfer, receiver, amount)
            }
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
    </WrapperStyled>
  );
}
