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
const Tournament_1 = __importDefault(require("../app/models/Tournament"));
const Step_1 = __importDefault(require("../app/models/Step"));
const auth_1 = __importDefault(require("../config/auth"));
let token = '';
const defaultUser = {
    name: 'default User',
    email: 'default@default.com',
    password: '123456',
    organizer: true,
};
const defaultTournament = {
    id: 1,
    name: 'default Tournament',
};
const defaultStep = {
    name: 'default Step',
    tournament_id: defaultTournament.id,
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.destroy({ truncate: true });
    yield Tournament_1.default.destroy({ truncate: true });
    yield Step_1.default.destroy({ truncate: true });
    const user = yield User_1.default.create(defaultUser);
    const payload = { id: user.id };
    token = jsonwebtoken_1.default.sign(payload, auth_1.default.secret, {
        // tempo de expiração do token
        expiresIn: 300,
    });
    yield Tournament_1.default.create(defaultTournament);
    yield Step_1.default.create(defaultStep);
}));
describe('POST /steps', () => {
    it('should return new tournament', () => __awaiter(void 0, void 0, void 0, function* () {
        const newStep = {
            name: 'New Step',
            tournament_id: defaultTournament.id,
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/steps')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newStep);
        expect(response.body.name).toEqual(newStep.name);
        expect(response.body.tournament_id).toEqual(newStep.tournament_id);
    }));
    it("should return { error: 'You can only create step with organizer' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const playerUser = {
            name: 'player User',
            email: 'player@player.com',
            password: '123456',
        };
        const user = yield User_1.default.create(playerUser);
        const payload = { id: user.id };
        const playerToken = yield jsonwebtoken_1.default.sign(payload, auth_1.default.secret, {
            // tempo de expiração do token
            expiresIn: 300,
        });
        const response = yield supertest_1.default(app_1.default)
            .post('/steps')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${playerToken}`)
            .send(defaultStep);
        expect(response.body).toEqual({
            error: 'You can only create step with organizer',
        });
    }));
    it("should return { error: 'This tournament not exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newStep = {
            name: 'New Step',
            tournament_id: 5,
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/steps')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newStep);
        expect(response.body).toEqual({
            error: 'This tournament not exists.',
        });
    }));
    it("should return { error: 'Step already exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/steps')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(defaultStep);
        expect(response.body).toEqual({ error: 'Step already exists.' });
    }));
    it("should return { error: 'Name is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newStep = {
            tournament_id: defaultTournament.id,
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/steps')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newStep);
        expect(response.body).toEqual({ error: 'Name is Required' });
    }));
    it("should return { error: 'Tournament is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newStep = {
            name: 'New Step',
        };
        const response = yield supertest_1.default(app_1.default)
            .post('/steps')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newStep);
        expect(response.body).toEqual({ error: 'Tournament is Required' });
    }));
});
describe('Get /steps/:tournamentId', () => {
    it('should return users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get(`/steps/${defaultTournament.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.body[0].name).toEqual(defaultStep.name);
    }));
    it("should return { error: 'Params tournamentId need to be number' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/steps/aaa')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.body).toEqual({
            error: 'Params tournamentId need to be number',
        });
    }));
    it("should return { error: 'This tournament not exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get('/steps/100')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.body).toEqual({
            error: 'This tournament not exists.',
        });
    }));
});
