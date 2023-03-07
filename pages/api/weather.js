
export default async function handler(req, res){
    

        const re = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${req.body}&days=3`)
        const data =  await re.json()



    
    res.status(200).json(data)

}