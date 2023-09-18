import React from "react";

interface SongCardProps {
  trackData: any;
}

const SongCard: React.FC<SongCardProps> = ({ trackData }) => {
  return (
    <div className="bg-background p-2 rounded-lg shadow-md flex flex-col justify-center">
      <div className="flex items-center">
        <img
          src={trackData.album.images[0].url}
          alt={`${name} Album Cover`}
          className="w-16 h-16 mr-2"
        />
        <div>
          <p className="text-foreground text-base font-semibold">
            {trackData.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {trackData.artists[0].name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
