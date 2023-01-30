import { UserBranch } from "./user.branch.model";
import { UserLogs } from "./user.logs.model";

export interface User {
  fullName: string;
  uid: string;
  email: string;
  portrait: string;
  company: string;
  department: string;
  verified: boolean;
  branches: UserBranch[];
  logs: UserLogs[];
}
