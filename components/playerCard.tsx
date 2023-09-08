import { faker } from "@faker-js/faker";
import { Smile } from "lucide-react";

interface PlayerCardProps {
  name: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ name }) => {
  const randomColor = faker.color.rgb();

  const smileStyle = {
    color: randomColor,
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center justify-center h-16 w-16">
      <Smile className="text-2xl mb-1" style={smileStyle} />
      <p className="text-gray-800 text-sm">{name}</p>
    </div>
  );
};

export default PlayerCard;
