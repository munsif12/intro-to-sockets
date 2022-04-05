import React, { useState } from 'react'
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom'


function RealtimeChatLogin() {

    const navigete = useNavigate()

    const [visible, setVisible] = useState(true)
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');


    const handleOk = (e) => {
        setVisible(false)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        navigete(`/realtime-chat?userName=${userName}&roomName=${roomName}`)
        setVisible(false)
        setUserName('')
        setRoomName('')
    }

    // const handleCancel = () => {
    //     setVisible(false)
    // };
    // function showModal() {
    //     setVisible(true)
    // };
    return (
        <Modal
            visible={visible}
            title="Enter Your Name"
            onOk={handleOk}
            // onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" onClick={handleSubmit} className='text-white bg-[#fa63a382] border-0 rounded-md shadow-[rgb(174 174 174 / 90%) 0px 20px 25px -5px, rgb(253 253 253 / 90%) 0px 10px 10px -5px]'>
                    Submit
                </Button>
            ]}
            style={{
                width: '40%',
                height: '40%',
            }}
        >
            <form className=''>
                {/* create an input */}
                <div className="userName flex flex-col">
                    <label className='text-[#BE2C6A] font-bold'>What's your name ?</label>
                    <input className='h-[3rem] mt-2 outline-none rounded-lg border-2 border-[#BE2C6A] text-[#BE2C6A] pl-4 placeholder-[#BE2C6A]' type="text" name='userName' placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <label className='text-[#BE2C6A] font-bold'>Room ?</label>
                    <input className='h-[3rem] mt-2 outline-none rounded-lg border-2 border-[#BE2C6A] text-[#BE2C6A] pl-4 placeholder-[#BE2C6A]' type="text" name='roomName' placeholder="Room" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                </div>
            </form>
        </Modal>

    )
}

export default RealtimeChatLogin