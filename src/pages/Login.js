import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../style/loginPage.css';

export default function Login() {
  const history = useHistory();
  const [btnDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const verifyEmail = (em) => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(em);
  };

  useEffect(() => {
    const handleVerification = () => {
      const seis = 6;
      if (verifyEmail(email) && password.length > seis) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    handleVerification();
  }, [email, password]);

  const handleButton = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <>
      <div className="ondebox">
        <svg
          className="onda"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="onda"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18
            58 18 88 18 v44h-352Z"
            />
          </defs>
          <g className="parallaxonde">
            <use xlinkHref="#onda" x="48" y="0" fill="white" />
          </g>
        </svg>
      </div>
      <h1>Trybe</h1>
      <div className="login">
        <h2>Login</h2>
        <form action="POST">
          <input
            className="form"
            type="text"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            onChange={ (e) => {
              setEmail(e.target.value);
            } }
            name="email"
            id="email"
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Password"
            value={ password }
            onChange={ (e) => {
              setPassword(e.target.value);
            } }
            name="password"
            id="password"
          />
          <button
            type="button"
            onClick={ handleButton }
            disabled={ btnDisabled }
            data-testid="login-submit-btn"
          >
            Enter

          </button>
        </form>
      </div>

    </>
  );
}
