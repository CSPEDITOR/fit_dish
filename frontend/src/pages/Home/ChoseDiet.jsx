import React from 'react'

import diet1 from "../../images/diet1.png"
import diet2 from "../../images/diet2.png"
import diet3 from "../../images/diet3.png"

function ChoseDiet() {

    let ourCategories = [
        {
            title: "Normal Diet",
            desc: "Balanced food routine for maintaining current weight."
        },
        {
            title: "Weight Loss",
            desc: "Low-calorie, high-fiber meals for fat burning."
        },
        {
            title: "Weight Gain",
            desc: "High-protein, calorie-rich foods for muscle and mass gain."
        },
        {
            title: "Detox & Hydration",
            desc: "Includes detox water, warm water, lemon water, etc."
        },
    ]

    let ourCategoriesList = ourCategories.map(
        (item, index) => {
            return (
                <div className='w-full flex flex-row justify-center gap-6' key={index + "ourCategories"}>
                    <div className='font-extrabold text-5xl t-4'>{index + 1}.</div>
                    <div className='w-[70%]'>
                        <div className='t-4 text-3xl font-semibold'>{item.title}</div>
                        <div className='t-4 w-[80%]'>{item.desc}</div>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className='w-full'>
            <div className='relative w-full flex flex-row mb-12'>
                <div className='w-1/2'></div>
                <div className='w-1/2 relative'>
                    <div className='text-center text-4xl font-bold'>Our Categories</div>
                    <div className="red-line h-[4px] w-[35%] bg-[#CC2405]"></div>
                </div>
            </div>
            <div className='w-full flex flex-row justify-center items-center'>
                <div className="chose-diet-images w-[60%] bg-admber-500 flex flex-row items-center justify-center">
                    <img src={diet1} className='w-1/2 object-center' alt="" />
                    <div className='w-1/4 '>
                        <img src={diet2} className='w-full' alt="" />
                        <img src={diet3} className='w-full' alt="" />
                    </div>
                </div>
                <div className='w-1/2 flex flex-col justify-between'>
                    {ourCategoriesList}
                </div>
            </div>
        </div>
    )
}

export default ChoseDiet