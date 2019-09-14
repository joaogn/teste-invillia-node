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
const Tournament_1 = __importDefault(require("./Tournament"));
class Step extends sequelize_1.Model {
}
Step.init({
    name: sequelize_1.default.STRING,
}, {
    tableName: 'steps',
    sequelize: database_1.default,
});
Step.belongsTo(Tournament_1.default, { foreignKey: 'tournament_id', as: 'tournament' });
exports.default = Step;
