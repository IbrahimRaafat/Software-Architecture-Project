"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.authRoutes = router;
// Public routes
router.post('/register', validation_1.validateRegister, authController_1.register);
router.post('/login', validation_1.validateLogin, authController_1.login);
router.post('/refresh', authController_1.refreshToken);
// Protected routes
router.post('/logout', auth_1.authenticateToken, authController_1.logout);
router.get('/verify', auth_1.authenticateToken, authController_1.verifyToken);
router.get('/profile', auth_1.authenticateToken, authController_1.getUserProfile);
//# sourceMappingURL=auth.js.map