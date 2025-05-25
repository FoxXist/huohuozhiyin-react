import { PlayerType } from '@/hooks/usePlayer';
import {
  Drag_Field,
  Drag_List,
  Drag_Player,
} from '@/pages/formation-mgmt/constants';
import FormationBg from '@/public/formation-bg.png';
import { useDrag, useDrop } from 'react-dnd';

const Position = ({ id, player, onDrop, onFieldDrop, top, left }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: Drag_Player,
      item: { from: Drag_Field, id, player: player },
      canDrag: !!player,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [player],
  );

  const [, drop] = useDrop(
    () => ({
      accept: Drag_Player,
      drop: (item: any) => {
        // 来源为球员列表
        if (item.from === Drag_List) {
          onDrop(item.playerId, id, player?.id);
        } else if (item.from === Drag_Field) {
          // 来自场内交换
          console.log(11111, item, id, item?.player?.id);
          onFieldDrop(id, item?.player?.id);
        }
      },
    }),
    [player],
  );

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

export default Field;
