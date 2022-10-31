import React from 'react';
import './StartPage.scss';
import { Link } from 'react-router-dom';
import LoudSpeaker from './loudspeaker-g79e8380b3_1280.png';
import { useTranslation } from 'react-i18next';
import { Zoom } from "react-awesome-reveal";


export default function StartPage() {
  const { t } = useTranslation();
  
  return (
    <Zoom>
      <section className='start-page'>
        <div className="start-row">
          <div className="start-content">
            <h1 className='fw-bold'>ANNOUNCE</h1>
            <p>
              {t("about-start")}
            </p>
            <Link to="/login"  className="btn btn-primary">
              {t("start-divein")}
            </Link>
          </div>
          <div className="start-img">
            <img src={LoudSpeaker} alt="loud speaker" />
          </div>
        </div>
      </section>
    </Zoom>
    
  )
}
