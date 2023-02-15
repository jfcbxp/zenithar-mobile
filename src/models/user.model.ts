import { UserBranch } from "./user.branch.model";
import { UserLogs } from "./user.logs.model";

export interface User {
  uid: string;
  fullName: string;
  company?: string;
  department?: string;
  verified: boolean;
  branches?: UserBranch[];
  logs?: UserLogs[];
  portrait: string;
  discountLimit: number;
}
