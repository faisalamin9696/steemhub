import Card from '@mui/material/Card';
import React from 'react'


interface WrapperProps {
    leftContent?: React.ReactNode | JSX.Element;
    rightContent?: React.ReactNode | JSX.Element;
    children?: React.ReactNode | JSX.Element;


}

export default function MainWrapper(props: WrapperProps) {
    const { leftContent, rightContent, children } = props;
   

    return (
        <div className='!bg-inherit mt-2  px-2'>


            <div className='relative max-w-5xl 
            mx-auto   max-sm:px-2'>


                {leftContent ? <div className='p-4
            hidden 
            w-[180px] float-left border rounded border-solid border-gray-500
            lg:block 
            !min-h-[150px] sticky self-start items-start top-[70px]'>
                    <div className=''>
                        {leftContent}
                    </div>
                </div> : <></>}

                {rightContent ? <div
                    className=' p-4  hidden right-slide border rounded border-solid border-gray-500
                 !w-[270px]  md:block  float-right !min-h-[150px] 
                 sticky self-start top-[70px] justify-start '>
                    {rightContent}

                </div> : <></>}
                <div className='
                overflow-hidden lg:mx-auto
                w-full
                md:w-[calc(100%_-_(270px_+_20px))]
                lg:w-[calc(1024px_-_(180px_+_270px_+_2_*_20PX))] max-sm:max-w-full sm:w-full'>

                    {children ? children : <></>}
                </div>
            </div>
        </div >

    )
}
