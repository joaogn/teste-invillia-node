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
const Tournament_1 = __importDefault(require("../models/Tournament"));
const User_1 = __importDefault(require("../models/User"));
class TournamentController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const isOrganizer = yield User_1.default.findOne({
                where: { id: req.userId, organizer: true },
            });
            if (!isOrganizer) {
                return res
                    .status(401)
                    .json({ error: 'You can only create tournament with organizer' });
            }
            const tournamentExist = yield Tournament_1.default.findOne({
                where: { name: data.name },
            });
            if (tournamentExist) {
                return res.status(400).json({ error: 'Tournament already exists.' });
            }
            const { id, name } = yield Tournament_1.default.create(data);
            return res.status(200).json({ id, name });
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tournaments = yield Tournament_1.default.findAll({
                attributes: ['id', 'name'],
            });
            return res.status(200).json(tournaments);
        });
    }
}
exports.default = new TournamentController();
