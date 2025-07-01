export interface Order {
  id: string;
  ucPack: string;
  playerId: string;
  loginMethod: string;
  buyerName: string;
  upiNumber: string;
  status: "Pending" | "Delivered";
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
