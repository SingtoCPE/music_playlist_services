export default (sequelize, Sequelize) => {
  const Music = sequelize.define("music", {
    title: {
      type: Sequelize.STRING,
    },
    artist: {
      type: Sequelize.STRING,
    },
    album: {
      type: Sequelize.STRING,
    },
    length: {
      type: Sequelize.INTEGER,
    },
    activeFlag: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Music;
};
