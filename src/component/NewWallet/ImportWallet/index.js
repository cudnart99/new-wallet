import React, { useState } from "react";
import { Input, Button } from "antd";
import { ethers } from "ethers";
import { getBalance } from "../ulis";

export default function ImportWallet({
  setVisibleAccount,
  setData,
  setHDNode,
  HDNode,
}) {
  // const [HDNode, setHDNode] = useState({});
  const [privateWallet, setPrivateWallet] = useState("");

  const handleImport = async () => {
    var preData = await JSON.parse(localStorage.getItem("data"));
    let newHDNode = await ethers.utils.HDNode.fromMnemonic(privateWallet);
    setHDNode(newHDNode);

    if (preData == null || preData.mnemonic !== privateWallet) {
      const derivedNode = newHDNode.derivePath(`m/44'/60'/0'/0/0`);

      delete localStorage.data;

      localStorage.setItem(
        "data",
        JSON.stringify({
          mnemonic: privateWallet,
          numberOfAcc: 1,
          listAcc: [derivedNode.address],
        })
      );

      let balanceOf = await getBalance(derivedNode.privateKey);
      setData((data) => [
        ...data,
        {
          key: 0,
          address: derivedNode.address,
          private: derivedNode.privateKey,
          balance: parseFloat(balanceOf).toFixed(4),
        },
      ]);
    } else {
      for (let i = 0; i < preData.numberOfAcc; i++) {
        const derivedNode = HDNode.derivePath(`m/44'/60'/0'/0/${i}`);
        let balanceOf = await getBalance(derivedNode.privateKey);
        var newObj = {};
        newObj.key = i;
        newObj.address = derivedNode.address;
        newObj.private = derivedNode.privateKey;
        newObj.balance = parseFloat(balanceOf).toFixed(4);
        setData((data) => [...data, newObj]);
      }
    }
    setVisibleAccount(true);
  };
  return (
    <>
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
    </>
  );
}
