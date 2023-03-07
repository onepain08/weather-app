import React, { useEffect } from "react";
import { TbTemperaturePlus, TbTemperatureMinus } from'react-icons/tb'
import { BsCloudRainHeavyFill, BsSnow } from'react-icons/bs'
import Image from "next/image";


const DayForecast = (props) => {

    

    return (
        <div className="w-full max-w-lg mx-auto my-8">
            <h1 className="text-white text-2xl font-light mb-10">Date: {props.weather.forecast.forecastday[props.dayIndex].date}</h1>
            <div className="grid grid-cols-2 items-center">
                <div className="flex flex-col justify-center items-start text-white text-3xl font-normal gap-6 mt-4 mb-6">
                    <div className="flex items-center gap-2">
                        <TbTemperaturePlus className=" w-full" />
                        <h2> {props.celcius === true? props.weather.forecast.forecastday[props.dayIndex].day.maxtemp_c : props.weather.forecast.forecastday[props.dayIndex].day.maxtemp_f }{props.celcius ? '°C' : '°F'}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbTemperatureMinus className=" w-full" />
                        <h2> {props.celcius === true? props.weather.forecast.forecastday[props.dayIndex].day.mintemp_c : props.weather.forecast.forecastday[props.dayIndex].day.mintemp_f}{props.celcius ? '°C' : '°F'}</h2>
                    </div>
                </div>
                <div className="grid grid-cols-[auto,auto] ">
                    <Image src={props.weather.forecast.forecastday[props.dayIndex].day.condition.icon.replace('//cdn.weatherapi.com', '')} width={300} height={300} alt='weather' className=" w-full" />
                </div>

            </div>
            <div className="flex items-center text-white text-xl font-light gap-4 mt-10">
                <div className="flex items-center gap-2">
                    <BsCloudRainHeavyFill />
                    Rain
                    <h2 className="ml-3">{props.weather.forecast.forecastday[props.dayIndex].day.daily_chance_of_rain}%</h2>
                </div>
                <h1>|</h1>
                <div className="flex items-center gap-2">
                    <BsSnow />
                    Snow
                    <h2 className="ml-3">{props.weather.forecast.forecastday[props.dayIndex].day.daily_chance_of_snow}%</h2>
                </div>
            </div>
        </div>
    );
}

export default DayForecast;