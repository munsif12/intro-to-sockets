import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiTimer } from 'react-icons/bi';

import { AiOutlineLineChart } from "react-icons/ai";
import { SiLivechat } from "react-icons/si";

const sidebarNavItems = [
    {
        display: 'Time Stamp',
        to: '/',
        icon: <BiTimer />,
        section: ''
    },
    {
        display: 'Live Chart',
        to: '/livechart',
        icon: <AiOutlineLineChart />,
        section: 'livechart'
    },
    {
        display: 'Realtme Chat',
        to: '/realtime-chat',
        icon: <SiLivechat />,
        section: 'realtime-chat'
    },
]

function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);
    return (
        <aside className="sideBar bg-[#ebebeb] overflow-y-auto h-[calc(100vh-10vh)] pt-3">
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__text flex justify-start items-center gap-1">
                                <span className='text-2xl'>{item.icon}</span>
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </aside>
    )
}

export default Sidebar