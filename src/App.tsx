import { useRoom } from './hooks/useRoom';
import { JoinRoom } from './pages/JoinRoom';
import { Lobby } from './pages/Lobby';
import { Game } from './pages/Game';
import { GoogleMeetLikeGrid } from './components/GridView';

const participants = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Maria" },
  { id: 3, name: "John" },
  { id: 4, name: "Kate" },
  { id: 5, name: "Max" },
  { id: 6, name: "Sofia" },
  { id: 7, name: "Daniel" },
  { id: 8, name: "Emma" },
  { id: 9, name: "Leo" },
];

function App() {
  const {
    roomCode,
    playerId,
    roomState,
    error,
    isHost,
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    submitWord,
    clearError
  } = useRoom();

  if (!roomCode || !playerId) {
    return (
      <JoinRoom
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        error={error}
        onClearError={clearError}
      />
    );
  }

  if (roomState.gamePhase === 'lobby') {
    return (
      <Lobby
        roomCode={roomCode}
        players={roomState.players}
        currentPlayerId={playerId}
        isHost={isHost}
        onStartGame={startGame}
        onLeave={leaveRoom}
        onSubmitWord={submitWord}
      />
    );
  }

  return (
    <Game
      players={roomState.players}
      currentPlayerId={playerId}
      onLeave={leaveRoom}
    />
  );
}

export default App;
