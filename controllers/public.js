const axios = require('axios')
const {reduceTaxRate,productPrice,loyalityDiscount} = require('../helper/helper')

const apiResponse = async (req,res,query) => {
   try {

    const responseData = await axios({
       method: 'get',
       url: `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
    })
  
    if (responseData.status == 200)
    {
       let newArr = responseData.data.data
       const mapData = newArr.map(el=>
         ({
          year: el.Year,
          population: el.Population,
          slugnation: el["Slug Nation"]
       }))
   
       const page = parseInt(req.query.page) || 1
       const size = parseInt(req.query.limit) || 10
       const offset = (page - 1) * size
      
       const sortedData = mapData.sort((a, b) => a.year - b.year)
       const filterData = sortedData.filter((el)=> el.year >= 2015)
       
       const paginatedData = filterData.slice(offset, offset + size)
       
       return res.send(paginatedData)

        //let sortArray = [2000,1000,400]
        //const sort = sortArray.sort((a,b)=> a-b)
        // console.log(sort)
        //const sortDes = sortArray.sort((a,b)=> b-a)
        //console.log(sortDes)

    }

   } catch (e)
   {
    console.log(e)
     res.status(400).json({
        error: e.message
     })
   }
}

const publicAPI = async (req,res,query) => {
   try {
      const response = await axios({
         method: 'GET',
         url: `https://jsonplaceholder.typicode.com/users`
      })
      // console.log('++++++++response1+++++++++++++' + JSON.stringify(response.data))

      const response1 = await axios({
         method: 'GET',
         url: `https://jsonplaceholder.typicode.com/posts`
      })
      // console.log('++++++++response+++++++++++++' + JSON.stringify(response1.data))

      if (response.data.length > 0)
      {
         //Here when we have a object of array we have to use var type of varialbe to get output (wanna to return dif output through the same variable)
         var dataSetMap 

         dataSetMap = response.data.map((el)=> ({ 
            userid: el.id,
            name: el.name,
            address: el.address
         }))
         
         //console.log('++++++++response mapdata+++++++++++++', JSON.stringify(mapData))   
      } else {
         dataSetMap = response1.data.map((el)=> ({ 
            id: el.id,
            title: el.title
         }))
      }
      res.status(200).json({
         data: dataSetMap.slice(0,3)
       })

   } catch (e)
   {
      console.log(e.message)
      return res.status(400).json({
         error:e.message
      })
   }
}

const publicAPINew = async (req,res,body) => {
   try {
      const response = await axios({
         method: 'POST',
         url: `https://jsonplaceholder.typicode.com/posts`,
         body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
          }),
         headers:{
            'Content-type': 'application/json; charset=UTF-8',
         }
      })

      if (response.status == 200)
      {
         return res.status(200).json({
            data:response.data
         })
      }

   } catch (e) {
      console.log(e.message)
      return res.status(400).json({
         error: e.message
      })
   }
}

const arrayLopping = (req,res,status) => {
   try {

      let statusArr = ["process","shiping","recived","deliverd"]

      for (let i = 0; i < statusArr.length; i++)
      {
         if (statusArr[i] === status)
         {
            return res.status(200).json({
               data:statusArr.indexOf(status)
            }) 
         }
      }
   } catch (e) {
      console.log(e.message)
      return res.status(400).json({
         error:e.message
      })
   }
}

const filterJsonData = async (req,res,query) => {
   try {
      let data = require('../data.json')
      let dataArray = []
      
      let countries = data.countries
      let length = countries.length

      for (let i = 0; i < length; i++) {
        let country = countries[i]
        if (country.code === query.code) 
        {
           dataArray.push({
            code: country.code,
            country:country.country
        }) 
        } else if (country.country === query.country) 
        {
           dataArray.push({
            code: country.code,
            country:country.country
         })} 
    }

    return res.status(200).json({
      data: dataArray
    });
 
   } catch (e) {
      return res.status(400).json({
         error:e.message
      })
   }
}

const filterData = (req,res) => {

   // let jsonData = require('../data1.json')
   // // console.log('+++++++++++++++++++++++++++log data++++++++++++++++++++++++++++++', jsonData.length)
   // let sum = 0
   // for(let i = 0; i < jsonData.length; i++)
   // {
   //    let data =   parseFloat(jsonData[i].price)
   //    sum += data
   //    console.log('+++++++++++++++++++++++++++log data++++++++++++++++++++++++++++++', sum)  
   // }
   // // You can send the sum as a response or do something else with it
   // res.send(`Total Price: $${sum.toFixed(2)}`);
}

const taxCalculate = (req,res,body) => {
   try {
   let taxRate = [20,30,50]
   let tax 
   let result 
   
   switch (body.type) {
      case 'regular':
         tax = body.salary * taxRate[0]/100
         console.log('+++++++++++++++++++++++++++tax++++++++++++++++++++++++++++++', tax)
         break;
      case 'daily':
         tax = body.salary * taxRate[1]/100
         break;
      case 'other':
         tax = body.salary * taxRate[2]/100
         break;
   }

   let reducedTax = reduceTaxRate(tax,body.dependents)
   result = body.salary + reducedTax

   return res.status(200).json({
      id: body.employeeId,
      salary: result
    });
   } catch (e) 
   {
      return res.status(400).json({
         error:e.message
      })
   }  
}

const productDiscount = (req,res,body) => {
   try {
      //if function return a value you need to assign to a variable like this (without calling directly)
      let discountPrice = productPrice(body)
      // console.log('+++++++++++++++++++++++++++Data++++++++++++++++++++++++++++++', productPrice)
      return res.status(200).json({
         discountprice: discountPrice
      })
   } catch (e) 
   {
      return res.status(400).json({
         error:e.message
      })
   }
}

const loyaltyPoints = (req,res,body) => {
   try {
      // const loyality = require('../loyality.json')
      // console.log('+++++++++++++++++++++++++++Data++++++++++++++++++++++++++++++',loyality)
      const points = loyalityDiscount(body)
      let discount = points * 0.01
      let totalPrice = body.price - discount
      console.log('+++++++++++++++++++++++++++Total Points++++++++++++++++++++++++++++++', totalPrice)
      return res.status(200).json({
         status: true,
         totalprice: parseFloat(totalPrice)
      })
   } catch (e) {
      console.log('+++++++++++++++++++++++++++Error log++++++++++++++++++++++++++++++', e.message)
      return res.status(400).json({
         error:e.message
      })
   }
}

module.exports = 
{
   apiResponse,
   publicAPI,
   publicAPINew,
   arrayLopping,
   filterJsonData,
   filterData,
   taxCalculate,
   productDiscount,
   loyaltyPoints 
}