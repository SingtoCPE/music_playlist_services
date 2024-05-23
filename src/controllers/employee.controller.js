import db from "~/models";
import jwt from "jsonwebtoken";
import hash from "../config/hash";
import bcrypt from "bcrypt";

const Employee = db.Employee;
const Op = db.Sequelize.Op;

const create = async (req, res) => {
  try {
    const payload = req.body;

    const dupUsername = await Employee.findOne({
      where: { username: payload.username },
    });

    if (dupUsername) {
      res.send({
        response_status: "ERROR",
        message: "Duplicate username",
      });
    } else {
      Employee.create(payload).then((result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          data: result,
          message: "Employee is created",
        });
      });
    }
  } catch (error) {
    res.send({
      response_status: "ERROR",
      message:
        error.message || "Some error occurred while creating the employee.",
    });
  }
};

const findAll = async (req, res) => {
  try {
    if (Object.keys(req.query).length > 0) {
      const where = {};
      Object.keys(req.query).forEach((key) => {
        if (key === "lang") {
          lang = req.query[key];
          return;
        }
        where[key] = req.query[key];
      });

      Employee.findAll({
        order: [["createdAt", "DESC"]],
        where,
      }).then((result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          data: result,
        });
      });
    } else {
      Employee.findAll().then((result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          data: result,
        });
      });
    }
  } catch (error) {
    res.send({
      response_status: "ERROR",
      message:
        error.message || "Some error occurred while fetching the employee.",
    });
  }
};

const login = async (req, res) => {
  const { username, telNumber } = req.body;

  try {
    const foundEmployee = await Employee.findOne({
      where: {
        username: username,
      },
    });
    if (foundEmployee) {
      bcrypt
        .compare(telNumber, foundEmployee.dataValues.password)
        .then((result) => {
          if (result) {
            delete foundEmployee.dataValues.password;
            const token = jwt.sign(foundEmployee.dataValues, hash.jwtSecret);
            res.send({
              response_status: "SUCCESS",
              data: {
                user: foundEmployee.dataValues,
                token,
              },
            });
          } else {
            res.send({
              response_status: "ERROR",
              message: "Employee is not define",
            });
          }
        });
    } else {
      res.send({
        response_status: "ERROR",
        message: "Employee is not define",
      });
    }
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message: err.message || "Some error occurred while logging in.",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;

    Employee.findOne({ where: { id } }).then((result) => {
      res.send({
        response_code: "200",
        response_status: "SUCCESS",
        data: result,
      });
    });
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message:
        err.message || "Some error occurred while retrieving the employee.",
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    Employee.update(req.body, { where: { id } }).then((result) => {
      if (result[0] === 1) {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          message: "Employee is updated",
        });
      } else {
        res.send({
          response_code: "111",
          response_status: "ERROR",
          message: "Update failed",
        });
      }
    });
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message:
        err.message || "Some error occurred while updating the employee.",
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    Employee.destroy({ where: { id } }).then((result) => {
      if (result === 1) {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          message: "Employee is deleted",
        });
      } else {
        res.send({
          response_code: "111",
          response_status: "ERROR",
          message: "Delete failed",
        });
      }
    });
  } catch (err) {
    res.send({
      response_status: "ERROR",
      message:
        err.message || "Some error occurred while deleting the employee.",
    });
  }
};

function pad_with_zeroes(number, lenght) {
  var my_string = "" + number;
  while (my_string.length < lenght) {
    my_string = "0" + my_string;
  }
  my_string = "88" + my_string;

  return my_string;
}

export default {
  create,
  findAll,
  update,
  findOne,
  remove,
  login,
};
