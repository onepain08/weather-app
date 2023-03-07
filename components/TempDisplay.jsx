import React, { useEffect } from "react";
import { useState } from "react";
import { TbTemperaturePlus, TbTemperatureMinus } from'react-icons/tb'
import { BsCloudRainHeavyFill, BsSnow } from'react-icons/bs'
import Image from "next/image";



const TempDisplay = (props) => {

    const [temp, setTemp] = React.useState(props.weather.current.temp_c)
    const [feelsLike, setFeelsLike] = React.useState(props.weather.current.feelslike_c)

    useEffect(() => {


        function handleUnit(celcius){
            if(celcius == true){
                setTemp(props.weather.current.temp_c)
                setFeelsLike(props.weather.current.feelslike_c)
            }else if(celcius === false){
                setTemp(props.weather.current.temp_f)
                setFeelsLike(props.weather.current.feelslike_f)
            }
        }

        handleUnit(props.celcius)

    },[props.celcius])

    useEffect(() => {
        setTemp(props.weather.current.temp_c)
        setFeelsLike(props.weather.current.feelslike_c)

    },[props.weather])



    return (
        <div className="w-full my-8 max-w-lg mx-auto">
            <div className="flex items-center text-white text-xl font-light gap-6 mt-4 mb-6">
                <div className="flex items-center gap-2">
                    <TbTemperaturePlus className=" w-full" />
                    <h2> {props.celcius === true? props.weather.forecast.forecastday[0].day.maxtemp_c : props.weather.forecast.forecastday[0].day.maxtemp_f }{props.celcius ? '°C' : '°F'}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <TbTemperatureMinus className=" w-full" />
                    <h2> {props.celcius === true? props.weather.forecast.forecastday[0].day.mintemp_c : props.weather.forecast.forecastday[0].day.mintemp_f}{props.celcius ? '°C' : '°F'}</h2>
                </div>
            </div>
            <div className="grid grid-cols-[auto,auto] ">
                <h1 className="text-left text-7xl text-white">
                    {temp}{props.celcius ? '°C' : '°F'}
                </h1>
                <Image src={props.weatherImg.replace('//cdn.weatherapi.com', '')} width={300} height={300} alt='weather' className=" row-span-2 w-full" />
                <h1 className="text-2xl font-light text-white text-left">
                    Feels like: {feelsLike}{props.celcius ? '°C' : '°F'}
                </h1>
            </div>
            <div className="flex items-center text-white text-xl font-light gap-4 mt-10">
                <div className="flex items-center gap-2">
                    <BsCloudRainHeavyFill />
                    Rain
                    <h2 className="ml-3">{props.weather.forecast.forecastday[0].day.daily_chance_of_rain}%</h2>
                </div>
                <h1>|</h1>
                <div className="flex items-center gap-2">
                    <BsSnow />
                    Snow
                    <h2 className="ml-3">{props.weather.forecast.forecastday[0].day.daily_chance_of_snow}%</h2>
                </div>
            </div>

        </div>
    );
}

export default TempDisplay;