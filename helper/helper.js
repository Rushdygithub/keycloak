const reduceTaxRate = (tax,count) => {
   let res 
   if(count==0)
   {
     res = 0.0 * 100
   } else if (count == 1 || count == 2)
   {
     res = 0.2 * 100
   } else {
    res = 0.5 * 100
   }
   console.log('+++++++++++++++++++++++++++Reduce tax++++++++++++++++++++++++++++++', parseInt(tax-res))
   return parseInt(tax-res)
}

const productPrice = (body) => {
    const prodType = require('../prodType.json') 
    let member = {Silver: 0.05, Gold: 0.1}
    // console.log('+++++++++++++++++++++++++++Data++++++++++++++++++++++++++++++', member[body.membershipType])
    let dis 
    let total
    for (let i = 0; i < prodType.length; i++)
    {
        if (prodType[i].product == body.type)
        {
            dis = body.price - (body.price * prodType[i].discount)
            // console.log('+++++++++++++++++++++++++++Data++++++++++++++++++++++++++++++', dis)
            if (body.membershipType in member)
            {
                total = dis - (body.price * member[body.membershipType])
            }
            return total
        }
    }
    
}

module.exports = 
{
    reduceTaxRate,
    productPrice
}