import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd';
import Socket from 'socket.io-client'
const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/";

const Notification = Object.freeze({
    newMember: 'newMember',
    message: 'message'
})
function RealtimeChat() {
    const socket = Socket(ENDPOINT);

    const [visible, setVisible] = useState(true)
    const [userMessage, setUserMessage] = useState('')
    const [notification, setNotification] = useState('')
    const [userName, setUserName] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        if (notification) {
        } setTimeout(() => {
            setNotification('');
        }, 3000);
    }, [notification]);
    function sendChat() {
        socket.emit('sendNewMessage', userMessage);
        socket.on('recieveNewMessage', (data) => {
            setChatMessages([...chatMessages, data.message])
        })
    }
    function showModal() {
        setVisible(true)
    };

    const handleOk = (e) => {
        e.preventDefault();
        socket.emit('UserName', userName);
        socket.on('welcomeNewMember', (data) => {
            console.log(data)
            if (data.notificationType === Notification.newMember) {
                setNotification(data.message)
            }
        })
        setVisible(false)
        setUserName('')
    };

    const handleCancel = () => {
        setVisible(false)
    };


    return (
        <>
            <div className='realtimeChat h-full flex justify-center items-center text-white'>
                <div className="chat-container relative xs:w-[80%] sm:w-[70%] md:w-[55%] lg:w-[55%] h-2/3 bg-gray-100 rounded-lg">
                    <div className="chat-header absolute top-[-25px] left-0">
                        <div className="chat-header-title ">
                            <h1 className='text-white cursor-pointer' onClick={showModal}>Realtime Chat</h1>
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


            <Modal
                visible={visible}
                title="Enter Your Name"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" className='rounded-md' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk} className='text-white bg-[#fa63a382] border-0 rounded-md shadow-[rgb(174 174 174 / 90%) 0px 20px 25px -5px, rgb(253 253 253 / 90%) 0px 10px 10px -5px]'>
                        Submit
                    </Button>
                ]}
                style={{
                    width: '40%',
                    height: '40%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <form className=''>
                    {/* create an input */}
                    <div className="userName flex flex-col">
                        <label className='text-[#BE2C6A] font-bold'>What's your name ?</label>
                        <input className='h-[3rem] mt-2 outline-none rounded-lg border-2 border-[#BE2C6A] text-[#BE2C6A] pl-4 placeholder-[#BE2C6A]' type="text" name='userName' placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                </form>
            </Modal>

        </>
    )
}

export default RealtimeChat