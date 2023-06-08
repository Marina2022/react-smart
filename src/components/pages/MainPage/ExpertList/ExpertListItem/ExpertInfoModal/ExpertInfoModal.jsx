import React, {useEffect} from "react";

import s from './ExpertInfoModal.module.scss'

import ExpertTitle from "../../../../../sharedComponents/ExpertTitle/ExpertTitle";
import ExpertText from "../../../../../sharedComponents/ExpertText/ExpertText";
import ShareProfile from "../../../../../sharedComponents/ShareProfile/ShareProfile";

import closeBtn from '../../../../../../assets/close.svg';
import ExpertDonations from "../../../../../sharedComponents/ExpertDonations/ExpertDonations";
import DonateButton from "../../../../../sharedComponents/DonateButton/DonateButton";

const ExpertInfoModal = ({isExpertModalActive, setExpertModalActive, expert, avatar, donations, bonus}) => {

  const onKeydown = (e) => {
    if (e.key === 'Escape')
      setExpertModalActive(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  return (
    isExpertModalActive &&
    <>
      <div className="overlay" onClick={() => setExpertModalActive(false)}></div>
      <div className={s.expertInfoModal}>
        <button className={s.closeBtn} onClick={()=>setExpertModalActive(false)}><img src={closeBtn} alt="close button"/></button>
        <div className={s.header}>
          <div className={s.mainInfo}>
            <img src={avatar} alt="avatar" className={s.avatar}/>
            <ExpertTitle expert={expert}/>
          </div>
          <ShareProfile expertId={expert.id} classname={s.modal__shareProfile} />
        </div>
        <ExpertText expert={expert} />
        <ExpertDonations classname={s.expertInfoModal__Text} donations={donations} bonus={bonus}/>
        <DonateButton classname={s.expertInfoModal__donateBtn} expert={expert} bonus={bonus} />
      </div>
    </>
  );
};

export default ExpertInfoModal;
