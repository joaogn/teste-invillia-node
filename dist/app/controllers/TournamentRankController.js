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
const Position_1 = __importDefault(require("../models/Position"));
const Step_1 = __importDefault(require("../models/Step"));
const User_1 = __importDefault(require("../models/User"));
const Tournament_1 = __importDefault(require("../models/Tournament"));
class TournamentRankController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const points = [];
            const { tournamentId } = req.params;
            const tournament = yield Tournament_1.default.findByPk(tournamentId);
            if (!tournament) {
                return res.status(400).json({ error: 'This tournament not exists.' });
            }
            const steps = yield Step_1.default.findAll({
                where: { tournament_id: tournamentId },
                attributes: ['id', 'name'],
            });
            const stepsPoints = steps.map((item) => __awaiter(this, void 0, void 0, function* () {
                const positions = yield Position_1.default.findAll({
                    where: { step_id: item.id },
                    include: [
                        {
                            model: User_1.default,
                            as: 'user',
                            attributes: ['name'],
                        },
                    ],
                });
                const result = positions.map((position, index) => {
                    const data = {
                        position: position.position,
                        name: position.user.name,
                        points: positions.length - index,
                    };
                    return data;
                });
                points.push(...result);
            }));
            yield Promise.all(stepsPoints);
            const totalPoints = points.reduce((prev, cur) => {
                prev[cur.name] = (prev[cur.name] || 0) + cur.points;
                return prev;
            }, {});
            const ranking = Object.entries(totalPoints)
                .map(([key, value]) => {
                const data = {
                    name: key,
                    points: value,
                };
                return data;
            })
                .sort((a, b) => {
                return Number(a.points < b.points);
            })
                .map((item, index) => {
                const data = Object.assign({ position: index + 1 }, item);
                return data;
            });
            const result = {
                tournament: tournament.name,
                steps: steps.map(step => step.name),
                ranking,
            };
            return res.status(200).json(result);
        });
    }
}
exports.default = new TournamentRankController();
