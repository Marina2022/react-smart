import React from 'react';
import s from './ExpertTitle.module.scss';
import tg from '../../../assets/social-tg.svg';
import twitter from '../../../assets/social-twitter.svg';
import web from '../../../assets/social-web.svg';
import insta from '../../../assets/social-insta.svg';

const ExpertTitle = ({expert}) => {

  return (
    <div>
      <div className={s.name}>{expert.name} {expert.position}</div>
      <ul className={s.socials}>
        <li>
          <a href={expert.telegram}>
            <img src={tg} alt="telegram icon"/>
          </a>
        </li>

        <li>
          <a href={expert.twitter}>
            <img src={twitter} alt="twitter icon"/>
          </a>
        </li>

        <li>
          <a href={expert.instagram}>
            <img src={web} alt="instagram icon"/>
          </a>
        </li>

        <li>
          <a href={expert.instagram}>
            <img src={insta} alt="instagram icon"/>
          </a>
        </li>
      </ul>
    </div>
  )




};

export default ExpertTitle;
