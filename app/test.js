function isIP(ip) {
  const ipArr = ip.split(".");
  if (ipArr.length !== 4) {
    return false;
  } else if (ipArr.some((v) => isNaN(+v) || +v < 0 || +v > 255)) {
    return false;
  }
  return true;
}
console.log("====================================");
console.log(
  isIP("1922.168.31.1191"),
  isIP("1922.168.311191.2"),
  isIP("1922.22.31")
);
console.log("====================================");
