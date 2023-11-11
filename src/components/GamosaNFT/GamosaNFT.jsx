import { useState, useEffect } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";
import "./GamosaNFT.scss"
import { set } from "lodash-es";


const peraWallet = new PeraWalletConnect();

export default function App() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [tokenMinted, setTokenMinted] = useState(null);
  const [tokenMinting, setTokenMinting] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  const algod = new algosdk.Algodv2("https://testnet-api.algonode.cloud", "https://testnet-api.algonode.cloud", "");

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
          setAccountAddress(accounts[0]);
        }
      })
      .catch((e) => console.log(e));

      
  }, []);

  return (
    <div className="gamosaNFT-container">
    <button className="gamosanft-button"
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
    >
      {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
    </button>

      <div>
        {isConnectedToPeraWallet ? (
          <div>
          <div>
          <p className="gamosaNFT"> Welcome {accountAddress}</p>
          </div>
          <div>
          <div>
          {tokenMinted ? (
            <p className="gamosaNFT">Token Minted {tokenMinted}</p>
          ) : (
            <div>
            {tokenMinting ? (
            <img className="nft-box" src="./gamosagif.gif" />
          ) : (
            <button className="gamosanft-button" onClick={handleMintNFT}>Mint NFT</button>
          )}
          </div>
            
          )}
          </div>
          </div>

          </div>

          
      ) : (
        <p className="gamosaNFT">Connect To Perra Wallet</p>
      )}
  </div>
  </div>


  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
        console.log(newAccounts[0]);
        <p className="gamosaNFT">{accountAddress}</p>
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress(null);
  }

  async function handleMintNFT() {

    console.log("mint")
    const OptInTransaction = await generateOptIntoAssetTxns({
      assetID: 432618014,
      initiatorAddr: accountAddress
    });
    try {
      const assetIndex = 432618014
      const accountPrivateKey = algosdk.mnemonicToSecretKey("roof cage sniff park time proof pink thank upon sunset garment question walnut segment oxygen winner exile tilt quality grow seven pupil deny absorb pass");


      const signedOptInTransaction = await peraWallet.signTransaction([OptInTransaction]);

      setTokenMinting(true)
      const suggestedParams = await algod.getTransactionParams().do();
      const FundTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: accountPrivateKey.addr,
        to: accountAddress,
        amount: 250000,
        suggestedParams: suggestedParams
      });

      console.log("sending")
      const signedFundTxn =FundTxn.signTxn(accountPrivateKey.sk);
      const fundTransaction = await algod.sendRawTransaction(signedFundTxn).do();
      console.log("Transaction : " + fundTransaction.txId);
      await algosdk.waitForConfirmation(algod, fundTransaction.txId, 4);
      console.log("fund transaction complete")
      
      

      const optinTransaction = await algod.sendRawTransaction(signedOptInTransaction).do();
      console.log("Transaction : " + optinTransaction.txId);
      await algosdk.waitForConfirmation(algod, optinTransaction.txId, 4);
      console.log("opt in transaction complete")

      const assetTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams,
        from: accountPrivateKey.addr,
        to: accountAddress,
        amount: 1,
        assetIndex
      })

      const signedTransferTransaction =assetTransferTxn.signTxn(accountPrivateKey.sk);
      const transferTransaction = await algod.sendRawTransaction(signedTransferTransaction).do();
      console.log("Transaction : " + transferTransaction.txId);
      await algosdk.waitForConfirmation(algod, transferTransaction.txId, 4);
      console.log("transfer transaction complete")
      setTokenMinting(false)
      setTokenMinted(true);
    }
      catch (error) {
        console.log("Couldn't sign Opt-in txns",error);
      }      
  }

  async function generateOptIntoAssetTxns({
    assetID,
    initiatorAddr
  }) {
    const suggestedParams = await algod.getTransactionParams().do();
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: initiatorAddr,
      to: initiatorAddr,
      assetIndex: assetID,
      amount: 0,
      suggestedParams
    });

    console.log(optInTxn)  
    return [{txn: optInTxn, signers: [initiatorAddr]}];
  }
}
