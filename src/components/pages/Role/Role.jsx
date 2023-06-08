import s from './Role.module.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentExpert, selectCurrentExpertId, setUserRole} from "../../../store/reducers/dataReducer";
import {useNavigate} from "react-router-dom";

const Role = () => {

  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate()

  const onExpertInput = () => {
    setIsActive(true);
    setRole('expert');
  }

  const onStudentInput = () => {
    setIsActive(true);
    setRole('student');
  }

  const onSubmit = () => {
    dispatch(setUserRole(role));
    if (role === 'expert') navigate('/edit')
    if (role === 'student') navigate('/profile')
  }

  return (
    <div className={s.roleWrapper}>
      <h1 className={s.title}>What is your role?</h1>
      <input className={s.radio} type="radio" name="role" id="expert" onInput={onExpertInput}/>
      <label className={s.label} htmlFor="expert">I’m an expert</label>
      <input className={s.radio} type="radio" name="role" id="student" onInput={onStudentInput}/>
      <label className={s.label} htmlFor="student">I’m a student</label>
      <button className={s.btn} disabled={!isActive} onClick={onSubmit}>Continue</button>
    </div>
  )
};

export default Role;
