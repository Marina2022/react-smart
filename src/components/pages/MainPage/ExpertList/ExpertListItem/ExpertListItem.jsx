import s from './ExpertListItem.module.scss'
import DonateButton from "../../../../sharedComponents/DonateButton/DonateButton";
import defaultAva from '../../../../../assets/defaultAva.svg'
import {useState} from "react";
import ExpertInfoModal from "./ExpertInfoModal/ExpertInfoModal";
import {PRIZE_FUND} from "../../../../../consts";

const ExpertListItem = ({expert, number, globalDonatesNumber}) => {
  const contributors = expert.donates.length
  const donations = expert.donates.reduce((sum, elem) => {
    return sum + +elem._revardsAmount
  }, 0)

  const avatar = expert.expert.image ? expert.expert.image : defaultAva;
  const bonus = parseInt  (PRIZE_FUND * expert.donates.length /  globalDonatesNumber)
  const [isExpertModalActive, setExpertModalActive] = useState(false);

  return (
    <li className={s.expertsListItem}>
      <div className={s.cellNumber}>{number}</div>
      <div className={s.cellName} onClick={() => setExpertModalActive(true)}>
        <img src={avatar} alt="avatar" className={s.expertsAva}/>
        <a className={s.cellLink}>
          {expert.expert.name} {expert.expert.position}
        </a>
      </div>
      <div className={s.cellContributors}>{contributors}</div>
      <div className={s.cellDonations}>${donations} <span className={s.cellDonationsPlus}>+{bonus}</span></div>
      <DonateButton expert={expert} bonus={bonus}/>
      <ExpertInfoModal isExpertModalActive={isExpertModalActive} setExpertModalActive={setExpertModalActive}
                       expert={expert} avatar={avatar} donations={donations} bonus={bonus}/>
    </li>
  );
};

export default ExpertListItem;
