const { ethers } = require("ethers");
const { Modal } = require("antd");
const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const bscProvider = new ethers.providers.JsonRpcProvider(rpc, {
  name: "bnbt",
  chainId: 97,
});
const abi = require("../NewWallet/abi/abi");

async function getBalance(privateKey) {
  let wallet = new ethers.Wallet(privateKey);
  let walletSigner = wallet.connect(bscProvider);
  let balance = await walletSigner.getBalance();
  let fixBalance = balance.toString() / Math.pow(10, 18);
  return fixBalance;
}

async function transfer(privateKey, sender, receiver, amount) {
  let wallet = new ethers.Wallet(privateKey);
  let walletSigner = wallet.connect(bscProvider);
  const tx = {
    from: sender,
    to: receiver,
    value: ethers.utils.parseUnits(amount.toString(), 18),
  };
  try {
    let res = await walletSigner.sendTransaction(tx);
    console.log("res", res);
    Modal.success({
      title: "Transfer thành công",
      // content: (<div>{res123}</div>)
    });
  } catch (error) {
    console.log("error", error);
    Modal.error({
      title: "Transfer thất bại",
    });
  }
}

async function getSymbolOfTokenImport(privateKey, addressToken) {
  let wallet = new ethers.Wallet(privateKey);
  let walletSigner = wallet.connect(bscProvider);

  const smc = new ethers.Contract(addressToken, abi, walletSigner);
  const symbol = await smc.symbol();
  return symbol;
}

async function getBalanceOfTokenImport(privateKey, addressUser, addressToken) {
  let wallet = new ethers.Wallet(privateKey);
  let walletSigner = wallet.connect(bscProvider);

  const smc = new ethers.Contract(addressToken, abi, walletSigner);
  const balance = await smc.balanceOf(addressUser);
  return balance;
}

module.exports = {
  getBalance,
  transfer,
  getSymbolOfTokenImport,
  getBalanceOfTokenImport
};
