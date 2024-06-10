// file: routes/menuItems.js

const express = require("express")
const router =  express.Router()
const axios = require('axios')
const qs = require('qs');
const jwtDecode = require('jwt-decode');


// Middleware
const keycloak = require("#middlewares/keycloak")

// Fake Data
const menuItems = [
  {
    name: "Croissant",
    price: "$1",
    onMenu: true
  },
  {
    name:"Latte",
    price: "$5",
    onMenu: true
  },
  {
    name: "Roti Canai",
    price: "$0.50",
    onMenu: true
  },
  {
    name: "Hot Chocolate",
    price: "$5",
    onMenu: false
  },
  {
    name: "Satay",
    price: "$8",
    onMenu: false
  },
  {
    name: "Pad Thai",
    price: "$7",
    onMenu: false
  }
];

// Route open to any role
router.get("/menu-items", 
[keycloak.protect()],
async ( req, res, next) => {
  try {
    let filtered = menuItems.filter(item => {
      if (item.onMenu === true) {
        return item;
      }
    });

    // Return filtered data
    res.json(filtered);
  } catch (error) {
    return next(error.message);
    // console.log(error.message)
  }
});

router.post('/keycloak/token', async (req,res)=> {
  
  try{
    const {grant_type,client_id,client_secret,username,password} = req.body

    const response = await axios({
      method: 'post',
      url: `http://localhost:8080/realms/rbacDemo/protocol/openid-connect/token`,
      data: req.body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  
    if (response)
    {
      return res.json(response.data)
    }
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
    });
  }
 
})

module.exports = router;