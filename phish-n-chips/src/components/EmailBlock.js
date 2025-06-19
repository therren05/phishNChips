import React from "react";

function EmailItem({ sender, subject, preview, time }) {
  return (
    <section  className="w-1/4 bg-blue-50 border-r border-blue-200 overflow-y-auto">
        {/* Mock Email */}
        <div className="w-full border-b border-blue-200 px-2 py-3 cursor-pointer hover:bg-blue-100">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-black truncate w-4/5">{sender}</span>
                <span className="text-sm text-blue-500">{time}</span>
            </div>
      <div className="truncate text-blue-600 w-full">{subject}</div>
      <div className="truncate text-gray-500 text-sm w-full">{preview}</div>
      </div>
    </section>
  );
}

export default EmailItem;