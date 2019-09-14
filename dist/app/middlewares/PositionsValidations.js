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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
exports.PositionsStoreValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Yup.array()
        .of(Yup.object({
        user_id: Yup.number().required('User is Required'),
        position: Yup.number().required('Position is Required'),
    }))
        .test('position repeat', 'Position is repeated', 
    // o Set não permite valor repetidos, então se tiver valores repetidos
    // o retorno do Set sera menor que o valor do vetor passado
    (value) => new Set(value.map(item => item.position)).size ===
        value.map(item => item.position).length)
        .test('user repeat', 'User is repeated', 
    // o Set não permite valor repetidos, então se tiver valores repetidos
    // o retorno do Set sera menor que o valor do vetor passado
    (value) => new Set(value.map(item => item.user_id)).size ===
        value.map(item => item.user_id).length);
    const paramsSchema = Yup.object().shape({
        stepId: Yup.number().typeError('Params stepId need to be number'),
    });
    schema
        .validate(req.body)
        .then(() => {
        paramsSchema
            .validate(req.params)
            .then(() => {
            next();
        })
            .catch(err => {
            res.status(400).json({ error: err.message });
        });
    })
        .catch(err => {
        res.status(400).json({ error: err.message });
    });
});
