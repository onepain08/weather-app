import DayForecast from "@/components/DayForecast";
import HourForecast from "@/components/HourForecast";
import Location from "@/components/Location";
import Section from "@/components/Section";
import TempDisplay from "@/components/TempDisplay";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";



const index = ({ weather }) => {

    
    
    
    const [celcius, setCelcius] = useState(true)
    const [weatherData, setWeatherData] = useState(weather)
    const [submitValue, setSubmitValue] = useState('')
    const [searchedLocation, setSearchedLocation] = useState('London')
    const [dayIndex, setDayIndex] = useState(0)
    const [weatherImg, setWeatherImg] = useState(weatherData.forecast.forecastday[0].day.condition.icon)
    const [xPos, setXPos] = useState(0)
    
    console.log(weather);

    function handleUnit(){
        setCelcius(!celcius)
    }

    function handleChange(event){
        setSubmitValue(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        setSearchedLocation(submitValue)
        setSubmitValue('')
    }

    
    useEffect(() => {

        async function requestWeather(){

            try{
                const res = await fetch(`api/weather`,{
                    body: searchedLocation,
                    method: 'POST'
                })

                if(!res.ok){
                    throw Error('Location not found')
                }

                const data = await res.json()
                setWeatherData(data)
            } catch(err){
                alert(err.message)
            }

        }

        
        
        requestWeather()
        
    },[searchedLocation])
    
    useEffect(() => {
        setWeatherImg(weatherData.current.condition.icon)

    },[weatherData])


    //Animations
    const hourWeatherAnim = {
        initial:{},
        animate:{
            x: xPos,
        }
    }

    return (
        <div className=" w-full p-2 grid grid-cols-1 auto-rows-auto last:mb-16 lg:grid-cols-2">
            <Location weather={weatherData} celcius={celcius} handleSetSearchedLocation={setSearchedLocation} handleUnit={handleUnit} />
            <div className="flex justify-start items-center gap-2 mt-2 lg:col-span-full">
                <button className={"rounded-lg bg-white/30 text-white font-normal text-md text-center px-4 py-1 md:text-xl md:font-light " + (dayIndex === 0? " bg-teal-300" : "")} onClick={() => {setDayIndex(0)}}>Today</button>
                <button className={"rounded-lg bg-white/30 text-white font-normal text-md text-center px-4 py-1 md:text-xl md:font-light " + (dayIndex === 1? " bg-teal-300" : "")} onClick={() => {setDayIndex(1)}}>Tomorrow</button>
                <button className={"rounded-lg bg-white/30 text-white font-normal text-md text-center px-4 py-1 md:text-xl md:font-light " + (dayIndex === 2? " bg-teal-300" : "")} onClick={() => {setDayIndex(2)}}>Next Day</button>
            </div>
            {dayIndex === 0 && <TempDisplay weather={weatherData} celcius={celcius} weatherImg={weatherImg} />}
            {dayIndex !== 0 && <DayForecast weather={weatherData} celcius={celcius} dayIndex={dayIndex} />}
            <div className=" overflow-x-hidden w-full mx-auto">
                <motion.div className="flex items-center gap-2 mx-2 overflow-x-scroll lg:flex-col lg:overflow-x-auto lg:overflow-y-scroll lg:max-h-96 lg:my-8 lg:max-w-3xl" variants={hourWeatherAnim} initial={'initial'} animate={'animate'}>
                    {
                        weatherData.forecast.forecastday[dayIndex].hour.map( hour => {
                            return(
                                <HourForecast
                                    key={hour.time}
                                    time={hour.time}
                                    icon={hour.condition.icon}
                                    tempC={hour.temp_c}
                                    tempF={hour.temp_f}
                                    celcius={celcius}
                                    />
                                    )
                                })
                            }
                </motion.div>
                {/* <button className={"rounded-lg bg-white/30 text-white font-normal text-md text-center px-4 py-1 md:text-xl md:font-light "} onClick={() => {setXPos(prevX => prevX + 312)}}>prev</button> */}
                {/* <button className={"rounded-lg bg-white/30 text-white font-normal text-md text-center px-4 py-1 md:text-xl md:font-light "} onClick={() => {setXPos(prevX => prevX - 312)}}>Next</button> */}
            </div>
            <form onSubmit={handleSubmit} className=' fixed bottom-0 left-0 w-full flex justify-center items-center p-2'>
                <input type="text" value={submitValue} placeholder='Enter city, zip or postal code.' className="bg-white text-center text-text-Sec w-full max-w-xl h-12 rounded-l-xl outline-none" onChange={handleChange}/>
                <button type="submit" value='submit' className="w-2/12 max-w-[8rem] h-12 bg-bgPrim text-white uppercase 2xl font-bold rounded-r-xl">sub</button>
            </form>
            {dayIndex === 0 &&<Section data={[{name:'Wind kph', value:weatherData.current.wind_kph},{name:'Wind mph', value:weatherData.current.wind_mph},{name:'Wind direction', value:weatherData.current.wind_dir}]} title={'Wind'}  />}
            <Section data={[
                {name:'Sun rise', value:weatherData.forecast.forecastday[dayIndex].astro.sunrise},
                {name:'Sun set', value:weatherData.forecast.forecastday[dayIndex].astro.sunset},
                {name:'Moon rise', value:weatherData.forecast.forecastday[dayIndex].astro.moonrise},
                {name:'Moon set', value:weatherData.forecast.forecastday[dayIndex].astro.moonset},
                {name:'Moon phase', value:weatherData.forecast.forecastday[dayIndex].astro.moon_phase},
                ]}
                title={'Astro'}
             />
        </div>
    );
}


export const getServerSideProps = async (ctx) => {

    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=London&days=3`)
    const data = await res.json()

    return {
        props:{
            weather:data
        }
    }
}

export default index;