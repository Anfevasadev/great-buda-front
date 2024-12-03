// Ballots.jsx
import React from 'react';
import './Ballots.css';

const Ballots = ({ ballots }) => {
    const lastThreeBallots = ballots.slice(-3);

    return (
        <div className="ballots-container">
            {lastThreeBallots.map((ballot, index) => (
                <div key={index} className="ballot">
                    {ballot.number}
                </div>
            ))}
        </div>
    );
};

export default Ballots;