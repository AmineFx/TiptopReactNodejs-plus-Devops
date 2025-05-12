import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'

const Header = ({setSideBar}) => {

    const Deconnexion = () => {
        Cookies.remove('accessToken');
        Cookies.remove('userInfo');
        navigate(0);
    }

    return (
        <header className="flex items-center justify-between md:justify-end w-full px-4 bg-white border-b h-14">
            <button className="block btn btn-light md:hidden" onClick={() => setSideBar(true)}>
                <span className="sr-only">Menu</span>
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
            </button>
            <button onClick={Deconnexion} className='flex items-center gap-2 px-4 py-2.5 transition cursor-pointer rounded-lg hover:bg-green-600 hover:text-white'>
                <LogoutOutlined />
                <span className='text-sm font-medium'>Déconnexion</span>
            </button>
        </header>
    )
}

export default Header