interface GameCodeProps {
  code: string;
}

const GameCode: React.FC<GameCodeProps> = ({ code }) => {
  return (
    <div className="bg-secondary w-24 p-2 rounded-lg flex flex-col items-center justify-center">
      <p className="text-secondary-foreground text-sm">Code: </p>
      <p className="text-secondary-foreground text-md">{code}</p>
    </div>
  );
};

export default GameCode;
