import { Drag_List, Drag_Player } from '@/pages/formation-mgmt/constants';
import { useDrag } from 'react-dnd';

const Player = ({
  name,
  id,
}: {
  name: string;
  id: number;
  onChange?: (val: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Drag_Player,
    item: { from: Drag_List, name, playerId: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="cursor-move bg-white text-black shadow-md rounded-full px-4 py-2 m-2 text-sm text-center"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      ⚽ {name}
    </div>
  );
};

const PlayerList = ({
  value,
}: {
  value: any[];
  onChange?: (val: number) => void;
}) => {
  return (
    <div>
      {value?.map((v) => (
        <Player key={v.id} id={v.id} name={v.name} />
      ))}
    </div>
  );
};

export default PlayerList;
