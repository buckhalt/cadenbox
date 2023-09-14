interface Player {
  code: string;
  name: string;
  color: string;
  note: string;
  vote: string;
  points: number;
}

export default function sortPlayersByVotes(allPlayers: Player[]): Player[] {
  allPlayers.sort((playerA, playerB) => playerB.points - playerA.points);
  return allPlayers;
}
