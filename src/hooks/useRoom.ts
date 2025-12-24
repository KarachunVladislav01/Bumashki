import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ref, 
  set, 
  onValue, 
  onDisconnect, 
  remove,
  push,
  serverTimestamp,
  get
} from 'firebase/database';
import { database } from '../firebase';

export interface Player {
  id: string;
  name: string;
  joinedAt: number;
  isHost: boolean;
}

export interface RoomState {
  players: Player[];
  gamePhase: 'lobby' | 'playing' | 'ended';
  hostId: string | null;
}

// Генерация короткого кода комнаты
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function useRoom() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [roomState, setRoomState] = useState<RoomState>({
    players: [],
    gamePhase: 'lobby',
    hostId: null
  });
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Флаг для отслеживания намеренного выхода
  const isLeavingRef = useRef(false);

  // Подписка на изменения комнаты
  useEffect(() => {
    if (!roomCode) return;

    const roomRef = ref(database, `rooms/${roomCode}`);
    
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      
      if (!data) {
        // Если выходим намеренно - не показываем ошибку
        if (!isLeavingRef.current) {
          setError('Комната была закрыта администратором');
        }
        setRoomCode(null);
        setPlayerId(null);
        setIsConnected(false);
        isLeavingRef.current = false;
        return;
      }

      const players: Player[] = data.players 
        ? Object.entries(data.players).map(([id, player]: [string, any]) => ({
            id,
            name: player.name,
            joinedAt: player.joinedAt,
            isHost: id === data.hostId
          }))
        : [];

      // Сортируем по времени присоединения
      players.sort((a, b) => a.joinedAt - b.joinedAt);

      setRoomState({
        players,
        gamePhase: data.gamePhase || 'lobby',
        hostId: data.hostId
      });
      setIsConnected(true);
    }, (err) => {
      setError('Ошибка подключения: ' + err.message);
      setIsConnected(false);
    });

    return () => unsubscribe();
  }, [roomCode]);

  // Создание новой комнаты
  const createRoom = useCallback(async (playerName: string): Promise<string> => {
    setError(null);
    isLeavingRef.current = false;
    
    const code = generateRoomCode();
    const roomRef = ref(database, `rooms/${code}`);
    const playerRef = push(ref(database, `rooms/${code}/players`));
    const newPlayerId = playerRef.key!;

    try {
      // Создаём комнату
      await set(roomRef, {
        createdAt: serverTimestamp(),
        gamePhase: 'lobby',
        hostId: newPlayerId
      });

      // Добавляем игрока
      await set(playerRef, {
        name: playerName,
        joinedAt: Date.now()
      });

      // Настраиваем автоудаление при отключении
      await onDisconnect(playerRef).remove();
      
      // Если это хост и он отключается, удаляем всю комнату
      await onDisconnect(roomRef).remove();

      setRoomCode(code);
      setPlayerId(newPlayerId);
      
      return code;
    } catch (err: any) {
      setError('Не удалось создать комнату: ' + err.message);
      throw err;
    }
  }, []);

  // Присоединение к существующей комнате
  const joinRoom = useCallback(async (code: string, playerName: string): Promise<void> => {
    setError(null);
    isLeavingRef.current = false;
    
    const normalizedCode = code.toUpperCase().trim();
    const roomRef = ref(database, `rooms/${normalizedCode}`);
    
    try {
      // Проверяем существует ли комната
      const snapshot = await get(roomRef);
      
      if (!snapshot.exists()) {
        setError('Комната с таким кодом не найдена');
        return;
      }

      const roomData = snapshot.val();
      
      if (roomData.gamePhase !== 'lobby') {
        setError('Игра уже началась, нельзя присоединиться');
        return;
      }

      // Добавляем игрока
      const playerRef = push(ref(database, `rooms/${normalizedCode}/players`));
      const newPlayerId = playerRef.key!;

      await set(playerRef, {
        name: playerName,
        joinedAt: Date.now()
      });

      // Настраиваем автоудаление при отключении
      await onDisconnect(playerRef).remove();

      setRoomCode(normalizedCode);
      setPlayerId(newPlayerId);
    } catch (err: any) {
      setError('Не удалось присоединиться: ' + err.message);
      throw err;
    }
  }, []);

  // Выход из комнаты
  const leaveRoom = useCallback(async () => {
    if (!roomCode || !playerId) return;

    // Ставим флаг что выходим намеренно
    isLeavingRef.current = true;

    try {
      const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
      await remove(playerRef);

      // Если это хост, удаляем всю комнату
      if (roomState.hostId === playerId) {
        const roomRef = ref(database, `rooms/${roomCode}`);
        await remove(roomRef);
      }
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }

    setRoomCode(null);
    setPlayerId(null);
    setIsConnected(false);
  }, [roomCode, playerId, roomState.hostId]);

  // Начать игру (только для хоста)
  const startGame = useCallback(async () => {
    if (!roomCode || roomState.hostId !== playerId) return;

    try {
      const gamePhaseRef = ref(database, `rooms/${roomCode}/gamePhase`);
      await set(gamePhaseRef, 'playing');
    } catch (err: any) {
      setError('Не удалось начать игру: ' + err.message);
    }
  }, [roomCode, playerId, roomState.hostId]);

  return {
    roomCode,
    playerId,
    roomState,
    error,
    isConnected,
    isHost: playerId === roomState.hostId,
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    clearError: () => setError(null)
  };
}
