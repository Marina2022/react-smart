import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectConnectIsShown, setConnectIsShown, setWalletType} from "../../../../store/reducers/dataReducer";

import ConnectStep1 from "./ConnectStep1/ConnectStep1";
import ConnectStep2 from "./ConnectStep2/ConnectStep2";
import ConnectSteps3_4 from "./ConnectSteps3-4/ConnectSteps3_4";

import closeBtn from '../../../../assets/closeConnect.svg'
import s from './ConnectModal.module.scss';

const ConnectModal = () => {
  const onClose = () => {
    setStep(2);
    dispatch(setConnectIsShown(false));
  }
  const onKeydown = (e) => {
    if (e.key === 'Escape')
      onClose();
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWalletType('WalletConnect'))
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  const [step, setStep] = useState(2);
  const connectIsActive = useSelector(selectConnectIsShown)


  return (
    connectIsActive && <div>
      <div className="overlay" onClick={onClose}></div>
      <div className={s.connectModal}>
        <button className={s.closeBtn}
                onClick={onClose}
        ><img src={closeBtn} alt="close button"/></button>

        {step === 1 && <ConnectStep1 setStep={setStep}/>}
        {step === 2 && <ConnectStep2 setStep={setStep} />}
        {((step === 3) || (step === 4)) && <ConnectSteps3_4 step={step} setStep={setStep}/>}

      </div>
    </div>
  )
}


export default ConnectModal;
