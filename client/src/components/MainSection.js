import React from 'react'
function MainSection({ children }) {
    return (
        <main className="mainSection h-[calc(100vh-10vh)] overflow-y-scroll">
            {children}
        </main>
    )
}

export default MainSection