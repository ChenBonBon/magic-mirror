export enum StyleModel {
  // 男孩 11；女孩 12；男士：13；女士：10
  Girl = 12,
  Boy = 11,
  Woman = 10,
  Man = 13,
}

export interface Style {
  imageUrl: string;
  index: number;
  style: string;
  name: string;
}
