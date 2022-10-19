import React from 'react';
import './StartPage.scss';
import { Link } from 'react-router-dom';
import LoudSpeaker from './loudspeaker-g79e8380b3_1280.png';
import { useTranslation } from 'react-i18next';
export default function StartPage() {
  const { t } = useTranslation();
  return (
    <section className='start-page'>
      <div className="container">
        <div className="start-row">
          <div className="start-content">
            <h1 className='fw-bold'>ANNOUNCE</h1>
            <p>
              {t("about")}
            </p>
            <Link to="/login" className="btn btn-primary">
              {t("getstart")}
            </Link>
          </div>
          <div className="start-img">
            <img src={LoudSpeaker} alt="loud speaker" />
          </div>
        </div>
          
      </div>
    </section>
  )
}
