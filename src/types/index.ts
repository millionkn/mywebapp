export type User = {
  username: string,
  password: string,
}
export type Supplier = Record<
  "name" | "businessLicense" | "medicalDeviceBusinessLicense",
  string
> & { id: number };
export type Person = {
  id: number;
  username: string;
  name: string;
  officeId: Office['id'];
  roleId: Role['id'];
};
export type Office = {
  id: number,
  name: string,
  personId: Person['id']
};
export type Role = {
  id: number;
  name: string;
};
type TimeStamp = number;
type Turnaround = number;
export type Driver = {
  id: number;
  officeId: Office['id'];
  name: string;
  buyDate: TimeStamp;
  lastCheck: TimeStamp;
  inspectionTimes: Turnaround;
  line: Turnaround;
};