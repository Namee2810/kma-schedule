const jwt = require("jsonwebtoken");
function authenticateToken(token) {
  let dataSchedule = "";
  jwt.verify(token, process.env.REACT_APP_SECRET_KEY, (err, decoded) => {
    dataSchedule = decoded
  });
  return dataSchedule
};
export default authenticateToken;