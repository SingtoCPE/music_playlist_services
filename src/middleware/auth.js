import hash from "~/config/hash";
import jwt from "jsonwebtoken";
import db from "~/models";

const Employee = db.Employee;

export default async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, hash.jwtSecret);
      const id = decodedToken.id;
      const foundUser = await Employee.findOne({ where: { id } });

      req.user = foundUser.dataValues;

      if (!foundUser) {
        throw "Invalid token";
      } else {
        next();
      }
    } catch (err) {
      res.status(401).json({
        message: err,
      });
    }
  }
};
