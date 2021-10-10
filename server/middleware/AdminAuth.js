import jwt from "jsonwebtoken";

const AdminAuth = async (req, res, next) => {
  if (req.body.user?.role === "admin") {
    try {
      const token = req.get("x-auth-token");
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, "ACCESS_TOKEN_SECRET");

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;
      }
    } catch (error) {
      // token can be expired or invalid. Send appropriate errors in each case:
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Session timed out,please login again" });
      } else if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ error: "Invalid token,please login again!" });
      } else {
        //catch other unprecedented errors
        console.error(error);
        return res.status(400).json({ error });
      }
    }
  } else {
    return res.json({ message: "User access denied" });
  }
  next();
};

export default AdminAuth;
