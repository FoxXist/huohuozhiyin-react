export interface IPlayerCardProps {
  avatar?: string;
  userName?: string;
  name?: string;
  number?: number;
  id: string;
  rating: number;
  city: string;
}

const PlayerCard = (props: IPlayerCardProps) => {
  const { avatar, number, name } = props

  return (
    <div className="bg-white text-gray-900 rounded-xl shadow-md overflow-hidden flex items-center gap-4 p-4 hover:shadow-lg transition-shadow duration-200">
      <img
        src={avatar || "/default-avatar.png"}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-gray-500">#{number || "N/A"}</div>
      </div>
    </div>
  );
}

export default PlayerCard;