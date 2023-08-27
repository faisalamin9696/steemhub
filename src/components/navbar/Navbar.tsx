import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdNotifications } from 'react-icons/md'
import { FaBars } from 'react-icons/fa'
import Avatar from '../Avatar'
import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const navigation = [
    { name: 'Blogs', href: '/', value: 'blogs', current: true },
    { name: 'Chat', href: '/profile/blogs', value: 'chat', current: false },
    { name: 'Tools', href: '#', value: 'tools', current: false },
]


interface NavbarProps {
    username: string,
    dark?: boolean
    children?: React.ReactNode

}
export default function Navbar(props: NavbarProps) {
    const { dark, username, children } = props;

    const [activePage, setActivePage] = useState('blogs')

    const updatedNavigation = navigation.map((item) => ({
        ...item,
        current: item.value === activePage,
    }));


    return (<div className='w-full flex flex-col'>
        <div className='w-full  flex z-10'>
            <Disclosure as="nav" className={clsx("w-full fixed !z-1050",
                dark ? 'bg-slate-800' : 'bg-white')}>
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="relative inline-flex items-center justify-center
                                 rounded-md p-2 text-gray-400 hover:bg-gray-700
                                 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        {open ? (
                                            <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <FaBars className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="/images/steempro_text_logo.png"
                                            alt="SteemGo"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {updatedNavigation.map((item) => (
                                                <Link
                                                    onClick={() => {
                                                        setActivePage(item.value);
                                                    }}
                                                    className={clsx(item.current ? dark ? 'bg-gray-200 text-black' :
                                                        'bg-gray-900 text-white' :
                                                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium')}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    key={item.name}
                                                    to={item.href} title={item.name}>
                                                    {item.name}
                                                </Link>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className={clsx(dark ? 'bg-gray-800 hover:text-white ' : 'bg-gray-200 hover:text-gray-800',
                                            `relative rounded-full  p-1 text-gray-400
                                         
                                        focus:outline-none focus:ring-2
                                         focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`
                                        )}
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <MdNotifications className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <Avatar username={username} />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-500"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className={clsx(`absolute right-0 z-10 mt-2 w-48 
                                            origin-top-right rounded-md  py-1 
                                            shadow-lg ring-1  ring-opacity-5
                                             focus:outline-none`, dark ? 'bg-gray-600 ring-white ' : 'bg-white ring-black')}>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm',
                                                                dark ? 'text-gray-100' : 'text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">

                                {updatedNavigation.map((item) => (
                                    <Link
                                        onClick={() => {
                                            setActivePage(item.value);
                                        }}
                                        className={clsx(
                                            item.current ? dark ? 'bg-gray-200 text-black' : 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                        key={item.name}
                                        to={item.href} title={item.name}>
                                        {item.name}
                                    </Link>

                                ))}


                            </div>
                        </Disclosure.Panel>


                    </>
                )}
            </Disclosure>
        </div>

        <div className='mt-16 w-full'>
            {children}
        </div>
    </div >
    )
}