import socket from './socketService';

export const initializeSocket = (setGameState) => {
    socket.connect();

    socket.on('error', (error) => {
        console.log('error', error);
    });

    socket.on('updatePlayers', ({ activePlayers }) => {
        // console.log('updatePlayers', activePlayers);
        setGameState(prevState => ({ ...prevState, playersCount: activePlayers }));
    });

    socket.on('waitingTime', ({ waitingTime }) => {
        // console.log('waitingTime', waitingTime);
        setGameState(prevState => ({ ...prevState, waitingTime }));
    });

    socket.on('closeRoom', () => {
        // console.log('closeRoom');
        setGameState(prev => ({ ...prev, isRoomClosed: true }));
    });

    socket.on('bingoCard', ({ userId, bingoCard }) => {
        // console.log('bingoCard', userId, bingoCard);
        setGameState(prevState => ({
            ...prevState,
            bingoCards: {
                ...prevState.bingoCards,
                [userId]: bingoCard
            }
        }));
    });

    socket.on('gameFinished',({message, winner_id}) => {
        console.log('gameFinished', message, winner_id);    
        setGameState(prevState => ({
            ...prevState,
            gameFinished: true,
            winner_id: winner_id,
            message: message
        }));

    });

    return () => {
        socket.off('updatePlayers');
        socket.off('waitingTime');
        socket.off('closeRoom');
        socket.off('bingoCard');
    };
};