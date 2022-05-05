import React from 'react';
import { Link } from 'react-router-dom';
import '../style/notfound.css';
import giffood from '../style/membros/giffood.gif';

function NotFound() {
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
      <img className="foodgif" src={ giffood } alt="gifcook" />
      <div className="notfound">
        Not Found
      </div>
      <Link to="/drinks" className="btn btn-primary">back drinks</Link>
    </>
  );
}

export default NotFound;
