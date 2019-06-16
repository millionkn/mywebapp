let table = [1, 2, 3].map((i) => {
  return {
    id: i,
    username: `username${i}`,
    personName: `真实姓名${i}`,
    office: i,
    role: i,
  }
});
table.push({
  id: 4,
  username: "username4",
  personName: "真实姓名4",
  office: 0,
  role: 0,
});
module.exports = {
  role: ["未审核", "超管", "管理员", "员工"],
  office: ["无", "科室A", "科室B", "检修科"],
  table
}