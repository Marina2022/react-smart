import s from './ConnectBtns.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectDonateInputValue, setConnectIsShown, setIsVoted, setWallet} from "../../store/reducers/dataReducer";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS, MainContract_abi} from "../../consts";

const ConfirmPaymentBtn = ({step, setStep, expertId, setIsExpertVoted}) => {

  const donateInputValue = useSelector(selectDonateInputValue)
  const dispatch = useDispatch()

  const {
    data: DonateData,
    isLoading: isLoadDonate,
    isSuccess: isSuccessDonate,
    write: donateInUsdt
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: MainContract_abi,
    functionName: 'donateInUSDT',
    args: [expertId, donateInputValue * 10 ** 18],
    onSuccess(data) {
      setStep(3)
      setIsExpertVoted(true)
    }
  })

  const onConfirmPaymentClick = () => {   // обработчик клика по кнопке Confirm
    donateInUsdt()
  }

  return (
    <button className={s.connectBtn} disabled={step === 1} onClick={onConfirmPaymentClick}>
      Confirm</button>
  );
};

export default ConfirmPaymentBtn;
