"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = __importDefault(require("../../database"));
const Step_1 = __importDefault(require("./Step"));
const User_1 = __importDefault(require("./User"));
class Position extends sequelize_1.Model {
}
Position.init({
    position: sequelize_1.default.INTEGER,
}, {
    tableName: 'users_steps',
    sequelize: database_1.default,
});
Step_1.default.hasMany(Position, { foreignKey: 'step_id', as: 'step' });
Position.belongsTo(Step_1.default, { foreignKey: 'step_id', as: 'step' });
User_1.default.hasMany(Position, { foreignKey: 'user_id', as: 'user' });
Position.belongsTo(User_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Position;
