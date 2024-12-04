// Ballots.jsx
import React from 'react';
import './Ballots.css';
import socket from '../services/socketService';
import { useParams } from 'react-router-dom';

const Ballots = ({ ballots }) => {
    const lastThreeBallots = ballots.slice(-3);
    const gameId = useParams().gameId

    const handleBingoClick = () => {
        const userId = localStorage.getItem('userId');
        socket.emit('bingo', { userId, gameId });
    };

    return (
        <div className="ballots-container">
            <div className='ballots'>
                {lastThreeBallots.map((ballot, index) => (
                    <div key={index} className="ballot">
                        {ballot.number}
                    </div>
                ))}
            </div>
            <button className="bingo-button" onClick={handleBingoClick}>BINGO</button>
        </div>
    );
};

export default Ballots;