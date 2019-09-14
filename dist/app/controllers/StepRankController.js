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
const User_1 = __importDefault(require("../models/User"));
const Step_1 = __importDefault(require("../models/Step"));
const Tournament_1 = __importDefault(require("../models/Tournament"));
class StepRankController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stepId } = req.params;
            const stepInfo = yield Step_1.default.findByPk(stepId, {
                include: [
                    {
                        model: Tournament_1.default,
                        as: 'tournament',
                        attributes: ['name'],
                    },
                ],
            });
            if (!stepInfo) {
                return res.status(400).json({ error: 'This step not exists.' });
            }
            const positions = yield Position_1.default.findAll({
                where: { step_id: stepId },
                include: [
                    {
                        model: User_1.default,
                        as: 'user',
                        attributes: ['name'],
                    },
                ],
            });
            const ranking = positions.map((position, index) => {
                const data = {
                    position: position.position,
                    name: position.user.name,
                    points: positions.length - index,
                };
                return data;
            });
            const result = {
                tournament: stepInfo.tournament.name,
                step: stepInfo.name,
                ranking,
            };
            return res.status(200).json(result);
        });
    }
}
exports.default = new StepRankController();
