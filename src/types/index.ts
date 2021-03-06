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
  inspectionTimes: Turnaround;
  line: Turnaround;
  extra: string;
};
export type Log = {
  id: number;
  personId: Person['id'];
  date: TimeStamp;
  driverId: Driver['id'];
  extra: string;
}