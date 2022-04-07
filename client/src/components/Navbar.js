import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <header className="navbar h-[10vh] bg-white px-6 flex justify-between relative">
            <div className="navLogo flex items-center text-2xl">Intro To Sockets</div>
            <div className="navLinks flex ">
                <ul className='flex items-center gap-6 m-0 text-[16px]'>
                    <li><a href='https://github.com/munsif12/intro-to-sockets' target="_blank" rel="noopener noreferrer">Github</a></li>
                    <li>Contect </li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar