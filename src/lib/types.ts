
export type Delneveshte = {
  id: string;
  firstName: string;
  lastName: string;
  message: string;
  submissionDate: string;
  approved: boolean;
  approvalDate?: string;
  adminId?: string;
};

export type Admin = {
  id: string;
  username: string;
};
