import { GridList } from '../components/GridView';
import { Player } from '../hooks/useRoom';

interface GameProps {
  players: Player[];
  currentPlayerId: string;
  onLeave: () => void;
}


export function Game({ players, currentPlayerId, onLeave: _onLeave }: GameProps) {
  const visiblePlayers = players.filter((player) => player.id !== currentPlayerId);

  return (
     <GridList
      items={visiblePlayers}
      renderItem={(p) => (
        <div className="relative h-full w-full flex items-center justify-center flex-col px-4">
          <div className="absolute top-4 text-xl text-gray-500">{p.name}</div>
          <div className="text-4xl text-center break-words whitespace-normal">{p.word}</div>
        </div>
      )}
    />
  );
}
