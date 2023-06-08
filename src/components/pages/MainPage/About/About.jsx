import s from "./About.module.scss";
import icon1 from '../../../../assets/about-icon1.svg';
import icon2 from '../../../../assets/about-icon2.svg';
import icon3 from '../../../../assets/about-icon3.svg';
import {PRIZE_FUND} from "../../../../consts";
import {useSelector} from "react-redux";
import {selectExperts} from "../../../../store/reducers/dataReducer";

const About = () => {

  const experts = useSelector(selectExperts);

  let contributors = 0  // сумма контрибуторов
  let sumOfDonates = 0

    experts.forEach((oneExpert)=>{
      contributors += oneExpert.events.donates.length  //
      const donatesSum = oneExpert.events.donates.reduce((sum, elem) => {
        return sum + +(elem._revardsAmount/10**18).toFixed(2)
      }, 0)
      sumOfDonates += donatesSum
    })


  return (
    <>
      <h1 className={s.mainTitle}>Quadratic funding #1 for experts</h1>
      <p className={s.aboutText}>We help authors raise funds to  create a future training course + attract the first learners and users can support the authors they like with donations and get discounts on their finished course!</p>
      <ul className={s.aboutFeatures}>
        <li className={s.aboutFeaturesItem}>
          <div className={s.featureValue}>${(sumOfDonates).toLocaleString('en')}</div>
          <div className={s.featureName}>
            <img className={s.featureImage} src={icon1} alt="feature icon"/>
            <span>Donations</span>
          </div>
        </li>
        <li className={s.aboutFeaturesItem}>
          <div className={s.featureValue}>{contributors}</div>
          <div className={s.featureName}>
            <img className={s.featureImage} src={icon2} alt="feature icon"/>
            <span>Contributors</span>
          </div>
        </li>
        <li className={s.aboutFeaturesItem}>
          <div className={s.featureValue}>${PRIZE_FUND}.000 </div>
          <div className={s.featureName}>
            <img className={s.featureImage} src={icon3} alt="feature icon"/>
            <span>Prizepool</span>
          </div>
        </li>
      </ul>
    </>
  )
}

export default About;
