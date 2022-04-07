import React, { useState, useEffect } from 'react'
import { Popover } from 'antd';
const content = (
    <p className="hello-tailwind m-0 p-0">Generating timestamp on the backend using socket.io </p>
);
const title = (
    <h1 className="bold text-2xl p-0 m-0">Socket IO</h1>
);
// const socket = socketIOClient(ENDPOINT);
function TimeStamp({ socket }) {
    const [response, setResponse] = useState("");
    useEffect(() => {
        socket.on("getCurrentTime", data => {
            setResponse(data);
        });
    }, [socket]);

    return (
        <div className="TimeStamp h-[100%] flex justify-center items-center">
            <Popover content={content} title={title} placement="topLeft">
                <div className="w-2/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-rows-1 h-[30vh] ">
                    <div className="grid grid-cols-1">
                        <p className="flex justify-center items-center sm:text-[1.5rem] md:text-[4rem] shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-0 rounded" type="button">
                            {response ? new Date(response).toLocaleTimeString() : "Loading..."}
                        </p>
                    </div>
                </div>
            </Popover>
        </div>
    )
}

export default TimeStamp