import s from './UserProfile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
  selectDonateInputValue,
  selectSuccessfullyDonated,
  selectWallet,
  setUserRole
} from "../../../store/reducers/dataReducer";
import WithdrawBtn from "../../smartContractComponents/WithdrawBtn/WithdrawBtn";
import {useState} from "react";
import UserProfileModal from "./UserProfileModal/UserProfileModal";

const UserProfile = () => {
  const wallet = useSelector(selectWallet);
  const successfullyDonated = useSelector(selectSuccessfullyDonated);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useDispatch()

  const switchToExpert = () => {
    setIsModalActive(true);
    dispatch(setUserRole('expert'))
  }

  return (
    <div className={s.container}>
      <div className={s.contentWrapper}>
        <div className={s.mainContent}>
          {successfullyDonated === '' ?
            <h1 className={s.donated}>0 tokens donated</h1> :
            <h1 className={s.donated}>{successfullyDonated ? successfullyDonated : '0'} Matic donated</h1>
          }
          <WithdrawBtn disabled={!successfullyDonated}/>
          <p className={s.text}>You can withdraw your tokens if the Expert fails to fulfill its obligations.</p>
        </div>
        <div>
          <button className={s.switchToExpertBtn} onClick={switchToExpert}>Switch to expert</button>
        </div>
      </div>
      <UserProfileModal isModalActive={isModalActive} setIsModalActive={setIsModalActive}/>
    </div>
  );
};

export default UserProfile;
