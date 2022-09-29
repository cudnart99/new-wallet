import React, { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { WrapperStyled } from "./styled";
import { Input, Button, Modal, Space, Table, Tag, AutoComplete } from "antd";
import { ethers, Wallet } from "ethers";
import {
    getBalance,
    transfer,
    getSymbolOfTokenImport,
    getBalanceOfTokenImport,
} from "./ulis";
import ModalTransfer from "./Modal/ModalTransfer";
import ModalImport from "./Modal/ModalImport";

export default function NewWallet() {
    const [privateWallet, setPrivateWallet] = useState("");
    const [newPrivateWallet, setNewPrivateWallet] = useState("");
    const [visiblePrivate, setVisiblePrivate] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalImport, setVisibleModalImport] = useState(false);
    const [visibleAccount, setVisibleAccount] = useState(false);
    const [HDNode, setHDNode] = useState({});
    const [data, setData] = useState([]);
    const [infoTokenImport, setInfoTokenImport] = useState({});
    const [privateTransfer, setPrivateTransfer] = useState("");
    const [addressTransfer, setAddressTransfer] = useState("");
    const [dataToken, setDataToken] = useState([]);

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
                    <Button
                        type="primary"
                        onClick={() => handleTransferToken(data)}
                    >
                        Transfer
                    </Button>
                );
            },
        },
    ];

    useEffect(() => {
        var infoData = JSON.parse(localStorage.getItem("data"));
        if (infoData) {
            infoData.listAcc.map(async (value) => {
                let infoToken = await JSON.parse(localStorage.getItem(value));
                let dataItem = [];
                infoToken.tokenImport.map(async (item, index) => {
                    // let sym = await getSymbolOfTokenImport(infoToken.priKey, item.address);
                    // let balance = await getBalanceOfTokenImport(
                    //     infoToken.priKey,
                    //     value,
                    //     item.address
                    // );
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
    }, []);

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
    const expandedRowRender = async (row) => {
        // for (let i = 0; i < 3; ++i) {
        //     data.push({
        //         key: i.toString(),
        //         name: "This is production name",
        //         address: "1234",
        //         balance: "123",
        //     });
        // }
        // let inTable =
        // console.log("row", row.key);

        var t = [
            {
                name: "This is production name",
                address: "1234",
                balance: "123",
            },
        ];

        return (
            <Table columns={columnsToken} dataSource={t} pagination={false} />
        );
    };

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
                    <Button
                        type="primary"
                        onClick={() => handleImportToken(data)}
                    >
                        Import
                    </Button>
                );
            },
        },
    ];

    const handleTransferToken = (data) => {
        console.log(data, "data");
    };

    const handleImportToken = (data) => {
        setInfoTokenImport(data);
        setVisibleModalImport(true);
    };

    const handleTransfer = (data) => {
        setVisibleModal(true);
        setPrivateTransfer(data.private);
        setAddressTransfer(data.address);
    };

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

    const handleCreate = async () => {
        const newWord = await Wallet.createRandom().mnemonic;
        setNewPrivateWallet(newWord.phrase);
        setVisiblePrivate(true);
    };

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

    const handleSubmit = async (receiver, amount) => {
        setVisibleModal(false);
        await transfer(privateTransfer, addressTransfer, receiver, amount);
    };

    const handleCancel = () => {
        setVisibleModal(false);
    };

    const handleOk = () => {
        setVisibleModal(false);
    };

    const handleCancelModalImport = () => {
        setVisibleModalImport(false);
    };

    const handleOkModalImport = () => {
        setVisibleModalImport(false);
    };

    const handleSubmitModalImport = async (addressToken) => {
        setVisibleModal(false);

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
                        expandedRowRender={expandedRow}
                        columns={columns}
                        dataSource={data}
                    />
                </>
            )}
            <ModalTransfer
                visibleModal={visibleModal}
                privateTransfer={privateTransfer}
                addressTransfer={addressTransfer}
                handleCancel={handleCancel}
                handleOk={handleOk}
                handleSubmit={handleSubmit}
            />
            <ModalImport
                visibleModalImport={visibleModalImport}
                handleCancelModalImport={handleCancelModalImport}
                handleOkModalImport={handleOkModalImport}
                handleSubmitModalImport={handleSubmitModalImport}
            />
        </WrapperStyled>
    );
}
