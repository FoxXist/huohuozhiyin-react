import usePlayer, { PlayerType } from '@/hooks/usePlayer';
import { Drag_Field, Drag_List } from '@/pages/formation-mgmt/constants';
import FormationBg from '@/public/formation-bg.png';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlayerList from './_components/PlayerList';

const PLAYER_TYPE = 'PLAYER';

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

const Position = ({ id, player, onDrop, onFieldDrop, top, left }) => {
  console.log(player);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: PLAYER_TYPE,
      item: { from: Drag_Field, id, player: player },
      canDrag: !!player,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [player],
  );

  const [, drop] = useDrop(() => ({
    accept: PLAYER_TYPE,
    drop: (item: any) => {
      console.log(item);
      // 来源为球员列表
      if (item.from === Drag_List) {
        onDrop(item.playerId, id, Drag_List);
      } else if (item.from === Drag_Field) {
        // 来自场内交换
        onFieldDrop(id, item.id, Drag_Field);
      }
    },
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`absolute w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white text-xs ${
        player ? 'bg-green-700' : 'bg-transparent'
      }`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-50%, -50%)`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="relative">
        <div>{player?.name || id}</div>
      </div>
    </div>
  );
};

const Field = ({ formation, playerList, onDrop, onFieldDrop }) => {
  const findPlayer = (id: number) => {
    return playerList.find(
      (player: PlayerType) => player?.assignPositionId === id,
    );
  };

  return (
    <div className="relative flex items-center size-full max-w-[700px] mx-auto">
      <div className="relative aspect-[4/4] w-full">
        <img
          src={FormationBg}
          className="absolute top-0 left-0 w-full h-full object-contain"
          alt="field"
        />
        {formation.positions.map((pos) => (
          <Position
            key={pos.id}
            id={pos.id}
            player={findPlayer(pos.id)}
            onDrop={onDrop}
            onFieldDrop={onFieldDrop}
            top={pos.y}
            left={pos.x}
          />
        ))}
      </div>
    </div>
  );
};

export default function FormationEdit() {
  const { playerList, updatePosPlayerById, switchPlayerPos } = usePlayer();

  const handleListToFieldDrop = (
    playerId: number,
    assignPositionId: number,
    type: string,
  ) => {
    if (type === Drag_List) {
      updatePosPlayerById(playerId, assignPositionId);
    }
  };

  const handleFieldToFieldDrop = (
    targetPosId: number,
    targetPlayerId: number,
    originPosId: number,
    originPlayerId?: number,
  ) => {
    // switchPlayerPos(targetPosId, targetPlayerId, originPosId, originPlayerId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen w-full bg-green-900 text-white p-4 gap-4">
        <div className="w-1/4 p-4">
          <h2 className="text-lg font-bold mb-4">阵型选择</h2>
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
