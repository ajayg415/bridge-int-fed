import React from 'react';

import './cards.css'

const Cards = props => {
  console.log(JSON.stringify(props.cardData))
  const { cardData } = props;
  return (
    <div className="card col-sm-3" tabIndex='0'>
      <div className="card-body">
        <h5 className="card-title">{cardData.academyName}</h5>
        <h6 className="card-subtitle mb-2 text-muted">XYZ Location</h6>
        <h6>Battery Details</h6>
        <div className="device-details">
          <div>
            <span>Need Replacement Immediately: </span>
            <span className='red-zone'><strong>{cardData.redZone}</strong></span>
          </div>
          <div>
            <span>Need Replacement: </span>
            <span className='orange-zone'><strong>{cardData.orangeZone}</strong></span>
          </div>
          <div>
            <span>Safe Device: </span>
            <span className='green-zone'><strong>{cardData.greenZone}</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Cards;