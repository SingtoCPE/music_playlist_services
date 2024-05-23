import fs from "fs";
// import fileType from "file-type";
import moment from "moment";

import db from "~/models";
import getRandomNumber from "~/utils/getRandomNumber";

const File = db.File;
const Op = db.Sequelize.Op;

const uploadFormData = async (req, res) => {
  let sampleFile;
  let uploadPath;
  sampleFile = req.files.file;

  const { type, name, size } = req.body;

  // await checkDupFile({ productId: productId });

  const namePath = `${moment(new Date()).format(
    "YY-MM-DD-HH-mm-ss"
    // )}-${size}-${productId}.${req.files.file.mimetype.split("/")[1]}`;
  )}-${size}.${req.files.file.mimetype.split("/")[1]}`;
  uploadPath = `public/${namePath}`;
  const fileRes = await File.create({
    type: type,
    name: name,
    size: size,

    // productId: productId ? productId : null,
    path: `/${namePath}`,
  });
  await sampleFile.mv(uploadPath, async (err) => {
    if (err) {
      return res.send({
        response_status: "ERROR",
        message:
          err.message || "Some error occurred while retrieving the files.",
      });
    }
    res.send({
      response_status: "SUCCESS",
      message: "File was uploaded successfully",
      data: fileRes,
    });
  });
};

const checkDupFile = async (item) => {
  const newItem = item;

  const res = await File.findAll({ where: newItem });

  if (res.length > 0) {
    await File.destroy({ where: newItem });
    fs.unlink(`public/${res[0].dataValues.path}`, (err) => {
      if (err) {
        throw err;
      }

      console.log("Delete Duplicate File successfully.");
    });
  } else {
    console.log("No duplicate files.");
  }
};

const uploadBase64 = async (req, res) => {
  let sampleFile;
  let uploadPath;
  const { user } = req;
  const { type, file } = req.body;
  if (!file) {
    return res.send({
      response_status: "ERROR",
      message: err.message || "No files were uploaded.",
    });
  }
  let base64File = file.split(";base64,").pop();
  const fileBitMap = new Buffer(base64File, "base64");
  let mime = await fileType.fromBuffer(fileBitMap);
  const name = `${getRandomNumber(99999)}-${getRandomNumber(99999)}.${
    mime.ext
  }`;
  const filePath = `public/${type}/${type}-${name}`;
  fs.writeFileSync(filePath, fileBitMap);
  const fileRes = await File.create({
    type,
    name,
    path: `/${type}/${type}-${name}`,
  });
  res.send({
    response_status: "SUCCESS",
    data: fileRes.dataValues,
    message: "File was uploaded successfully",
  });
};

const remove = async (req, res) => {
  const newItem = req.body;
  const response = await File.destroy({ where: { id: newItem.id } });
  if (response === 1) {
    fs.unlink(`public/${newItem.path}`, (err) => {
      if (err) {
        res.send({
          response_status: "ERROR",
          message: err,
        });
        throw err;
      } else {
        res.send({
          response_status: "SUCCESS",
          message: "File was deleted successfully",
        });
      }
    });
  } else {
    res.send({
      response_status: "ERROR",
      message: `Log (ID: ${newItem.path}) was not found.`,
    });
  }
};

export default {
  uploadFormData,
  uploadBase64,
  remove,
};
