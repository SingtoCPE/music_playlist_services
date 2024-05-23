export default (sequelize, Sequelize) => {
  const Music = sequelize.define("music", {
    title: {
      type: Sequelize.STRING,
    },
    artist: {
      type: Sequelize.DOUBLE,
    },
    album: {
      type: Sequelize.STRING,
    },
    activeFlag: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Music;
};
