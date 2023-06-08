import s from './ExpertListItem.module.scss'
import DonateButton from "../../../../sharedComponents/DonateButton/DonateButton";
import defaultAva from '../../../../../assets/defaultAva.svg'
import {useState} from "react";
import ExpertInfoModal from "./ExpertInfoModal/ExpertInfoModal";
import {PRIZE_FUND} from "../../../../../consts";

const ExpertListItem = ({expert, number, globalDonatesNumber}) => {
  const contributors = expert.events.donates.length
  const donations = expert.events.donates.reduce((sum, elem) => {
    return +sum + +(elem._revardsAmount/10**18).toFixed(2)
  }, 0)

  const avatar = expert.image ? expert.image : defaultAva;
  const bonus = (PRIZE_FUND * expert.events.donates.length /  globalDonatesNumber).toFixed(1) + 'k'
  const [isExpertModalActive, setExpertModalActive] = useState(false);

  return (
    <li className={s.expertsListItem}>
      <div className={s.cellNumber}>{number}</div>
      <div className={s.cellName} onClick={() => setExpertModalActive(true)}>
        <img src={avatar} alt="avatar" className={s.expertsAva}/>
        <a className={s.cellLink}>
          {expert.name} {expert.position}
        </a>
      </div>
      <div className={s.cellContributors}>{contributors}</div>
      <div className={s.cellDonations}><span className={s.cellDonationsSum}>${donations}</span> <span className={s.cellDonationsPlus}>+{bonus}</span></div>
      <DonateButton expert={expert} bonus={bonus}/>
      <ExpertInfoModal isExpertModalActive={isExpertModalActive} setExpertModalActive={setExpertModalActive}
                       expert={expert} avatar={avatar} donations={donations} bonus={bonus}/>
    </li>
  );
};

export default ExpertListItem;
