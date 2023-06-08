import s from './ClaimButton.module.scss';
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectExperts, selectRound} from "../../../store/reducers/dataReducer";


const ClaimButton = () => {
  const round = useSelector(selectRound)

  const showTooltip = () => {
    setIsTooltipShown(true);
  }

  const hideTooltip = () => {
    setIsTooltipShown(false)
  }

  const [isTooltipShown, setIsTooltipShown] = useState(false);


  return (

    <div onMouseEnter={() => showTooltip()}
         onMouseLeave={() => hideTooltip()}
         className={s.buttonWrapper}
    >
      <button className={s.claimBtn} disabled={round.status !==2}>Claim</button>
      {
        isTooltipShown && <div className={s.tooltip}>You can collect donates after voting ends</div>
      }
    </div>





  );
};

export default ClaimButton;
