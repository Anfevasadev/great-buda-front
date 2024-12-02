import socket from './socketService';

export const initializeSocket = (setPlayersCount) => {
    socket.connect();

    socket.on('error', (error) => {
        console.log('error', error);
    });
    
    socket.on('updatePlayers', ({ roomID, active_players }) => {
        console.log('updatePlayers', active_players);
        setPlayersCount(active_players);
    }
    );

    return () => {
        socket.off('updatePlayers');
        socket.off('startGame');
        socket.disconnect();
    };
};