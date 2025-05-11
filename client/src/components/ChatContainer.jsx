import React from 'react';
import assets from '../assets/assets';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const messagesDummyData = [
    {
      text: "Hello there!",
      senderId: "other-user-id",
      createdAt: "10:00 AM",
      image: null,
    },
    {
      text: "Hi! How are you?",
      senderId: "680f50e4f10f3cd28382ecf9",
      createdAt: "10:01 AM",
      image: null,
    },
  ];

  return selectedUser ? (
    <div className="h-full flex flex-col backdrop-blur-lg relative">
      {/* ---------- Header ---------- */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img src={assets.profile_martin} alt="profile" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          Martin Johnson
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  {msg.createdAt}
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
