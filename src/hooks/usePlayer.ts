import { useState } from 'react';

export type PlayerType = {
  id: number;
  name: string;
  assignPositionId?: number;
};

const initialPlayers: PlayerType[] = [
  {
    id: 1,
    name: 'Andrew Jones',
  },
  {
    id: 2,
    name: 'William Smith',
  },
  {
    id: 3,
    name: 'mitoma',
  },
  {
    id: 4,
    name: 'son',
  },
];

const usePlayer = () => {
  // 球员位置
  const [playerList, setPlayerList] = useState(initialPlayers);

  // 从球员到球场的位置更新
  const updatePosPlayerById = (playerId: number, assignPositionId: number) => {
    setPlayerList((prev) =>
      prev.map((player) =>
        player.id === playerId ? { ...player, assignPositionId } : player,
      ),
    );
  };

  // 从球场到球场位置更新
  const switchPlayerPos = (
    targetPosId: number,
    targetPlayerId: number,
    // originPosId: number,
    // originPlayerId?: number,
  ) => {
    setPlayerList((prev) => {
      const updated = [...prev];

      // 找到目标位置上的球员（要被换下的）
      const targetPlayer = updated.find(
        (p) => p.assignPositionId === targetPosId,
      );

      // 找到正在被拖动的球员（要换上去的）
      const sourcePlayer = updated.find((p) => p.id === targetPlayerId);

      // 如果目标位置没人，直接赋值
      if (!targetPlayer) {
        return updated.map((p) =>
          p.id === targetPlayerId ? { ...p, assignPositionId: targetPosId } : p,
        );
      }

      // 否则，交换两人位置
      return updated.map((p) => {
        if (p.id === targetPlayerId) {
          return { ...p, assignPositionId: targetPosId };
        }
        if (p.id === targetPlayer.id) {
          return { ...p, assignPositionId: sourcePlayer?.assignPositionId };
        }
        return p;
      });
    });
  };

  return {
    playerList,
    updatePosPlayerById,
    switchPlayerPos,
  };
};

export default usePlayer;
