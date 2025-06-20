import React, { useState } from "react";
import styles from './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import './index.css';
import './GamePage.css';
import EmailBlock from "./components/EmailBlock.js";
import EmailReadingBlock from "./components/EmailReadingBlock.js";


function GamePage() {
  const [page, setPage] = useState(0);
  const visibleData = leaderboardData.slice(page * 20, (page + 1) * 20);
  const [selectedBoard, setSelectedBoard] = useState("all");
  const [leaderboardData, setLeaderBoardData] = useState([]);

  const sidebarItems = [
    { label: "Inbox", count: 4 },
    { label: "Sent", count: 0 },
    { label: "Drafts", count: 2 },
    { label: "Spam", count: 1 },
    { label: "Trash", count: 0 },
  ];

  //server call
  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/viewLogs", {
        auth: {
          username: "admin",
          password: "pass123!",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLeaderBoardData(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  //call server on load
  useEffect(() => {
    fetchLogs();
  }, []);

  const location = useLocation();
  const userInput = location.state?.userInput || ''; //user inputed alias variable

  return (
    <div className="font-semibold bg-[#ED1D24] min-h-screen text-white relative pt-6">

    {/* Main White Container */}
    <div className="h-[calc(100vh)] flex flex-col p-4 bg-white text-blue-800 rounded-xl shadow-lg mx-10">

        {/* Timer Label */}
        <div className="flex float-right justify-end w-full z-50 text-black text-lg pr-2">Timer: 60</div>

        {/* Outlook-Container Section */}
        <div className="h-[calc(100vh)] flex flex-col bg-white border border-gray-300 mt-2">

            {/* Top Navigation Bar */}
            <div className="flex justify-between items-center py-2 border-b border-blue-200">
            <div className="flex items-center gap-4">
                <div className="font-bold text-2xl ml-2">MyInlook</div>
                <div className="relative">
                    <span className="absolute left-2 top-1/2 ml-12 transform -translate-y-1/2 text-blue-500 text-lg">&#x1F50E;&#xFE0E;</span>
                        <input
                         type="text"
                         placeholder="Search"
                         className="px-2 py-1 pl-10 w-[calc(30vw)] ml-12 rounded bg-blue-100 border border-blue-300 text-blue-800 placeholder-blue-500"
                         />
                </div>
            </div>
            <div className="rounded-full w-10 h-10 bg-blue-300 mr-3" />
            </div>

            {/* Header Bar */}
            <div className="flex space-x-6 px-4 py-2 border-b border-blue-200 bg-blue-50">
            {['File', 'Home', 'Send/Receive', 'View', 'Help'].map((tab) => (
                <button key={tab} className="hover:underline">{tab}</button>
            ))}
            </div>

            {/* Main Layout */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <aside className="w-44 bg-blue-100 border-r border-blue-200 space-y-1 text-black">
                    {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center w-full px-2 py-2 hover:bg-blue-200 rounded cursor-pointer"
                    >
                        <span className="truncate w-3/4">{item.label}</span>
                        <span className="text-sm text-blue-700 text-right w-1/4">{item.count > 0 ? item.count : ''}</span>
                    </div>
                    ))}
                </aside>

                {/* Message List */}
                <EmailBlock
                    sender="Johnathan Longlastname"
                    subject="Meeting Follow-up Regarding Our Q2 Strategy Session Plan"
                    preview="Thanks for attending the meeting today. I've attached the notes and key takeaways so we can stay aligned going forward..."
                    time="2:45 PM"
                />

                {/* Reading Pane */}
                <section className="flex-grow bg-blue-50 relative">
                <EmailReadingBlock 
                    subject="Meeting Follow-up Regarding Our Q2 Strategy Session Plan"
                    senderName="Johnathan Longlastname"
                    senderImageUrl="https://randomuser.me/api/portraits/men/14.jpg" // example URL
                    recipient="me@example.com"
                    attachment={{ name: "Q2_Plasdfs rtretertert ert rre ern.pdf", size: "2.4 MB" }} // pass null if no attachment
                    body={`Thanks for attending the meeting today. I've attached the notes and key takeaways so we can stay aligned going forward...\n\nLet me know if you have any questions.`}
                />
                </section>
            </div>

            {/* Footer Bar */}
            <div className="h-6 bg-blue-100 border-t border-blue-200"></div>
        </div>

            {/* Submit Button */}
            {/* <div className="p-4 flex justify-end">
                <button className="bg-blue-600 text-white px-10 py-4 rounded-lg text-xl font-semibold shadow-md hover:bg-blue-700">
                    Submit
                </button>
            </div> */}
    </div>

        {/* Curve */}
       <div className="svg-curve pt-[calc(20vh)]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      {/* Scrollable Section */}
      <div className="bg-white text-[#ED1D24] px-4 py-8">
        {/* Leaderboard Label */}
        <div className="w-3/4 mx-auto mb-6">
            <h2 className="text-4xl font-bold text-left mb-6 ">Leaderboard</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => {setSelectedBoard("all"); fetchLogs()}}
              style={{
                backgroundColor: selectedBoard === "all" ? "#cccccc" : "#ffffff",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              All Time
            </button>

            <button
              onClick={() => {setSelectedBoard("weekly"); fetchLogs()}}
              style={{
                backgroundColor: selectedBoard === "weekly" ? "#cccccc" : "#ffffff",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Weekly
            </button>
          </div>

        {/* Leaderboard */}
        <div className="mx-auto w-3/4 rounded-xl overflow-hidden shadow-lg">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-red-200">
              <tr>
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((entry) => (
                <tr key={entry.rank} className="even:bg-red-50 hover:bg-red-100 cursor-pointer">
                  <td className="py-2 px-4 border-t border-red-100">{entry.rank}</td>
                  <td className="py-2 px-4 border-t border-red-100">{entry.username}</td>
                  <td className="py-2 px-4 border-t border-red-100">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="bg-[#ED1D24] text-white px-5 py-2 rounded-md hover:bg-red-700"
          >
            Back
          </button>
          <button
            onClick={() => setPage((p) => (p + 1) * 20 < leaderboardData.length ? p + 1 : p)}
            className="bg-[#ED1D24] text-white px-5 py-2 rounded-md hover:bg-red-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
