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
    <div className="form">
      <h4>TRYBE</h4>
      <h2>Login</h2>
      <form action="POST">
        <input
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
  );
}
