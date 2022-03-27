import React from 'react'

function RealtimeChat() {
    return (
        <div className='realtimeChat h-full flex justify-center items-center text-white'>
            <div className="chat-container relative w-2/3 h-2/3 bg-gray-100">
                <div className="chat-header absolute top-[-25px] left-0">
                    <div className="chat-header-title ">
                        <h1 className='text-white'>Realtime Chat</h1>
                    </div>
                </div>
                <div className="chat-body">
                    <div className="message-container">
                        <div className="message">
                            <div className="message-text">
                                <p>Hello</p>
                            </div>
                            <div className="message-time">
                                <p>3:00</p>
                            </div>
                        </div>
                        <div className="message">
                            <div className="message-text">
                                <p>Hello</p>
                            </div>
                            <div className="message-time">
                                <p>3:00</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-footer flex absolute bottom-0 left-0 w-full h-[12%]">
                    <textarea placeholder="Type a message..." className="chat-textarea" />
                    <div className="chat-footer-buttons ">
                        <button className="chat-send-button">
                            <p>Send Chatt</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RealtimeChat