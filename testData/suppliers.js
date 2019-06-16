module.exports = [1, 2, 3, 4, 5].map((i) => {
  return {
    id: i,
    name: `经销商${i}`,
    businessLicense: `营业执照${i}`,
    medicalDeviceBusinessLicense: `医疗器械经营许可证编号${i}`,
  };
})