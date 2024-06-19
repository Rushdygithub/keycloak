const {check,validationResult} = require('express-validator')

//check method used to validate the request and on other hands validationResult used to get the validation errors
const validateProductReq = [
    check('price')
    .exists().withMessage('Product price is required'),
    check('membershipTier')
    .exists().withMessage('MembershipTier is required'),
    check('productCategory')
    .isIn(['Electronics','Clothing','Groceries']).withMessage('Invalid productCategory')
    .exists('type').withMessage('ProductCategory is Required'),
    check('membershipTier')
    .isIn(['Silver','Gold']).withMessage('Invalid membershipTier type')
    .exists().withMessage('MembershipTier is Required'),
    check('promotion')
    .isIn(['blackfriday','holidayseason','backtoschool']).withMessage('Invalid promotion type')
    .exists().withMessage('Promotion is Required')
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