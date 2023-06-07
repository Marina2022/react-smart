import s from './ConnectStep2.module.scss'

import metamaskIcon from "../../../../../assets/metamask.svg";
import trustwalletIcon from "../../../../../assets/trustwallet.svg";
import walletConnectIcon from "../../../../../assets/walletConnect.svg";
import braveIcon from "../../../../../assets/brave.svg";
import {useSelector} from "react-redux";
import {selectWalletType} from "../../../../../store/reducers/dataReducer";

// import backBtn from '../../../../../assets/backBtn.svg'
import StartWalletBtn from "../../../../smartContractComponents/StartWalletBtn/StartWalletBtn";

const ConnectStep2 = ({setStep}) => {
  const walletType = useSelector(selectWalletType);

  let image;
  switch (walletType) {
    case "MetaMask":
      image = metamaskIcon
      break
    case "TrustWallet":
      image = trustwalletIcon
      break
    case "WalletConnect":
      image = walletConnectIcon
      break
    case "Brave":
      image = braveIcon
      break
  }

  return (
    <div className={s.step2}>
      <StartWalletBtn setStep={setStep} />
      {/*<button className={s.backBtn}><img src={backBtn} alt="back button"*/}
      {/*                                   onClick={() => setStep(1)}*/}
      {/*/></button>*/}
      <h2 className={s.title}>{walletType}</h2>
      <img className={s.image} src={image} alt="brand picture"/>

      {walletType !== 'WalletConnect' ? <>
        <div className={s.desc}>Requesting Connection</div>
        <div className={s.text}>Open the MetaMask broser extension to connect your wallet</div>
      </> : null}
    </div>
  );
};

export default ConnectStep2;
