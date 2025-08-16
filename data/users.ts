export type UserRole = "owner" | "employee";

export type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
};

export const users: User[] = [
  {
    id: "1",
    name: "Owner",
    username: "owner",
    password: "owner123",
    role: "owner",
  },
  {
    id: "2",
    name: "Employee",
    username: "pegawai",
    password: "pegawai123",
    role: "employee",
  },
];