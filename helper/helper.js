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

const loyalityDiscount = (body) => {

    const loyality = require('../loyality.json')
    const member = require('../membership.json')
    let points  = 0
    let points1 = 0
    let points2 = 0
    let points3 = 0
    let points4 = 0
    let earns   = 0 
    let earns1  = 0

    for(let i = 0; i < loyality.length; i++)
    {
       if (loyality[i].product === body.productCategory)
       {
           points += loyality[i].points
           earns = body.price * points
       } 
        if (member[i].type === body.membershipTier)
        {
            points1 += member[i].points
            earns1 = body.price * points1
            earns1 = earns + earns1 
        }     
    }
    if (body.productCategory === 'Electronics' && body.promotion === 'blackfriday')
    {
        points2 += 2
        earns1 = earns1 * points2
    }
    if (body.productCategory === 'Clothing' && body.promotion === 'holidayseason')
    {
        points3 += 1.5
        earns1 = earns1 * points3
    }
    if (body.productCategory === 'Groceries' && body.promotion === 'backtoschool')
    {
        points4 += 2
        earns1 = earns1 * points4
    }
    return earns1
}



module.exports = 
{
    reduceTaxRate,
    productPrice,
    loyalityDiscount
}