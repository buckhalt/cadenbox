import { Button } from "./ui/button";

interface GameCodeProps {
  code: string;
}

const GameCode: React.FC<GameCodeProps> = ({ code }) => {
  return <Button variant="secondary">{code}</Button>;
};

export default GameCode;
