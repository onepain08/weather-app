


const Section = (props) => {

    // Pass prop named data into the component,  which is the array of objects containing keys name and value [...{name:'', value:''}...]

    return(
        <div className="my-6 text-white text-xl font-light py-4 border-t-[1px] border-b-[1px] border-white">
            <h1 className="font-bold mb-3">{props.title}</h1>
            {
                props.data.map( item => {
                    return(
                        <div key={item.name} className="flex justify-between items-center">
                            <h2>{item.name}</h2>
                            <h2>{item.value}</h2>
                        </div>

                    )
                })
            }
            
        </div>
    )
}

export default Section;