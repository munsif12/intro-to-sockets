import React from 'react'

function Navbar() {
    return (
        <header className="navbar h-[10vh] bg-white px-6 flex justify-between relative">
            <div className="navLogo flex items-center text-2xl">Intro To Sockets</div>
            <div className="navLinks flex ">
                <ul className='flex items-center gap-6 m-0 text-[16px]'>
                    <li>GitHub</li>
                    <li>Contect </li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar