import db from "~/models";

const Content = db.Content;
const Op = db.Sequelize.Op;

const create = async (req, res) => {
  try {
    const payload = req.body;

    Content.create(payload).then((result) => {
      res.send({
        response_code: "200",
        response_status: "SUCCESS",
        data: result,
        message: "Employee is created",
      });
    });
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
      let pagination = {};

      Object.keys(req.query).forEach((key) => {
        if (key.toString() !== "limit" && key.toString() !== "offset") {
          if (key === "lang") {
            lang = req.query[key];
            return;
          }
          where[key] = req.query[key];
        }

        if (key.toString() === "limit") {
          pagination = {
            ...pagination,
            [key]: parseInt(req.query[key]),
          };
        }

        if (key.toString() === "offset") {
          pagination = {
            ...pagination,
            [key]: parseInt(req.query[key]),
          };
        }
      });

      Content.findAndCountAll({
        where,
        include: { all: true, nested: true },
        offset: pagination.offset,
        limit: pagination.limit,
        order: [["createdAt", "DESC"]],
      }).then(async (result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          pagination: {
            length: result.count,
            size: await calPagination(result.count, 12),
          },
          data: result.rows,
        });
      });
    } else {
      Content.findAndCountAll({
        include: { all: true, nested: true },
        order: [["createdAt", "DESC"]],
      }).then(async (result) => {
        res.send({
          response_code: "200",
          response_status: "SUCCESS",
          pagination: {
            length: result.count,
            size: await calPagination(result.count, 12),
          },
          data: result.rows,
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

const findOne = async (req, res) => {
  try {
    const id = req.params.id;

    Content.findOne({
      where: { id },
      include: { all: true, nested: true },
    }).then((result) => {
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

const findOneByPath = async (req, res) => {
  try {
    const path = req.params.path;

    Content.findOne({
      where: { path: path },
      include: { all: true, nested: true },
    }).then((result) => {
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

    Content.update(req.body, { where: { id } }).then((result) => {
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
    Content.destroy({ where: { id } }).then((result) => {
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

const calPagination = async (length, rowPerPage) => {
  return Math.round(length / rowPerPage);
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
  findOneByPath,
  remove,
};
