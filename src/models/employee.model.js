import bcrypt from "bcrypt";

export default (sequelize, Sequelize) => {
  const Employee = sequelize.define(
    "employee",
    {
      firstname: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      username: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
      },
      nickName: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      telNumber: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      position: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      birthDate: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      age: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      statusActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          {
            user.password =
              user.password && user.password !== ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
          }
          {
            user.approvalPassword =
              user.approvalPassword && user.approvalPassword !== ""
                ? bcrypt.hashSync(user.approvalPassword, 10)
                : "";
          }
        },
        beforeUpdate: (user, options) => {
          {
            user.password =
              user.password && user.password !== ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
          }
        },
      },
    }
  );

  return Employee;
};
