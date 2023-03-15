import React, { useEffect, useState } from "react";
import { GoLocation } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";



const Location = (props) => {


    const [location, setlocation] = useState(props.weather.location)

    useEffect(() => {

        setlocation(props.weather.location)

    },[props.weather])
    
    return (
        <div className="w-full mx-auto font-light rounded-xl bg-white/20 p-2 gap-2 grid grid-cols-[min-content,auto] lg:col-span-full">
            <GoLocation className="w-8 h-8 text-white" />
            <h1 className="text-2xl text-textPrim">
                {location.name}, {location.country}
            </h1>
            <div className="flex items-center justify-start gap-4 col-start-2">
                <h2 className="text-white text-lg text-left mr-auto">
                    {props.weather.current.last_updated}
                </h2>
                {/* <AiFillHeart className="w-8 h-8 text-gray-300" /> */}
                <div className={' relative w-16 border-[1px] border-white h-8 rounded-3xl flex items-center ' + (props.celcius ? 'justify-start' : 'justify-end')}  onClick={props.handleUnit}>
                    <div className="h-full w-2/3 bg-white/20 rounded-full text-center text-white font-semibold flex items-center justify-center">{props.celcius ? <h2>C</h2> : <h2>F</h2>}</div>
                </div>
            </div>
        </div>
    );
}

export default Location;