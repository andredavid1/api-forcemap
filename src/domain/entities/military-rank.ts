export type MilitaryRankProps = {
  abbreviation: string;
  order: number;
};

export type MilitaryRank = MilitaryRankProps & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};
