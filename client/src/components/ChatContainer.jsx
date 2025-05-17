import React, { useEffect, useRef, useState } from 'react';
import assets, {messagesDummyData} from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollend = useRef(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (scrollend.current) {
      scrollend.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesDummyData]); // Add dependency to scroll when messages change

  const handleSend = () => {
    if (!message.trim() && !image) return;
    // Add your send message logic here
    setMessage('');
    setImage(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return selectedUser ? (
    <div className="h-full flex flex-col backdrop-blur-lg relative">
      {/* ---------- Header ---------- */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img 
          src={selectedUser.profilePic || assets.avatar_icon} 
          alt="profile" 
          className="w-8 rounded-full" 
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden w-6 cursor-pointer"
        />
        <img src={assets.help_icon} alt="Help" className="hidden md:block w-5" />
      </div>

      {/* ---------- Chat Area ---------- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-[80px]">
        {messagesDummyData.map((msg, index) => {
          const isSelf = msg.senderId === '680f50e4f10f3cd28382ecf9';
          return (
            <div
              key={index}
              className={`flex gap-2 items-end ${
                isSelf ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isSelf && (
                <img
                  src={assets.profile_martin}
                  alt="Sender"
                  className="w-7 h-7 rounded-full"
                />
              )}

              <div className={`max-w-[230px] text-sm`}>
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="msg"
                    className="w-full border border-gray-700 rounded-lg overflow-hidden"
                  />
                ) : (
                  <div
                    className={`p-2 rounded-lg text-white break-words ${
                      isSelf
                        ? 'bg-violet-500/30 rounded-br-none'
                        : 'bg-white/20 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <p className={`text-xs text-gray-400 mt-1 ${isSelf ? 'text-right' : 'text-left'}`}>
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>

              {isSelf && (
                <img
                  src={assets.avatar_icon}
                  alt="You"
                  className="w-7 h-7 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollend}></div>
      </div>

      {/* ---------- Bottom Area ---------- */}
      <div className='sticky bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-[#1a1a1a] border-t border-gray-800'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Send a message'
            className='w-full bg-transparent text-sm p-3 border-none outline-none text-white placeholder-gray-400'
          />
          <input 
            type="file" 
            id='image' 
            accept='image/png, image/jpeg' 
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="attach" className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>
        <img 
          src={assets.send_button} 
          alt="send" 
          onClick={handleSend}
          className='w-7 cursor-pointer'
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
      <img src={assets.logo_icon} className="max-w-16" alt="logo" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
