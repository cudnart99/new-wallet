import React, { useState, useEffect } from "react";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { WrapperStyled } from "./styled";
import { Input, Button, Modal, Space, Table, Tag, AutoComplete } from "antd";
import { ethers, Wallet } from "ethers";
import ModalTransfer from "./Modal/ModalTransfer";
import ModalImport from "./Modal/ModalImport";
import ImportWallet from "./ImportWallet";
import CreateNewAccount from "./CreateNewAccount";
import CreateNewWallet from "./CreateNewWallet";

export default function NewWallet() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalImport, setVisibleModalImport] = useState(false);
  const [visibleAccount, setVisibleAccount] = useState(false);
  const [data, setData] = useState([]);
  const [infoTokenImport, setInfoTokenImport] = useState({});
  const [privateTransfer, setPrivateTransfer] = useState("");
  const [addressTransfer, setAddressTransfer] = useState("");
  const [HDNode, setHDNode] = useState({});

  const handleTransferToken = (data) => {
    console.log(data, "data");
  };

  const handleImportToken = () => {
    setInfoTokenImport(data);
    setVisibleModalImport(true);
  };

  const handleTransfer = (data) => {
    setVisibleModal(true);
    setPrivateTransfer(data.private);
    setAddressTransfer(data.address);
  };

  return (
    <WrapperStyled>
      <h1 className="title">Welcome to ivirse wallet</h1>
      <CreateNewWallet />
      <ImportWallet
        setData={setData}
        setVisibleAccount={setVisibleAccount}
        setHDNode={setHDNode}
        HDNode={HDNode}
      />
      <CreateNewAccount
        visibleAccount={visibleAccount}
        data={data}
        setData={setData}
        handleTransfer={handleTransfer}
        handleImportToken={handleImportToken}
        handleTransferToken={handleTransferToken}
        HDNode={HDNode}
      />

      <ModalTransfer
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        privateTransfer={privateTransfer}
        addressTransfer={addressTransfer}
      />
      <ModalImport
        data={data}
        visibleModalImport={visibleModalImport}
        setVisibleModalImport={setVisibleModalImport}
        infoTokenImport={infoTokenImport}
      />
    </WrapperStyled>
  );
}
