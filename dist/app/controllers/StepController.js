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
const Step_1 = __importDefault(require("../models/Step"));
const Tournament_1 = __importDefault(require("../models/Tournament"));
const User_1 = __importDefault(require("../models/User"));
class StepController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const isOrganizer = yield User_1.default.findOne({
                where: { id: req.userId, organizer: true },
            });
            if (!isOrganizer) {
                return res
                    .status(401)
                    .json({ error: 'You can only create step with organizer' });
            }
            const tournamentExist = yield Tournament_1.default.findByPk(data.tournament_id);
            if (!tournamentExist) {
                return res.status(400).json({ error: 'This tournament not exists.' });
            }
            const stepExist = yield Step_1.default.findOne({
                where: { name: data.name, tournament_id: data.tournament_id },
            });
            if (stepExist) {
                return res.status(400).json({ error: 'Step already exists.' });
            }
            const { id, name, tournament_id } = yield Step_1.default.create(data);
            return res.status(200).json({ id, name, tournament_id });
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tournamentId } = req.params;
            const tournamentExist = yield Tournament_1.default.findByPk(tournamentId);
            if (!tournamentExist) {
                return res.status(400).json({ error: 'This tournament not exists.' });
            }
            const steps = yield Step_1.default.findAll({
                where: { tournament_id: tournamentId },
                include: [
                    {
                        model: Tournament_1.default,
                        as: 'tournament',
                        attributes: ['name'],
                    },
                ],
            });
            return res
                .status(200)
                .json(steps.map(({ id, name, tournament }) => ({ id, name, tournament })));
        });
    }
}
exports.default = new StepController();
