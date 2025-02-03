import React from 'react'
import { RiArrowDropRightLine } from "react-icons/ri";

export interface propsTypes {
    title: string;
}

function ResourceCard(props: propsTypes) {
    return (
        <>
            <div className='px-4  py-3 md:px-6 md:py-6 items-center  justify-between gap-4 flex cursor-pointer dark:shadow-neutral-700 shadow-md rounded-2xl bg-gradient-to-b hover:scale-105 transition ease-linear duration-100 hover:shadow-lg dark:from-white dark:to-neutral-400 from-neutral-500  shadow-neutral-700 to-neutral-700'>
                <h1 className='bg-gradient-to-t text-nowrap font-semibold dark:from-black dark:to-neutral-700 from-neutral-300 to-white bg-clip-text text-transparent text-xl md:text-4xl text-center'>{props.title}</h1>
                <RiArrowDropRightLine className='text-4xl text-white dark:text-neutral-900' />
            </div>
        </>
    )
}

export default ResourceCard