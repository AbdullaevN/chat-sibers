import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  doc,
  setDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";

const App = () => {
  const [channelName, setChannelName] = useState("");
  const [channels, setChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});  // Инициализация состояния для пользователей

  // Слушаем изменения в коллекции users
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = {};
      snapshot.forEach((doc) => {
        usersData[doc.id] = doc.data();  // Сохраняем данные пользователя
      });
      setUsers(usersData);  // Обновляем состояние пользователей
    });

    return () => unsubscribeUsers();
  }, []);

  // Слушаем изменения в каналах
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "channels"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setChannels(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        // Если пользователь авторизован, добавляем его в коллекцию users, если еще нет
        const userDocRef = doc(db, "users", user.uid);
        getDoc(userDocRef).then((docSnap) => {
          if (!docSnap.exists()) {
            setDoc(userDocRef, {
              displayName: user.displayName || "Неизвестный",
              email: user.email,
              uid: user.uid,
            });
          }
        });
      }
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  // Слушаем изменения в сообщениях выбранного канала
  useEffect(() => {
    if (selectedChannel) {
      const unsubscribe = onSnapshot(
        query(collection(db, `channels/${selectedChannel.id}/messages`), orderBy("createdAt")),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
      );
      return () => unsubscribe();
    }
  }, [selectedChannel]);

  const handleAddChannel = async () => {
    if (channelName.trim() === "") return;
    await addDoc(collection(db, "channels"), {
      name: channelName,
      createdAt: serverTimestamp(),
      createdBy: user.uid,
      participants: [user.uid],
    });
    setChannelName("");
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    await addDoc(collection(db, `channels/${selectedChannel.id}/messages`), {
      text: message,
      createdAt: serverTimestamp(),
      sender: user.uid,
      name: user.displayName || "Неизвестный",  // Имя пользователя добавляется в сообщение
    });
    setMessage("");
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const filteredChannels = channels.filter((channel) =>
    channel.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      {user ? (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Real-Time Chat</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter channel name"
              className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddChannel}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Create Channel
            </button>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search channels"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-3">Channels</h2>
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="p-3 mb-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => setSelectedChannel(channel)}
                >
                  {channel.name}
                </div>
              ))}
            </div>

            {selectedChannel && (
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold mb-3">{selectedChannel.name}</h2>
                <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded-lg ${
                        msg.sender === user.uid
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <strong>{users[msg.sender]?.displayName || "Неизвестный"}:</strong> {msg.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                    className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-lg font-medium text-gray-600">
          Please log in to continue.
        </div>
      )}
    </div>
  );
};

export default App;
