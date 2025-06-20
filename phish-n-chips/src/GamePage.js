import React, { useState } from "react";
import styles from './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
import './index.css';
import './GamePage.css';
import EmailBlock from "./components/EmailBlock.js";
import Modal from "./components/Modal.js";
import { startTour } from "./components/TourSteps.js";
import EmailReadingBlock from "./components/EmailReadingBlock.js";
import { useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import { TooltipProvider } from 'react-tooltip';
import { ImExit } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast';
import { driver } from 'driver.js';
import { useCookies } from "react-cookie";
import { FaUser } from 'react-icons/fa';
import 'driver.js/dist/driver.css';



function GamePage() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["tourCompleted"]);
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);
  const addEmail = (newEmail) => {setEmails((prevEmails) => [...prevEmails, newEmail]);};
  const [page, setPage] = useState(0);
  const visibleData = leaderboardData.slice(page * 20, (page + 1) * 20);
  const [selectedBoard, setSelectedBoard] = useState("all");
  const location = useLocation();
  const userInput = location.state?.userInput || ''; //user inputed alias variable
  //modal crap
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = (nickname) => {
    handleSubmit(nickname);
    setModalOpen(false);
  }
  const [begin, setBegin] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

   const handleSubmit = async (nickname) => {
    try {
    const payload = {
      arcadeName: nickname,
      score: 25,
      username: userInput,
    };

    const response = await axios.post('http://localhost:8080/admin/addLog', payload, {
      auth: {
          username: "admin",
          password: "pass123!",
        },
      headers: {
        'Content-Type': 'application/json',
      },
    });

      //setModalOpen(false);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const flipCookie = () => {
    setCookie("tourCompleted", "true", { path: "/"});
  };

  useEffect(() => {
    const handler = () => setBegin(true);
    window.addEventListener('tourComplete', handler);
    flipCookie();
    return () => window.removeEventListener('tourComplete', handler);
  }, []);

  useEffect(() => {
    if(!begin) return;
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      //rng for grabbing email
       if (Math.random() < 0.9) 
        fetchEmails();
      
    }, 1000);

    return () => clearInterval(interval);
  }, [begin, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      openModal();
    }
  }, [timeLeft]);
  
  useEffect(() => {
    fetchLeaderboard();
  }, [selectedBoard]);

  // call server on load
  useEffect(() => {
    fetchLeaderboard();
    window.scrollTo({top: 0, behavior: "auto"});
    if(!cookies.tourCompleted)
       startTour();
    else
       setBegin(true);
  }, []);
  
  const sidebarItems = [
    { label: "Inbox", count: 4 },
    { label: "Sent", count: 0 },
    { label: "Drafts", count: 2 },
    { label: "Spam", count: 1 },
    { label: "Trash", count: 0 },
  ];

  //call to server for leaderboard
  const fetchLeaderboard = async () => {
    try {
      const endpoint = selectedBoard === "all" ? "http://localhost:8080/admin/viewLogs" : "http://localhost:8080/admin/viewWeeklyLogs"
      const response = await axios.get(endpoint, {
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
      console.error("Error fetching leaderboard:", error);
    }
  };

    const fetchEmails = async () => {
    try {
      const endpoint = "http://localhost:1922/email"
      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      addEmail(response.data);
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };


  // On correct answer
  const onCorrect = () => {
    toast.success("Correct", {
      duration: 3000,
      position: "top-center",
      style: {
        color: "black",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });}
    
  //on wrong answer
  const onWrong = () => {
    toast.failure("Error", {
      duration: 3000,
      position: "top-center",
      style: {
        color: "black",
        fontSize: "16px",
        fontWeight: "bold",
      },
    });}

  return (
    <div className="font-semibold bg-[#ED1D24] min-h-screen text-white relative pt-6">
      {/* Modal*/}
        <Modal isOpen={modalOpen} onClose={closeModal} />
      {/* Toast */}
        <Toaster />

    {/* Main White Container */}
    <div className="step1 h-[calc(100%)] flex flex-col p-4 bg-white text-blue-800 rounded-xl shadow-lg mx-10">
      
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left Side - Exit + User Input */}
          <div className="flex items-center gap-4">
            <ImExit
              className="text-black text-4xl hover:text-red-500 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="text-black text-lg z-50">
              {userInput}
            </div>
          </div>

          {/* Right Side - Timer + Button */}
          <div className="flex items-center gap-6">
            {/* Timer Text */}
            <div className="step6 text-black text-lg z-50">
              Timer: {timeLeft}
            </div>

            {/* Play Again Button */}
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>


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
            <FaUser size={20} color="blue" />

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
                <aside className="step2 w-44 bg-blue-100 border-r border-blue-200 space-y-1 text-black">
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
                <div className="w-[calc(20vw)] h-[calc(85vh)] bg-blue-50 border-r border-blue-200 overflow-y-auto">
                  {emails.map((email, index) => (
                    <EmailBlock
                      key={index}
                      sender={email.sender}
                      subject={email.subject}
                      preview={email.body}
                      time={email.timestamp}
                      onClick={() => {
                        setCurrentEmail(email);
                        console.log("Clicked email:", email);
                      }}
                    />
                  ))}
                </div>

                {/* Reading Pane */}
                <section className="step3 flex-grow bg-blue-50 relative">
                {currentEmail &&
                (<EmailReadingBlock 
                    subject={currentEmail.subject ? currentEmail.subject : "NO SUBJECT"}
                    senderName={currentEmail.senderName}
                    senderImageUrl={`https://robohash.org/${Math.floor(Math.random() * 1000)}`} // Random number 0–999
                    recipient={currentEmail.recipient}
                    attachment={{ name: "Q2_Plasdfs rtretertert ert rre ern.pdf", size: "2.4 MB" }} // pass null if no attachment
                    body= {currentEmail.body}
                />)}
                </section>
            </div>

            {/* Footer Bar */}
            <div className="h-6 bg-blue-100 border-t border-blue-200"></div>
        </div>

    </div>

        {/* Curve */}
       <div className="svg-curve pt-[calc(20vh)]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      {/* Scrollable Section */}
      <div className="step7 bg-white text-[#ED1D24] px-4 py-8">
        {/* Leaderboard Label */}
        <div className="w-3/4 mx-auto mb-6">
            <h2 className="text-4xl font-bold text-left mb-6 ">Leaderboard</h2>
        </div>
        <div className="w-3/4 mx-auto mb-4 flex">
          <div>
            <button 
              onClick={() => {setSelectedBoard("all")}}
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
              onClick={() => {setSelectedBoard("weekly")}}
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
  {visibleData.map((entry, index) => (
    
    <tr key={index} className="even:bg-red-50 hover:bg-red-100 cursor-pointer">
      <td className="py-2 px-4 border-t border-red-100">{index + 1}</td>

      <td className="relative group py-2 px-4 border-t border-red-100 cursor-pointer">
        {entry.arcadeName}
        <href className="
            absolute 
            bottom-1/4
            left-1/3 
            -translate-x-[65%]   
            bg-red-500 
            text-white 
            text-m              /* Make text bigger: text-base, text-lg, etc. */
            rounded-lg           /* Larger rounded corners */
            py-4 px-8            
            opacity-0 
            group-hover:opacity-75 
            transition-opacity 
            z-10
            whitespace-nowrap    /* Prevents wrapping if you want a single line */
            shadow-lg            /* Optional: adds nice shadow */
          ">          
          {entry.username}
        </href>
      </td>

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
        <div className="text-xs text-gray-500 mt-4 text-center">
          Page {page+1} of {Math.ceil(leaderboardData.length/20)}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
