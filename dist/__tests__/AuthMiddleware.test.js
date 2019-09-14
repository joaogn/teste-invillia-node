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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../app/models/User"));
const defaultUser = {
    name: 'default User',
    email: 'default@default.com',
    password: '123456',
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.destroy({ truncate: true });
    yield User_1.default.create(defaultUser);
}));
describe('Auth test using Get /users', () => {
    it("should return { error: 'Token not provided' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/users')
            .set('Content-Type', 'application/json');
        expect(response.body).toEqual({ error: 'Token not provided' });
    }));
    it("should return { error: 'Invalid token' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer aaaaaaaaaaaaaaaa`);
        expect(response.body).toEqual({ error: 'Invalid token' });
    }));
});
