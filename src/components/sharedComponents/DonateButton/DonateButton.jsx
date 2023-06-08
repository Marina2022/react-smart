import s from './DonateButton.module.scss'
import cn from "classnames";
import {useSelector} from "react-redux";
import {
  selectIsUserRegistered,
  selectRound,
  selectWallet
} from "../../../store/reducers/dataReducer";
import {useState} from "react";
import DonateModal from "./DonateModal/DonateModal";

const DonateButton = ({expert, classname, bonus}) => {

  const wallet = useSelector(selectWallet);
  const roundStatus = useSelector(selectRound).status;
  const [isDonateModalShown, setIsDonateModalShown] = useState(false);
  const [isTooltipShown, setIsTooltipShown] = useState(false);

  const isUserRegistered = useSelector(selectIsUserRegistered) // берем из редакса значение - зареган или нет

  let isVoted = false

  if (wallet) {
    isVoted = expert.events.donates.find((donate) => {  // проверка - голосовал ли текущий пользователь за этого эксперта раньше
      return donate._sender === wallet.number.toLowerCase()
    })
  }

  const [isExpertVoted, setIsExpertVoted] = useState(isVoted ? true : false)

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
                disabled={!wallet || roundStatus !== 1 || isExpertVoted === true || !isUserRegistered}
                onClick={onDonateClick}
        >Donate
        </button>

        {
          (!wallet) && isTooltipShown &&
          <div className={s.tooltip}>Connect your wallet for donate</div>
        }

        {
          (!isUserRegistered) && isTooltipShown &&
          <div className={s.tooltip}>Register for donate</div>
        }

      </div>

      <DonateModal
        isDonateModalShown={isDonateModalShown}
        setIsDonateModalShown={setIsDonateModalShown}
        expert={expert}
        bonus={bonus}
        setIsExpertVoted={setIsExpertVoted}/>
    </div>
  )
}

export default DonateButton;
