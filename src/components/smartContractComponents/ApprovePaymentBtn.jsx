import s from './ConnectBtns.module.scss';
import {useSelector} from "react-redux";
import {selectDonateInputValue} from "../../store/reducers/dataReducer";
import {useContractWrite} from "wagmi";
import {CONTRACT_ADDRESS, USDT_abi, USDT_ADDRESS} from "../../consts";

const ApprovePaymentBtn = ({step, setStep, expertId}) => {

  const donateInputValue = useSelector(selectDonateInputValue)

  const {
    data: approveData,
    isLoading: isLoadApprove,
    isSuccess: isSuccessApprove,
    write: approveUsdt
  } = useContractWrite({
    address: USDT_ADDRESS,
    abi: USDT_abi,
    functionName: 'approve',
    args: [CONTRACT_ADDRESS, donateInputValue * 10 ** 18], // donateInputValue - сумма которую пользователь в инпут ввел
    onSuccess(data) {
      setStep(2)    // т.е. перейдет на след. шаг, если аппрув удался
    }
  })

  const onApprovePayment = () => {  // обработчик клика на кнопку Approve
    if (donateInputValue === '') return
    approveUsdt()
  }

  return (
    <button
      className={s.connectBtn} disabled={step === 2}
      onClick={onApprovePayment}
    >Approve</button>
  );
};

export default ApprovePaymentBtn;
