import { useEffect, useState } from 'react';
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";
import './NFT.scss';
import { set } from "lodash-es";

const peraWallet = new PeraWalletConnect();

const NFT = (gamosa) => {
  const [animate, setAnimate] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);
  const [tokenMinted, setTokenMinted] = useState(null);
  const [tokenMinting, setTokenMinting] = useState(null);
  
  //const [setImageSource, setfinalImage] = useState(null)


  const [assetID, setAssetID] = useState(gamosa.gamosa.nftAsset);
  const [imageSource, setImageSource] = useState("./nft/" + gamosa.gamosa.gamosa + ".png");
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

  function abbreviateAddress(address, prefixLength = 8, suffixLength = 6) {
    if (!address || address.length < prefixLength + suffixLength + 2) {
      return address; 
    }
  
    const prefix = address.substring(0, prefixLength + 2);
    const suffix = address.substring(address.length - suffixLength);
  
    return `${prefix}...${suffix}`;
  }

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (

  
    
    <div className='nft-container'>
    <p className="nft">Claim The Digital</p>
    <p className='nft'>Version Of Your Gamosa</p>
    <img src={imageSource} className="nft-box" />
    <button onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      } className='nft-button'>{isConnectedToPeraWallet ? "Disconnect" : "Connect Wallet"}</button>

<div>
        {isConnectedToPeraWallet ? (
          <div>
          <div>
          <p className="gamosaNFT"> Welcome {
           abbreviateAddress(accountAddress)
          }</p>
          </div>
          <div>
          <div>
          {tokenMinted ? (
            
            <a href={`https://testnet.explorer.perawallet.app/assets/${assetID}`} target="_blank" rel="noopener noreferrer">
  <button className="nft-claim">Check Your NFT {tokenMinted}</button>
</a>
           
          ) : (
            <div>
            {tokenMinting ? (
             <p className="gamosaNFT">Your NFT is Minting , Please wait</p>
          ) : (
            <button className="nft-claim" onClick={handleMintNFT}>Claim This NFT</button>
          )}
          </div>
            
          )}
          </div>
          </div>

          </div>
      ) : (
        <p className="gamosaNFT">Connect To Perra Wallet to claim</p>
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
    setImageSource('./nft-box.png')
    setAccountAddress(null);
  }

  async function handleMintNFT() {

    console.log("mint")
    const OptInTransaction = await generateOptIntoAssetTxns({
      assetID: assetID,
      initiatorAddr: accountAddress
    });
    try {
      const assetIndex = assetID
      const accountPrivateKey = algosdk.mnemonicToSecretKey("roof cage sniff park time proof pink thank upon sunset garment question walnut segment oxygen winner exile tilt quality grow seven pupil deny absorb pass");


      const signedOptInTransaction = await peraWallet.signTransaction([OptInTransaction]);

     setTokenMinting(true)
     setImageSource('./gamosagif.gif')
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
      setImageSource('./success.png')
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



};

export default NFT;
