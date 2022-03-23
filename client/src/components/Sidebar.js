import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { FaBeer } from 'react-icons/fa';

const sidebarNavItems = [
    {
        display: 'TimeStamp',
        to: '/',
        section: ''
    },
    {
        display: 'Test',
        to: '/test',
        section: 'test'
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
                            <div className="sidebar__menu__item__text">
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