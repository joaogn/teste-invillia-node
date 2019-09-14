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
describe('POST /users', () => {
    it('should return new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'New User',
            email: 'new@new.com',
            password: '123456',
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(newUser);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(newUser.name);
        expect(response.body.email).toEqual(newUser.email);
    }));
    it("should return { error: 'User already exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(defaultUser);
        expect(response.body).toEqual({ error: 'User already exists.' });
    }));
    it("should return { error: 'Name is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            email: 'new@new.com',
            password: '123456',
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(newUser);
        expect(response.body).toEqual({ error: 'Name is Required' });
    }));
    it("should return { error: 'Email is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'New User',
            password: '123456',
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(newUser);
        expect(response.body).toEqual({ error: 'Email is Required' });
    }));
    it("should return { error: 'Password is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: 'New User',
            email: 'new@new.com',
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/users')
            .set('Content-Type', 'application/json')
            .send(newUser);
        expect(response.body).toEqual({ error: 'Password is Required' });
    }));
});
describe('Get /users', () => {
    it('should return users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/users')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual(defaultUser.name);
        expect(response.body[0].email).toEqual(defaultUser.email);
    }));
});
