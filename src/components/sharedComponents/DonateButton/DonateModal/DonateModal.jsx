import s from './DonateModal.module.scss'
import closeBtn from '../../../../assets/closeConnect.svg'
import {useEffect, useState} from "react";

import greyRound from '../../../../assets/grey-round.svg'
import {useDispatch, useSelector} from "react-redux";
import {selectDonateInputValue, selectWallet, setDonateInputValue} from "../../../../store/reducers/dataReducer";
import ApprovePaymentBtn from "../../../smartContractComponents/ApprovePaymentBtn";
import ConfirmPaymentBtn from "../../../smartContractComponents/ConfirmPaymentBtn";
import one from "../../../../assets/progress/one.svg";
import oneChecked from "../../../../assets/progress/one-checked.svg";
import twoInactive from "../../../../assets/progress/two-inactive.svg";
import twoActive from "../../../../assets/progress/two-active.svg";


const DonateModal = ({expert, isDonateModalShown, setIsDonateModalShown, bonus}) => {

  const dispatch = useDispatch()

  const donateInputValue = useSelector(selectDonateInputValue)

  const onPayInputChange = (e) => {
    dispatch(setDonateInputValue(e.target.value))
  }

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      setIsDonateModalShown(false)
      setStep(1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  const wallet = useSelector(selectWallet)
  const [step, setStep] = useState(1)

  const onClose = () => {
    setIsDonateModalShown(false);
    setStep(1);
    dispatch(setDonateInputValue(''))
  }
  return (
    isDonateModalShown && <div>
      <div className={s.donateModal}>

        {
          step !== 3 && <button className={s.closeBtn}><img src={closeBtn} alt="close button"
                                                            onClick={onClose}/></button>
        }

        {
          (step === 1 || step === 2) && <div className={s.steps_1_2}>

            <h1 className={s.title}>Payment Confirmation</h1>
            <p className={s.youVote}>You vote for {expert.expert.name + ' ' + expert.expert.position}</p>
            <div className={s.youPay}>
              <span>You pay</span>
              <input onChange={onPayInputChange} type="text" placeholder="$" className={s.payInput}
                     value={donateInputValue}/>

            </div>
            <div className={s.textQuadr}>
              <span>Quadratic</span>
              <div className={s.bonusWrapper}><span className={s.bonus}>+{bonus}</span> <img src={greyRound} alt="icon"/>
              </div>
            </div>

            <div className={s.text}>
              <span>Balance</span>
              <div className={s.bonusWrapper}><span>${wallet.USDT_balance === '' ? '0' : wallet.USDT_balance}</span></div>
            </div>
            <div className={s.buttonWrapper}>
              <ApprovePaymentBtn step={step} setStep={setStep} expertId={expert.expert.id}/>
              <ConfirmPaymentBtn step={step} setStep={setStep} expertId={expert.expert.id}/>
            </div>

            <div className={s.progress}>
              <img src={step === 1 ? one : oneChecked} alt="step"/>
              <div className={s.line} style={{'background': step === 1 ? '#9CA3AF' : '#CB00DD'}}></div>
              <img src={step === 1 ? twoInactive : twoActive} alt="step"/>
            </div>
          </div>
        }
        {
          step === 3 && <div className={s.step_3}>
            <h3 className={s.thanks}>Thank you!</h3>
            <p className={s.successText}>You have successfully voted for the author</p>
            <button onClick={onClose} className={s.successBtn}>Ok</button>
          </div>
        }


      </div>

      <div className="overlay" onClick={onClose}></div>

    </div>
  );
};

export default DonateModal;
