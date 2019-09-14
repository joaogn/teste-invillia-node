"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../../database"));
class User extends sequelize_1.Model {
    checkPassword(password) {
        return bcryptjs_1.default.compare(password, this.password_hash);
    }
}
User.init({
    name: sequelize_1.default.STRING,
    email: sequelize_1.default.STRING,
    password: sequelize_1.default.VIRTUAL,
    password_hash: sequelize_1.default.STRING,
    organizer: sequelize_1.default.BOOLEAN,
}, {
    tableName: 'users',
    sequelize: database_1.default,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
User.addHook('beforeCreate', (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.password) {
        user.password_hash = yield bcryptjs_1.default.hash(user.password, 8);
    }
}));
exports.default = User;
