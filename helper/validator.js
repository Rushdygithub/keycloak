const {check,validationResult} = require('express-validator')

//check method used to validate the request and on other hands validationResult used to get the validation errors

const validateProductReq = [
    check('type')
        .isIn(['Electronics','Clothing','Groceries'])
        .withMessage('Invalid type value'),
    check('membershipType')
        .isIn(['Silver','Gold'])
        .withMessage('Invalid membership type')
]

const validationError = (req,res,next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
    {
       return res.status(400).json({
         status: false,
         message: errors.array()[0].msg
       })
    }
    next()
}

module.exports = {
    validateProductReq,
    validationError
}