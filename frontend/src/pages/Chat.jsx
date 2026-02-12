import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Send, User, MessageSquare } from "lucide-react";

const Chat = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const startChatWith = searchParams.get("userId");

    const [conversations, setConversations] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef();

    // 1. Fetch Conversations on Load
    useEffect(() => {
        fetchConversations();
        const interval = setInterval(fetchConversations, 5000); // Polling for new convos
        return () => clearInterval(interval);
    }, []);

    // 2. Handle Initial "Chat with Seller" redirect
    useEffect(() => {
        if (startChatWith && conversations.length > 0) {
            const existingConvo = conversations.find(c => c._id === startChatWith);
            if (existingConvo) {
                setActiveChat(existingConvo);
            } else {
                // If new chat (not in list), we can temporarily set a "ghost" active chat
                // or just wait for the user to send the first message via ProductDetails api call
                // For now, let's assume ProductDetails sends the first message to initiate.
            }
        }
    }, [startChatWith, conversations]);

    // 3. Fetch Messages for Active Chat
    useEffect(() => {
        if (!activeChat) return;

        const fetchMessages = async () => {
            try {
                const { data } = await api.get(`/chat/${activeChat._id}`);
                setMessages(data);
                scrollToBottom();
            } catch (error) {
                console.error("Failed to fetch messages", error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Polling for messages
        return () => clearInterval(interval);
    }, [activeChat]);

    const fetchConversations = async () => {
        try {
            const { data } = await api.get("/chat/conversations");
            setConversations(data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch conversations", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeChat) return;

        try {
            const { data } = await api.post("/chat", {
                receiverId: activeChat._id,
                content: newMessage,
            });
            setMessages([...messages, data]);
            setNewMessage("");
            scrollToBottom();
            fetchConversations(); // Update last message in sidebar
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 h-[calc(100vh-100px)]">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex h-full border border-gray-200">

                {/* Sidebar - Conversations List */}
                <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${activeChat ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <MessageSquare className="text-purple-600" /> Messages
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <p className="p-6 text-center text-gray-500">Loading chats...</p>
                        ) : conversations.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>No conversations yet.</p>
                                <p className="text-sm mt-2">Start chatting from a product page!</p>
                            </div>
                        ) : (
                            conversations.map((chat) => (
                                <div
                                    key={chat._id}
                                    onClick={() => setActiveChat(chat)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${activeChat?._id === chat._id ? "bg-purple-50" : ""}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                            {chat.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className={`w-full md:w-2/3 flex flex-col ${!activeChat ? 'hidden md:flex' : 'flex'}`}>
                    {activeChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center gap-4 bg-gray-50">
                                <button
                                    onClick={() => setActiveChat(null)}
                                    className="md:hidden text-gray-500"
                                >
                                    ← Back
                                </button>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                    {activeChat.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{activeChat.name}</h3>
                                    <p className="text-xs text-green-500 font-medium">Online</p>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                                {messages.map((msg, index) => {
                                    const isMe = msg.sender._id === user._id;
                                    return (
                                        <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${isMe
                                                    ? "bg-purple-600 text-white rounded-tr-none"
                                                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none"
                                                    }`}
                                            >
                                                <p>{msg.content}</p>
                                                <p className={`text-[10px] mt-1 ${isMe ? "text-purple-200" : "text-gray-400"}`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={scrollRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-4">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-purple-500 transition"
                                />
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition shadow-lg hover:shadow-purple-500/30"
                                >
                                    <Send size={20} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                            <MessageSquare size={64} className="mb-4 opacity-20" />
                            <p className="text-lg">Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
