import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import Socket from 'socket.io-client'
const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/";
//import useHistory from 'react-router-dom/es/useHistory';


const Notification = Object.freeze({
    newMember: 'newMember',
    message: 'message'
})

function RealtimeChat() {
    let socket = Socket(ENDPOINT);
    const navigate = useNavigate()
    const location = useLocation();


    const [userMessage, setUserMessage] = useState('')
    const [notification, setNotification] = useState('')
    const [userDetailsState, setUserDetailsState] = useState({
        userName: '',
        roomName: ''
    })
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        let { userName, roomName } = queryString.parse(location.search);
        if (!userName && !roomName) {
            navigate('/login')
        } else {
            console.log({ firstName: userName, roomName })
            setUserDetailsState({
                userName,
                roomName
            })


            socket.emit('UserName', { userName, roomName });
            socket.on('welcomeNewMember', (data) => {
                console.log(data)
                if (data.notificationType === Notification.newMember) {
                    setNotification(data.message)
                }
            })
        }

    }, [location.search, navigate]);



    function sendChat() {
        socket.emit('sendNewMessage', userMessage);
        socket.on('recieveNewMessage', (data) => {
            setChatMessages([...chatMessages, data.message])
        })
    }





    return (
        <>
            <div className='realtimeChat h-full flex justify-center items-center text-white'>
                <div className="chat-container relative xs:w-[80%] sm:w-[70%] md:w-[55%] lg:w-[55%] h-2/3 bg-gray-100 rounded-lg">
                    <div className="chat-header absolute top-[-25px] left-0">
                        <div className="chat-header-title ">
                            <h1 className='text-white cursor-pointer'>Realtime Chat</h1>
                        </div>
                    </div>
                    <div className="chat-body pt-1 relative text-black h-full overflow-y-scroll">
                        {
                            notification && (
                                <div className="notification absolute top-[0px] left-[50%] translate-x-[-50%] w-[50%] flex justify-center p-[4px] bg-[#fa63a382] border-0 rounded-lg shadow-[rgb(174 174 174 / 10%) 0px 20px 25px -5px, rgb(253 253 253 / 1%) 0px 10px 10px -5px]]">
                                    {notification}
                                </div>
                            )
                        }
                        <div className="message-container h-full">
                            <div className="message">
                                {
                                    chatMessages.map((val, i) => (
                                        <div key={i} className="message-text mt-1 flex justify-start items-start gap-1">
                                            <p className='ml-2 h-[35px] w-[35px] rounded-[50%] bg-slate-700'></p>
                                            <p className='m-0 px-4 py-2 bg-slate-400 inline-block rounded-md max-w-[300px] break-all'>{val}</p>
                                        </div>
                                    ))
                                }
                                {/* <div className="message-time">
                                    <p>3:00</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="chatFooterParent absolute bottom-[-7.5%] left-0 w-full h-[15%] px-2 flex justify-center ">
                        <div className="chat-footer flex justify-evenly w-[80%] bg-[#be2c6a] h-full rounded-lg ">
                            <input type='text' className="chat-textarea outline-none w-2/3 px-3 text-white placeholder-white bg-transparent" placeholder="Type a message..." onChange={(e) => setUserMessage(e.target.value)} />
                            <div className="chat-footer-buttons w-[20%] flex justify-center items-center">
                                <button className="chat-send-button w-full h-[75%] bg-[#fa63a382] border-0 rounded-lg shadow-[rgb(174 174 174 / 10%) 0px 20px 25px -5px, rgb(253 253 253 / 1%) 0px 10px 10px -5px]">
                                    <p className='m-0 p-0' onClick={sendChat}>Send Chat</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default RealtimeChat