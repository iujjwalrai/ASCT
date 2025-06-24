import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const socket = io(`${process.env.REACT_APP_ASCT_BASE_API_URL}`, {
  withCredentials: true,
});

const ADMIN_ID = "admin";

const AdminHelpDesk = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/helpdesk/users`
      );
      setUserList(new Set(res.data));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.emit("register", { userId: ADMIN_ID });

    socket.on("receive_message", (msg) => {
      if (msg.from !== ADMIN_ID) {
        setUserList((prev) => new Set(prev).add(msg.from));
      }

      if (msg.from === selectedUser || msg.to === selectedUser) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser]);

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/helpdesk/messages/${userId}`,
        {
          withCredentials: true,
        }
      );

      const sorted = res.data.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      setMessages(sorted);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      const msgObj = {
        from: ADMIN_ID,
        to: selectedUser,
        message,
      };
      socket.emit("send_message", msgObj);
      setMessages((prev) => [...prev, msgObj]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full md:max-w-xs border-r border-gray-700 p-4 bg-[#1e293b]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mb-4 text-sm text-red-600 hover:text-green-500 underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-xl font-semibold mb-4">Active Users</h2>
        <div className="space-y-2 max-h-[80vh] overflow-y-auto custom-scroll">
          {[...userList].map((userId) => (
            <div
              key={userId}
              className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                selectedUser === userId
                  ? "bg-indigo-600"
                  : "bg-[#334155] hover:bg-[#475569]"
              }`}
              onClick={() => {
                setSelectedUser(userId);
                setMessages([]);
                fetchMessages(userId);
              }}
            >
              {userId}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
        <div className="flex-1 p-4 overflow-y-auto custom-scroll space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-lg px-4 py-3 rounded-2xl text-sm shadow-md ${
                msg.from === ADMIN_ID
                  ? "bg-indigo-600 text-white self-end ml-auto"
                  : "bg-white text-black self-start mr-auto"
              }`}
            >
              <strong className="block mb-1 text-xs text-gray-300">
                {msg.from === ADMIN_ID ? "You" : msg.from}
              </strong>
              {msg.message}
            </div>
          ))}
        </div>

        {/* Input Section */}
        {selectedUser && (
          <div className="p-4 border-t border-gray-700 bg-[#1e293b]">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-3 rounded-xl bg-[#0f172a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 border border-gray-700"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow-md transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHelpDesk;
