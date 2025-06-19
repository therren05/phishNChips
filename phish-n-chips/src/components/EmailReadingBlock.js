import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaFish } from "react-icons/fa6";

function EmailReadingPane({ 
  subject, 
  senderName, 
  senderImageUrl, 
  recipient, 
  body, 
  attachment // { name: string, size: string } or null/undefined
}) {
  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto bg-white text-black">
      {/* Subject */}
      <h1 className="text-[calc(120%)] font-bold mb-6">{subject}</h1>

      {/* Header */}
      <div className="flex items-center justify-between">
        { /* Sender & Recipient Info */}
        <div className="flex items-center mb-6">
          {/* Profile Picture */}
          {senderImageUrl && (
            <img 
              src={senderImageUrl} 
              alt={`${senderName} profile`} 
              className="w-12 h-12 rounded-full mr-4 object-cover" 
            />
          )}

          {/* Sender & Recipient */}
          <div>
            <div className="text-lg font-semibold">{senderName}</div>
            <div className="text-sm text-gray-600">{recipient}</div>
          </div>
        </div>

        <div className="flex mt-[calc(-25px)] border border-gray-300 rounded overflow-hidden ">
          <button title="Trash" className="px-2 py-1 text-red-500 text-[calc(120%)] bg-white text-black border-r border-gray-300 hover:bg-blue-100 rounded-l">
            <FaTrashAlt/>
          </button>
          <button title="Reply" className="px-1 py-1 text-purple-800 text-[calc(150%)] bg-white text-black border-r border-gray-300 hover:bg-blue-100">
            <TiArrowBack/>
          </button>
          <button title="Forward" className="px-1 py-1 text-blue-800 text-[calc(150%)] bg-white text-black border-r border-gray-300 hover:bg-blue-100">
            <IoIosArrowRoundForward/>
          </button>
          <button title="Report" className="px-2 py-1 text-red-800 text-[calc(120%)] bg-white text-black border-gray-300 hover:bg-blue-100 rounded-r">
            <FaFish/>
          </button>
        </div>
      </div>

      {/* Attachment (conditionally rendered) */}
      {attachment && (
        <button 
          className="mb-6 p-1 w-[calc(25%)] border border-gray-300 rounded hover:bg-gray-100 text-left cursor-pointer"
          type="button"
        >
          <div className="truncate font-medium">{attachment.name}</div>
          <div className="text-sm text-gray-500">{attachment.size}</div>
        </button>
      )}

      {/* Email Body */}
      <div className="text-sm whitespace-pre-wrap">{body}</div>
    </div>
  );
}

export default EmailReadingPane;
