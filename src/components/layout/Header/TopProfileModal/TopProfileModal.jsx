import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

import s from './TopProfileModal.module.scss'

import profileBtn from '../../../../assets/profile-link.svg'
import greenRound from '../../../../assets/wallet-green-round.svg'
import onBtn from '../../../../assets/onBtn.svg'
import WithdrawBtn from "../../../smartContractComponents/WithdrawBtn/WithdrawBtn";
import {selectCurrentExpertId, selectRole, selectRound, selectWallet} from "../../../../store/reducers/dataReducer";
import {useDisconnect} from "wagmi";

const TopProfileModal = ({profileModalIsShown, setProfileModalIsShown, classname, walletNumber}) => {
  const wallet = useSelector(selectWallet);
  const role = useSelector(selectRole);
  const currentId = useSelector(selectCurrentExpertId);
  const navigate = useNavigate();

  const onLinkClick = () => {
    if (role === 'expert') {
      navigate('/expertProfile/' + currentId)
    } else {
      navigate('/profile')
    }

    setProfileModalIsShown(false)
  }

  const onKeydown = (e) => {
    if (e.key === 'Escape')
      setProfileModalIsShown(false);
  }


  const {disconnect} = useDisconnect()

  const onOffClick = () => {
    navigate('/')
    disconnect()
    window.location.reload()

  }

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  }, [])

  return (
    wallet && profileModalIsShown && <div className={classname}>
      <div className="overlayTransparent" onClick={() => setProfileModalIsShown(false)}></div>
      <div className={s.modal}>
        <div className={s.header}>
          <h3 className={s.title}>Profile</h3>
          <button className={s.profileBtn}><img src={profileBtn} alt="profile link"
                                                onClick={onLinkClick}
          /></button>
        </div>
        <div className={s.walletWrapper}>
          <div className={s.balance}>
            <div className={s.balanceName}>Balance</div>
            <div className={s.balanceValue}>{wallet.balance ? wallet.balance : '0'} Matic</div>
          </div>
          <div className={s.walletNumberWrapper}>
            <span className={s.walletNumber}>{walletNumber}</span>
            <img src={greenRound} alt="icon"/>
          </div>
          <button onClick={onOffClick}><img src={onBtn} alt="button"/></button>
        </div>
        <div className={s.bottomWrapper}>
          <div className={s.balance}>
            <div className={s.balanceName}>Donated</div>
            <div className={s.balanceValue}>{wallet.donated} Matic</div>
          </div>
          <WithdrawBtn classname={s.withDraw}/>
        </div>
      </div>
    </div>
  );
};

export default TopProfileModal;
