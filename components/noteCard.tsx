interface NoteCardProps {
  note: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="bg-secondary p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
      <p className="text-secondary-foreground text-sm">{note}</p>
    </div>
  );
};

export default NoteCard;
