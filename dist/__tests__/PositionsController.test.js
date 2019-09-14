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
const Position_1 = __importDefault(require("../app/models/Position"));
const auth_1 = __importDefault(require("../config/auth"));
let token = '';
const defaultUser = {
    id: 1,
    name: 'default User',
    email: 'default@default.com',
    password: '123456',
    organizer: true,
};
const defaultUser2 = {
    id: 2,
    name: 'default User 2',
    email: 'default2@default2.com',
    password: '123456',
    organizer: true,
};
const defaultTournament = {
    id: 1,
    name: 'default Tournament',
};
const defaultStep = {
    id: 1,
    name: 'default Step',
    tournament_id: defaultTournament.id,
};
const defaultStep2 = {
    id: 2,
    name: 'default Step2',
    tournament_id: defaultTournament.id,
};
const defaultPositions = [
    {
        user_id: defaultUser.id,
        position: 1,
    },
    {
        user_id: defaultUser2.id,
        position: 2,
    },
];
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
    yield User_1.default.create(defaultUser2);
    yield Tournament_1.default.create(defaultTournament);
    yield Step_1.default.create(defaultStep);
    yield Step_1.default.create(defaultStep2);
    const createPositions = defaultPositions.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, step_id, position } = yield Position_1.default.create({
            user_id: item.user_id,
            step_id: defaultStep.id,
            position: item.position,
        });
        return { user_id, step_id, position };
    }));
    yield Promise.all(createPositions);
}));
describe('POST /positions/:stepId', () => {
    it('should return new tournament', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep2.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(defaultPositions);
        expect(response.body[0].user_id).toEqual(defaultPositions[0].user_id);
        expect(response.body[0].position).toEqual(defaultPositions[0].position);
        expect(response.body[1].user_id).toEqual(defaultPositions[1].user_id);
        expect(response.body[1].position).toEqual(defaultPositions[1].position);
    }));
    it("should return { error: 'You can only create positions with organizer' }", () => __awaiter(void 0, void 0, void 0, function* () {
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
            .post(`/positions/${defaultStep.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${playerToken}`)
            .send(defaultPositions);
        expect(response.body).toEqual({
            error: 'You can only create positions with organizer',
        });
    }));
    it("should return { error: 'This step not exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/positions/100')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(defaultPositions);
        expect(response.body).toEqual({
            error: 'This step not exists.',
        });
    }));
    it("should return { error: 'Positions for this step already exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(defaultPositions);
        expect(response.body).toEqual({
            error: 'Positions for this step already exists.',
        });
    }));
    it("should return { error: 'Some user does not exist' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPositions = [
            {
                user_id: defaultUser.id,
                position: 1,
            },
            {
                user_id: defaultUser2.id,
                position: 2,
            },
            {
                user_id: 3,
                position: 3,
            },
        ];
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep2.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newPositions);
        expect(response.body).toEqual({
            error: 'Some user does not exist',
        });
    }));
    it("should return { error: 'User is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPositions = [
            {
                position: 1,
            },
            {
                user_id: defaultUser2.id,
                position: 2,
            },
        ];
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newPositions);
        expect(response.body).toEqual({
            error: 'User is Required',
        });
    }));
    it("should return { error: 'Position is Required' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPositions = [
            {
                user_id: defaultUser.id,
            },
            {
                user_id: defaultUser2.id,
                position: 2,
            },
        ];
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newPositions);
        expect(response.body).toEqual({
            error: 'Position is Required',
        });
    }));
    it("should return { error: 'Position is repeated' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPositions = [
            {
                user_id: defaultUser.id,
                position: 1,
            },
            {
                user_id: defaultUser2.id,
                position: 1,
            },
        ];
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newPositions);
        expect(response.body).toEqual({
            error: 'Position is repeated',
        });
    }));
    it("should return { error: 'User is repeated' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPositions = [
            {
                user_id: defaultUser.id,
                position: 1,
            },
            {
                user_id: defaultUser.id,
                position: 2,
            },
        ];
        const response = yield supertest_1.default(app_1.default)
            .post(`/positions/${defaultStep.id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newPositions);
        expect(response.body).toEqual({
            error: 'User is repeated',
        });
    }));
    it("should return { error: 'Params stepId need to be number' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .post('/positions/a')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(defaultPositions);
        expect(response.body).toEqual({
            error: 'Params stepId need to be number',
        });
    }));
});
