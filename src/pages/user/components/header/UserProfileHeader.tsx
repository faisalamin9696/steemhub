import Avatar from '../../../../components/Avatar'
import { getProxyImageURL, getResizedAvatar } from '../../../../utils/imageApi';
import { GiAchievement } from 'react-icons/gi'
import React from 'react';
import Reputation from '../../../../components/Reputation';
import { UserProfileTabs } from '../..';
import Button from '@mui/material/Button';

function UserProfileHeader({ children }: { children: React.ReactNode }) {
    const cover_picture = getProxyImageURL('https://cdn.steemitimages.com/DQmQFMsdV7PxMMGVzuxRUyEUeL8XuDTbEMu4vaYXKzxsAsV/coberPic.png', 'large');
    return (

        <div className='w-full'>


            <div className={`relative bg-cover 
                items-center flex-col
                bg-center mx-auto w-full
                 my-0 px-4  py-[30px]`}
                style={{
                    backgroundImage: `url(${cover_picture})`
                }}>

                <div className='max-w-5xl
                   items-center
                    flex
                    flex-row
                    max-sm:flex-col self-center
                    m-auto
                    '>

                    <div className='max-h-[100px] max-w-[100px]' >
                        <Avatar username={'faisalamin'} quality={'medium'} size={100} />
                    </div>


                    <div className='items-center'>

                        <div className='mx-5 space-y-2 max-sm:space-y-0'>
                            <div className='flex items-center flex-row max-sm:flex-col
                                space-x-2'>
                                <div className='flex flex-row items-center space-x-2'>
                                    <h2 className='text-white 
                                font-bold text-2xl 
                                shadow-black'>M.Faisal Amin</h2>

                                    <Reputation reputation={78.910} />

                                </div>

                                <div className='flex 
                                flex-row space-x-3  
                                max-sm:relative
                                max-sm:top-10'>

                                    <Button variant='contained' className='!normal-case 
                                    !relative ml-2 ' >Follow</Button>

                                    <Button variant='contained' className='!normal-case
                                    !bg-slate-200 
                                    hover:!bg-gray-300'>Transfer</Button>

                                </div>
                            </div>

                            <div id='rank-container' className='flex 
                            flex-col max-sm:flex-row 
                                max-sm:justify-center 
                                max-sm:relative max-sm:top-[-30px]
                                max-sm:space-x-2 space-y-2 
                                max-sm:space-y-0'
                            >

                                <div className='text-white m-0 p-0'>@faisalamin</div>

                                <div className='flex max-sm:self-center 
                                items-center space-x-1'>

                                    <GiAchievement className='text-white text-2xl' />
                                    <span className='text-white'>Badges</span>

                                </div>


                            </div>
                        </div>




                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <UserProfileTabs />

                {children}
            </div>
        </div >
    )
}

export { UserProfileHeader }