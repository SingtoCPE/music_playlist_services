import bcrypt from "bcrypt";

export default (sequelize, Sequelize) => {
  const Content = sequelize.define("content", {
    title: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    imageTitle: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    author: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    contentType: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    content: {
      type: Sequelize.TEXT("long"),
    },
    path: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    country: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    adultPrice: {
      type: Sequelize.INTEGER,
    },
    childPrice: {
      type: Sequelize.INTEGER,
    },
    statusActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Content;
};
