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
  const [playerList, setPlayerList] = useState(initialPlayers);

  // 从球员到球场的位置更新
  // playerId 拖拽的球员 assignPositionId 拖到的位置 老位置的球员 originPlayerId
  const updatePosPlayerById = (
    playerId: number,
    assignPositionId: number,
    originPlayerId?: number,
  ) => {
    setPlayerList((prev) =>
      prev.map((player) => {
        if (player.id === playerId) {
          return { ...player, assignPositionId };
        } else if (originPlayerId && player.id === originPlayerId) {
          return { ...player, assignPositionId: void 0 };
        }
        return player;
      }),
    );
  };

  // 从球场到球场位置更新
  const switchPlayerPos = (targetPosId: number, targetPlayerId: number) => {
    setPlayerList((prev) => {
      const updated = [...prev];

      // todo 找到老位置 替换为新位置即可
      const originPosIdIndex = updated.findIndex(
        (v) => v.id === targetPlayerId,
      );
      if (originPosIdIndex !== -1) {
        // 原来位置有球员
        const originPosPlayerIdIndex = updated.findIndex(
          (v) => v.assignPositionId && v.assignPositionId === targetPosId,
        );

        const originPosId = updated[originPosIdIndex].assignPositionId;

        updated.splice(originPosIdIndex, 1, {
          ...updated[originPosIdIndex],
          assignPositionId: targetPosId,
        });

        if (originPosPlayerIdIndex !== -1) {
          updated.splice(originPosPlayerIdIndex, 1, {
            ...updated[originPosPlayerIdIndex],
            assignPositionId: originPosId,
          });
        }

        return updated;
      }

      return updated;
    });
  };

  return {
    playerList,
    updatePosPlayerById,
    switchPlayerPos,
  };
};

export default usePlayer;
