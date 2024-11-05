const { body } = require('express-validator');

exports.validateProduct = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('size').isString().notEmpty().withMessage('Size is required'),
    body('color').isString().notEmpty().withMessage('Color is required'),
    body('category').isString().notEmpty().withMessage('Category is required')
];
