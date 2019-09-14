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
class PositionController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const { stepId } = req.params;
            const stepExist = yield Step_1.default.findByPk(stepId);
            if (!stepExist) {
                return res.status(400).json({ error: 'This step not exists.' });
            }
            const isOrganizer = yield User_1.default.findOne({
                where: { id: req.userId, organizer: true },
            });
            if (!isOrganizer) {
                return res
                    .status(401)
                    .json({ error: 'You can only create positions with organizer' });
            }
            const stepPositionsExist = yield Position_1.default.findOne({
                where: { step_id: stepId },
            });
            if (stepPositionsExist) {
                return res
                    .status(400)
                    .json({ error: 'Positions for this step already exists.' });
            }
            let userExist = true;
            const verifyUserExist = data.map((item) => __awaiter(this, void 0, void 0, function* () {
                const user = yield User_1.default.findByPk(item.user_id);
                if (!user) {
                    userExist = false;
                }
            }));
            yield Promise.all(verifyUserExist);
            if (!userExist) {
                return res.status(400).json({ error: 'Some user does not exist' });
            }
            const createPositions = data.map((item) => __awaiter(this, void 0, void 0, function* () {
                const { user_id, step_id, position } = yield Position_1.default.create({
                    user_id: item.user_id,
                    step_id: Number(stepId),
                    position: item.position,
                });
                return { user_id, step_id, position };
            }));
            const result = yield Promise.all(createPositions);
            return res.status(200).json(result);
        });
    }
}
exports.default = new PositionController();
