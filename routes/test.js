const express = require('express')
const router = express.Router()
const {apiResponse,publicAPI,publicAPINew,arrayLopping,filterJsonData,filterData,taxCalculate,productDiscount} = require('../controllers/public')
const {validateProductReq,validationError} = require('../helper/validator')

// Test Route
router.get('/test', (req, res) => {
  res.json({
    message: "API connection established.",
    status: "success"
  })
  .status(200);
});

//Public API
router.get('/public-api', async (req,res)=> {
     
  const {page,limit} = req.query
  await apiResponse(req,res,req.params)
})

//Public API1
router.get('/public-api1', async (req,res)=> {
  let cityName = req.query
  await publicAPI(req,res,req.query)
})

//Piblic APINew
router.post('/public-api/new', async (req,res)=> {

  // let {title,body,userId} = req.body
  // let error = ''

  // if (title)
  // {
  //   title = title.replace(/ /g, "")
  // }
  // if (!title)
  // {
  //   error = 'Title is required'
  // } 
  // if (!body) 
  // {
  //   error = 'Body is required'
  // }
  // if (!userId)
  // {
  //   error = 'UserId is required'
  // }
  // if (isNaN(userId))
  // {
  //   error = 'UserId should be an number'
  // } 

  // if (error) {
  //   return res.status(403).json({ error: error });
  // }
  
  await publicAPINew(req,res,req.body)
})

router.post('/new2', (req,res)=> {
  let status = req.body.status
  arrayLopping(req,res,status)
})

router.get('/filter/json-data', async (req,res)=> {
  let query = req.query
  await filterJsonData(req,res,query)
})

router.get('/json-data', (req,res)=> {
  filterData(req,res)
})

router.post('/tax', (req,res)=> {
  let {employeeId,salary,dependents,type} = req.body
  let msg = ''
  if(!employeeId)
   {
      msg = 'Emplooye ID is required'
      return res.status(400).json(msg)
   }
   if(!salary)
   {
    msg = 'Emplooyee salary is required'
    return res.status(400).json(msg)
   }
   if(!(Number.isInteger(salary)))
   {
    msg = 'Emplooyee salary should be integer value'
    return res.status(400).json(msg)
   }
   if(!dependents)
   {
    msg = 'Dependents count is required'
    return res.status(400).json(msg)
   }
   if(!(Number.isInteger(dependents)))
   {
    msg = 'Dependents count should be integer value'
    return res.status(400).json(msg)
   }
   if(!type)
   {
    msg = 'Emplooyee type is required'
    return res.status(400).json(msg)
   }
   taxCalculate(req,res,req.body)
})

router.post('/product/discount', validateProductReq,validationError, (req,res)=> {
  productDiscount(req,res,req.body)
})

module.exports = router;