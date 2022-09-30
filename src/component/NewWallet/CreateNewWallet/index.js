import React, { useState } from "react";
import { Button } from "antd";
import { Wallet } from "ethers";

export default function CreateNewWallet() {
  const [newPrivateWallet, setNewPrivateWallet] = useState("");
  const [visiblePrivate, setVisiblePrivate] = useState(false);

  const handleCreate = async () => {
    const newWord = await Wallet.createRandom().mnemonic;
    setNewPrivateWallet(newWord.phrase);
    setVisiblePrivate(true);
  };
  return (
    <>
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
    </>
  );
}
