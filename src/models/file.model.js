export default (sequelize, Sequelize) => {
  const File = sequelize.define("file", {
    type: {
      type: Sequelize.STRING,
      required: true,
    },
    size: {
      type: Sequelize.DOUBLE,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    path: {
      type: Sequelize.STRING,
      required: true,
    },
    activeFlag: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return File;
};
