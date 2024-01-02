import React from 'react';
import iconImage from '../welcome/images/welcome-icon.png';
import './Welcome.css';
import sprite from '../welcome/images/sprite.svg';
import { NavLink } from 'react-router-dom';

const WelcomeFrom = () => {
  return (
    <div className="welcome-wrapper">
      <div className="container-welcome">
        <img className="welcome-icon" src={iconImage} alt="man with macbook" />

        <div className="welcome-logo">
          <svg className="welcome-logo-icon">
            <use href={sprite + '#icon-logo'} />
          </svg>

          <h1>Task Pro</h1>
        </div>

        <p className="logo-descr">
          Supercharge your productivity and take control of your tasks with Task
          Pro - Don't wait, start achieving your goals now!
        </p>

        <NavLink className="welcome-links" to="/auth/register">
          Registration
        </NavLink>
        <NavLink className="welcome-links" to="/auth/login">
          Log In
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomeFrom;
