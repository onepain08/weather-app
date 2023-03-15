import Image from "next/image";
import React, { useState } from "react";





const HourForecast = (props) =>{


    return(
        <div className="h-full min-w-[6rem] p-2 bg-white/20 rounded-lg flex flex-col items-center font-light lg:w-full lg:h-24 lg:flex-row lg:gap-10">
            <h1 className="text-textPrim text-center text-2xl ">{props.time.slice(11)}</h1>
            <Image src={props.icon.replace('//cdn.weatherapi.com', '')} width={300} height={300} alt='weather' className=" w-3/4 my-4 lg:h-full lg:w-24" />
            <h1 className="text-textPrim text-center text-2xl lg:ml-auto">{props.celcius ? props.tempC : props.tempF}{props.celcius ? '°C' : '°F'}</h1>
        </div>
    )
}


export default HourForecast;