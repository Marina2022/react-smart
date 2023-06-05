import s from './DonateButton.module.scss'
import cn from "classnames";
import {useSelector} from "react-redux";
import {
  selectDonateInputValue,
  selectIsUserRegistered,
  selectRound,
  selectWallet
} from "../../../store/reducers/dataReducer";
import {useState} from "react";
import DonateModal from "./DonateModal/DonateModal";

const DonateButton = ({expert, classname, bonus}) => {

  const donateInputValue = useSelector(selectDonateInputValue)
  const wallet = useSelector(selectWallet);
  const roundStatus = useSelector(selectRound).status;
  const [isDonateModalShown, setIsDonateModalShown] = useState(false);
  const [isTooltipShown, setIsTooltipShown] = useState(false);

  const isUserRegistered = useSelector(selectIsUserRegistered) // берем из редакса значение - зареган или нет


  const showTooltip = () => {
    setIsTooltipShown(true);
  }

  const hideTooltip = () => {
    setIsTooltipShown(false)
  }

  const onDonateClick = () => {
    setIsDonateModalShown(true)
  }
  return (
    <div>
      <div onMouseEnter={() => showTooltip()}
           onMouseLeave={() => hideTooltip()}
           className={s.buttonWrapper}
      >

        <button className={cn(s.cellButton, classname)}
                disabled={!wallet || roundStatus !== 1 || expert.isVoted === true || !isUserRegistered}
                onClick={onDonateClick}
        >Donate
        </button>

        {
          (!wallet ) && isTooltipShown &&
          <div className={s.tooltip}>Connect your wallet for donate</div>
        }

        {
          (!isUserRegistered ) && isTooltipShown &&
          <div className={s.tooltip}>Register for donate</div>
        }



      </div>

      <DonateModal isDonateModalShown={isDonateModalShown} setIsDonateModalShown={setIsDonateModalShown} expert={expert} bonus={bonus}/>
    </div>
  )
}

export default DonateButton;
