import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {
  fetchOneExpert,
  selectCurrentExpert,
  selectCurrentExpertId, selectExperts,
  selectIsOneExpertLoading, selectWallet
} from "../../../store/reducers/dataReducer";
import {useDispatch, useSelector} from "react-redux";
import {RotatingLines} from "react-loader-spinner";

import s from './ExpertProfile.module.scss'
import ExpertDonations from "../../sharedComponents/ExpertDonations/ExpertDonations";
import ShareProfile from "../../sharedComponents/ShareProfile/ShareProfile";
import ExpertTitle from "../../sharedComponents/ExpertTitle/ExpertTitle";
import ExpertText from "../../sharedComponents/ExpertText/ExpertText";
import ClaimButton from "../../smartContractComponents/ClaimButton/ClaimButton";
import {PRIZE_FUND} from "../../../consts";

const ExpertProfile = () => {
  const paramsId = useParams().id;
  const dispatch = useDispatch()

  const loc = useLocation()

  useEffect(() => {
    dispatch(fetchOneExpert(paramsId))
  }, [loc])

  const currentExpert = useSelector(selectCurrentExpert);
  const currentExpertId = useSelector(selectCurrentExpertId);
  const isCurrentExpertLoading = useSelector(selectIsOneExpertLoading);

  const navigate = useNavigate()

  const onEditClick = () => {
    navigate('/edit')
  }

  const wallet = useSelector(selectWallet)
  const experts = useSelector(selectExperts)
  console.log(experts)

  let donations = 0
  let bonus = 0

  let expertInfo = null
  if (wallet) {
     expertInfo = experts.find((expert) => {
      return expert.id === +paramsId
    })

    console.log(expertInfo)


    if (expertInfo) {  // если эксперт в списке экспертов уже есть, то можно посчитать его donations и QF bonus
      donations = expertInfo.events.donates.reduce((sum, elem) => {
        return sum + +(elem._revardsAmount/10**18).toFixed(2)
      }, 0)

      const globalDonatesNumber = experts.reduce((sum, elem) => {
        return sum + elem.events.donates.length
      }, 0)

      bonus = (PRIZE_FUND * expertInfo.events.donates.length / globalDonatesNumber).toFixed(1) + 'k'
    }
  }

  if (isCurrentExpertLoading) return <div style={{'textAlign': 'center', 'padding': 50}}><RotatingLines
    strokeColor="#4481c3"/></div>

  return (
    currentExpert && <div>
      <div className={s.container}>
        <div className={s.mainBlock}>
          <div className={s.leftBlock}>
            <img className={s.avatar} src={currentExpert.expert.image ? currentExpert.expert.image : ''} alt="avatar"/>
            {currentExpertId === +paramsId && <button className={s.editBtn} onClick={onEditClick}>Edit profile</button>}
            {/*<button className={s.editBtn} onClick={onEditClick}>Edit profile</button>*/}
            <ShareProfile classname={s.shareProfile}/>
          </div>
          <div className={s.rightBlock}>
            <ExpertTitle expert={currentExpert.expert}/>
            <ExpertText expert={currentExpert.expert} classname={s.text}/>
          </div>
        </div>
        <div>
          {
            expertInfo &&
            <ExpertDonations donations={donations === 0 ? '0' : donations} bonus={bonus === 0 ? '0' : bonus} classname={s.expertDonations}/>
          }

          {currentExpertId === +paramsId && < ClaimButton/>}
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
