import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { Wallet } from "ethers";
import { getBalance, transfer } from "../ulis";

export default function CreateNewAccount({
  visibleAccount,
  data,
  setData,
  handleTransfer,
  handleImportToken,
  handleTransferToken,
  HDNode,
}) {
  const [dataToken, setDataToken] = useState([]);
  useEffect(() => {
    var infoData = JSON.parse(localStorage.getItem("data"));
    if (infoData) {
      infoData.listAcc.map(async (value) => {
        let infoToken = await JSON.parse(localStorage.getItem(value));
        let dataItem = [];
        infoToken.tokenImport.map(async (item, index) => {
          dataItem = [
            ...dataItem,
            {
              pubKey: value,
              priKey: infoToken.priKey,
              key: index,
              name: item.nameToken,
              address: item.address,
              balance: item.balance,
            },
          ];
          // console.log(dataItem, "dataToken");
        });
        let t = dataToken;
        t.push(dataItem);
        setDataToken(t);
      });
      console.log(dataToken, "dataToken");
    }
  }, [dataToken]);

  const handleCreateAccount = async () => {
    const derivedNode = HDNode.derivePath(`m/44'/60'/0'/0/${data.length}`);
    let balanceOf = await getBalance(derivedNode.privateKey);
    // console.log(parseFloat(balanceOf).toFixed(4), "balanceOf");
    var newObj = {};
    newObj.key = data.length;
    newObj.address = derivedNode.address;
    // newObj.public = "456789045678904567890456789045678904567890";
    newObj.private = derivedNode.privateKey;
    newObj.balance = parseFloat(balanceOf).toFixed(4);
    setData((data) => [...data, newObj]);

    var existing = await JSON.parse(localStorage.getItem("data"));

    if (existing) {
      existing.numberOfAcc = data.length + 1;
      existing.listAcc = [...existing.listAcc, derivedNode.address];

      localStorage.setItem("data", JSON.stringify(existing));
    }
  };

  const expandedRow = (row) => {
    // console.log("-----------", dataToken[row.key]);
    // let inTable = row.key == 1 ? data1 : row.key == 2 ? data2 : data;

    return (
      <Table
        columns={columnsToken}
        dataSource={dataToken[row.key]}
        pagination={false}
      />
    );
  };

  const columnsToken = [
    {
      title: "Name token",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <Button type="primary" onClick={() => handleTransferToken(data)}>
            Transfer
          </Button>
        );
      },
    },
  ];

  const columns = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => {
        return <div style={{ wordBreak: "break-word" }}>{text}</div>;
      },
    },
    {
      title: "Private key",
      dataIndex: "private",
      key: "private",
      render: (text) => {
        return <div style={{ wordBreak: "break-word" }}>{text}</div>;
      },
    },
    {
      title: "Balance BNBT",
      dataIndex: "balance",
      key: "balance",
      width: "150px",
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
    {
      title: "Import token",
      dataIndex: "import",
      key: "import",
      render: (value, data) => {
        // console.log(value,"value");
        return (
          <Button type="primary" onClick={() => handleImportToken(data)}>
            Import
          </Button>
        );
      },
    },
  ];

  return (
    <>
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
            expandedRowRender={expandedRow}
            columns={columns}
            dataSource={data}
          />
        </>
      )}
    </>
  );
}
