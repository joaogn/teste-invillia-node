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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const app_1 = __importDefault(require("../app"));
const User_1 = __importDefault(require("../app/models/User"));
const auth_1 = __importDefault(require("../config/auth"));
let token = '';
const defaultUser = {
    name: 'default User',
    email: 'default@default.com',
    password: '123456',
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.destroy({ truncate: true });
    const user = yield User_1.default.create(defaultUser);
    const payload = { id: user.id };
    token = jsonwebtoken_1.default.sign(payload, auth_1.default.secret, {
        // tempo de expiração do token
        expiresIn: 300,
    });
}));
describe('POST /sessions', () => {
    it('should return token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/sessions')
            .set('Content-Type', 'application/json')
            .send(defaultUser);
        const decodedOldToken = yield util_1.promisify(jsonwebtoken_1.default.verify)(token, auth_1.default.secret);
        const decodedNewToken = yield util_1.promisify(jsonwebtoken_1.default.verify)(response.body.token, auth_1.default.secret);
        expect(decodedOldToken.id).toEqual(decodedNewToken.id);
    }));
    it("should return { error: 'Email is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/sessions')
            .set('Content-Type', 'application/json')
            .send({ password: defaultUser.password });
        expect(response.body).toEqual({ error: 'Email is Required' });
    }));
    it("should return { error: 'Password is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/sessions')
            .set('Content-Type', 'application/json')
            .send({ email: defaultUser.email });
        expect(response.body).toEqual({ error: 'Password is Required' });
    }));
    it("should return { error: 'User not found' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/sessions')
            .set('Content-Type', 'application/json')
            .send({ email: 'rando@randon.com', password: 'randon' });
        expect(response.body).toEqual({ error: 'User not found' });
    }));
    it("should return { error: 'Password does not match' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/sessions')
            .set('Content-Type', 'application/json')
            .send({ email: defaultUser.email, password: 'randon' });
        expect(response.body).toEqual({ error: 'Password does not match' });
    }));
});
