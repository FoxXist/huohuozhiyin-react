import usePlayer from '@/hooks/usePlayer';
import SceneList from '@/pages/formation-mgmt/_components/SceneList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Field from './_components/Field';
import PlayerList from './_components/PlayerList';

const formationJson = {
  name: '4-3-3',
  positions: [
    { id: 1, name: 'GK', x: 50, y: 85 },
    { id: 2, name: 'RB', x: 80, y: 75 },
    { id: 3, name: 'CB', x: 65, y: 75 },
    { id: 4, name: 'CB', x: 35, y: 75 },
    { id: 5, name: 'LB', x: 20, y: 75 },
    { id: 6, name: 'DM', x: 50, y: 60 },
    { id: 8, name: 'CM', x: 35, y: 50 },
    { id: 10, name: 'CM', x: 65, y: 50 },
    { id: 11, name: 'LM', x: 15, y: 25 },
    { id: 9, name: 'ST', x: 50, y: 20 },
    { id: 7, name: 'RW', x: 85, y: 25 },
  ],
};

export default function FormationEdit() {
  const { playerList, updatePosPlayerById, switchPlayerPos } = usePlayer();

  const handleListToFieldDrop = (
    playerId: number,
    assignPositionId: number,
    originPlayerId?: number,
  ) => {
    updatePosPlayerById(playerId, assignPositionId, originPlayerId);
  };

  const handleFieldToFieldDrop = (
    targetPosId: number,
    targetPlayerId: number,
    originPlayerId?: number,
  ) => {
    switchPlayerPos(targetPosId, targetPlayerId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-full bg-green-900 text-white p-4 gap-4">
        <div className="w-1/8 p-4 bg-green-800 rounded-lg overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">阵型选择</h2>
          <SceneList />
        </div>
        <div className="flex-1">
          <Field
            formation={formationJson}
            playerList={playerList}
            onDrop={handleListToFieldDrop}
            onFieldDrop={handleFieldToFieldDrop}
          />
        </div>
        <div className="w-1/4 bg-green-800 p-4 rounded-lg overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">球员列表</h2>
          <PlayerList value={playerList.filter((v) => !v.assignPositionId)} />
        </div>
      </div>
    </DndProvider>
  );
}
