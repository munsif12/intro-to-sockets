import React from 'react'
import MainSection from '../components/MainSection'
import Sidebar from '../components/Sidebar'

function index({ children }) {
    return (
        <div className="h-[calc(100vh-10vh)] grid grid-cols-[15%,85%] w-full bg-[#002632]">
            <Sidebar />
            <MainSection >
                {children}
            </MainSection>

        </div>
    )
}

export default index