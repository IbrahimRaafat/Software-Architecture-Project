"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegister = void 0;
const validateRegister = (req, res, next) => {
    const { email, password, firstName, lastName, role } = req.body;
    const errors = [];
    // Email validation
    if (!email) {
        errors.push({ field: 'email', message: 'Email is required' });
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'Email format is invalid' });
    }
    // Password validation
    if (!password) {
        errors.push({ field: 'password', message: 'Password is required' });
    }
    else if (password.length < 8) {
        errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
    }
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        errors.push({
            field: 'password',
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        });
    }
    // First name validation
    if (!firstName) {
        errors.push({ field: 'firstName', message: 'First name is required' });
    }
    else if (firstName.trim().length < 2) {
        errors.push({ field: 'firstName', message: 'First name must be at least 2 characters long' });
    }
    // Last name validation
    if (!lastName) {
        errors.push({ field: 'lastName', message: 'Last name is required' });
    }
    else if (lastName.trim().length < 2) {
        errors.push({ field: 'lastName', message: 'Last name must be at least 2 characters long' });
    }
    // Role validation
    if (!role) {
        errors.push({ field: 'role', message: 'Role is required' });
    }
    else if (!['admin', 'doctor', 'patient'].includes(role)) {
        errors.push({ field: 'role', message: 'Role must be one of: admin, doctor, patient' });
    }
    if (errors.length > 0) {
        res.status(400).json({
            error: 'Validation failed',
            message: 'Please check the following fields',
            details: errors
        });
        return;
    }
    next();
};
exports.validateRegister = validateRegister;
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
    // Email validation
    if (!email) {
        errors.push({ field: 'email', message: 'Email is required' });
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'Email format is invalid' });
    }
    // Password validation
    if (!password) {
        errors.push({ field: 'password', message: 'Password is required' });
    }
    if (errors.length > 0) {
        res.status(400).json({
            error: 'Validation failed',
            message: 'Please check the following fields',
            details: errors
        });
        return;
    }
    next();
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=validation.js.map