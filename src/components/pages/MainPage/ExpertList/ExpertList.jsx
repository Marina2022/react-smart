import {useSelector} from "react-redux";
import {selectExperts} from "../../../../store/reducers/dataReducer";
import s from './ExpertsBlock.module.scss'
import mockExpert from '../../../../mocks/mockExpert';
import ExpertListItem from "./ExpertListItem/ExpertListItem";
import Clock from "./Clock/Clock";


const ExpertList = () => {
  const experts = useSelector(selectExperts);
  return (
    <div className={s.expertsBlock}>
      <h2 className={s.expertsTitle}>Donate to your favorite expert</h2>
      <div className={s.expertsDesc}>
        <div className={s.expertsNumber}>
          {
            `${experts.length} experts`
          }
        </div>
        <Clock />

      </div>
      <div className={s.expertsListHeader}>
        <div className={s.cellNumber_header}>#</div>
        <div className={s.cellName_header}>Name</div>
        <div className={s.cellContributors_header}>Contributors</div>
        <div className={s.cellDonations_header}>Donations</div>
      </div>

      <ul>
        {
          experts.map((expert, index)=>{

            return <ExpertListItem expert={mockExpert} key={index} number={index+1} />
            //return <ExpertListItem expert={expert} key={index} />
          })
        }
      </ul>

    </div>
  );
};

export default ExpertList;
