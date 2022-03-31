import React, { useState } from 'react'
import { Modal, Button } from 'antd';
function RealtimeChat() {
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    function sendChat() {
        alert('In Progress!');
    }
    function showModal() {
        setVisible(true)
    };

    const handleOk = () => {
        setLoading(true);
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
                        </div>
                    </div>
                    <div className="chatFooterParent absolute bottom-[-7.5%] left-0 w-full h-[15%] px-2 flex justify-center ">
                        <div className="chat-footer flex justify-evenly w-[80%] bg-[#be2c6a] h-full rounded-lg ">
                            <input type='text' className="chat-textarea outline-none w-2/3 px-3 text-white placeholder-white bg-transparent" placeholder="Type a message..." />
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
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                    <Button
                        key="link"
                        href="https://google.com"
                        type="primary"
                        loading={loading}
                        onClick={handleOk}
                    >
                        Search on Google
                    </Button>
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

        </>
    )
}

export default RealtimeChat