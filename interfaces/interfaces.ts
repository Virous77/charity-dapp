export interface ICharity {
  amount: BigInt;
  banned: boolean;
  deleted: boolean;
  description: string;
  donations: BigInt;
  id: BigInt;
  fullName: string;
  image: string;
  name: string;
  owner: string;
  profile: string;
  raised: BigInt;
  timestamp: BigInt;
}

export interface ICharitySupport {
  amount: BigInt;
  cid: BigInt;
  id: BigInt;
  supporter: string;
  timestamp: number;
  comment: string;
  fullname: string;
}
