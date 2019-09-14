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
const Tournament_1 = __importDefault(require("../app/models/Tournament"));
const Step_1 = __importDefault(require("../app/models/Step"));
const Position_1 = __importDefault(require("../app/models/Position"));
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
    yield User_1.default.create(defaultUser);
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
    const createPositions2 = defaultPositions.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const { user_id, step_id, position } = yield Position_1.default.create({
            user_id: item.user_id,
            step_id: defaultStep2.id,
            position: item.position,
        });
        return { user_id, step_id, position };
    }));
    yield Promise.all([createPositions, createPositions2]);
}));
describe('GET /tournamentrank/:tournamentId', () => {
    it('should step ranking', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get(`/tournamentrank/${defaultTournament.id}`)
            .set('Content-Type', 'application/json');
        expect(response.body.tournament).toEqual(defaultTournament.name);
        expect(response.body.steps).toEqual([defaultStep.name, defaultStep2.name]);
        expect(response.body.ranking[0].name).toEqual(defaultUser.name);
        expect(response.body.ranking[0].position).toEqual(defaultPositions[0].position);
        expect(response.body.ranking[0].points).toEqual(4);
        expect(response.body.ranking[1].name).toEqual(defaultUser2.name);
        expect(response.body.ranking[1].position).toEqual(defaultPositions[1].position);
        expect(response.body.ranking[1].points).toEqual(2);
    }));
    it("should return { error: 'This tournament not exists.' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get(`/tournamentrank/100`)
            .set('Content-Type', 'application/json');
        expect(response.body).toEqual({
            error: 'This tournament not exists.',
        });
    }));
    it("should return { error: 'Params tournamentId need to be number' }", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(app_1.default)
            .get(`/tournamentrank/a`)
            .set('Content-Type', 'application/json');
        expect(response.body).toEqual({
            error: 'Params tournamentId need to be number',
        });
    }));
});
