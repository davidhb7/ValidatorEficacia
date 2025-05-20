import { UserI } from "./user";

export interface ApiResponse {
  status: string;
  result: UserI[];
  count: number;
}