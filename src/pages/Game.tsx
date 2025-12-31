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
        <div className="h-full w-full flex items-center justify-center gap-4 flex-col">
          <div className="text-4xl text-gray-500">{p.name}</div>
          <div className="text-4xl font-semibold">{p.word}</div>
        </div>
      )}
    />
  );
}
