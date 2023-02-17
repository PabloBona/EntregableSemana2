const Repair = require("./repairs.models");
const User = require("./users.model");

//Realizamos las relaciones
const initModel = () => {
    User.hasMany(Repair);
    Repair.belongsTo(User);
};

module.exports = initModel;

