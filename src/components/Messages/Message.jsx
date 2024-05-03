import React, { useState } from 'react'
import InputBar from './InputBar/InputBar'
import MessageBubble from './MessageBubble/MessageBubble'
import MessageArea from './MessageArea/MessageArea';
import profilePhoto from '../../assets/user_profile.png'

const Message = ({ profile, profileName }) => {
    const [value, setValue] = useState("");
    const [messages, setMessage] = useState([])
    const handleSend = () => {
        if (value !== "") {
            setMessage([...messages, value]);
            setValue("")
        }
    }
    console.log(messages);
    return (
        <>
            <div className='w-full pl-[1rem] h-[4.3rem] bg-primary gap-[1rem]   flex justify-start items-center  rounded-tl-[9px] rounded-tr-[9px]  border-b border-primary'>
                <img src={profile ? profile : profilePhoto} alt="" className='h-[3rem] rounded-full' />
                <div className='text-center text-lg font-semibold  text-[white]' >{profileName}</div>
                {/* <h3 className="text-[25px] font-[500] mb-5 ">Messages</h3> */}
            </div>
            <div className='w-full h-[90%] p-[1rem] pl-[2rem] pr-[2rem] flex flex-col gap-[2rem]'>
                <div className='h-[80%]'>
                    {messages.length === 0 ? <div className='h-full w-full text-[2rem] text-[#CCCCCC] font-[700]  flex items-center justify-center'>No Messages yet</div> :
                        <MessageArea>
                            {messages.map((message, index) => (
                                <MessageBubble
                                    key={index}
                                    sender="user"
                                    message={message}
                                />
                            ))}
                        </MessageArea>}
                </div>
                <div className=''>
                    <InputBar
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onSend={handleSend}
                    />
                </div>
            </div >
        </>
    )
}

export default Message