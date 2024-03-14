import { IUserAdmin } from "../../../6.shared";
import { ITransaction } from "../../Transaction/types";

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  phone: string | null;
  card: null | string;
  about: string;
  collected: number;
  verified: number;
  paid: number;
  penalty: number;
  mock_cheating: number;
  public_cheating: number;
}

export interface IUserItem extends IUserAdmin {
  score: IScore;
  transaction: ITransaction[];
}

interface IScore {
  about: string;
  blocked: boolean;
  card: null | string;
  collected: number;
  created_at: Date;
  id: number;
  is_active: boolean;
  mock_cheating: number;
  paid: number;
  penalty: number;
  phone: null | string;
  public_cheating: number;
  verified: number;
}
