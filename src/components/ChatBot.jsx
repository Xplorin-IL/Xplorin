import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Halo! What can I help you?',
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setWebcamActive(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Tidak dapat mengakses webcam. Pastikan Anda memberikan izin.');
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setWebcamActive(false);
    }
  };

  const captureFromWebcam = async () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageData = canvasRef.current.toDataURL('image/png');
      await identifyImage(imageData);
      stopWebcam();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result;
        await identifyImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyImage = async (imageData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/food/identify', {
        image: imageData
      });

      const result = response.data.data;
      const newMessage = {
        id: messages.length + 1,
        sender: 'assistant',
        text: `Ini adalah ${result.foodName}. ${result.description}`,
        type: 'text'
      };
      setMessages([...messages, newMessage]);
    } catch (error) {
      console.error('Error identifying food:', error);
      const errorMessage = {
        id: messages.length + 1,
        sender: 'assistant',
        text: 'Maaf, saya tidak dapat mengidentifikasi gambar. Silakan coba lagi.',
        type: 'text'
      };
      setMessages([...messages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      type: 'text'
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/chat', {
        message: inputValue
      });

      const assistantMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: response.data.data.reply || 'Maaf, saya sedang memproses pertanyaan Anda.',
        type: 'text'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        sender: 'assistant',
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickCategories = [
    { id: 1, label: 'Olahan Ikan' },
    { id: 2, label: 'Berkuah Segar' },
    { id: 3, label: 'Makanan Berat' },
    { id: 4, label: 'Camilan & Manis' }
  ];

  return (
    <>
      {/* Chat Box */}
      <div className="w-full lg:w-1/2 mx-auto bg-white rounded-3xl border-4 border-red-900 shadow-2xl flex flex-col h-auto lg:h-auto p-0 overflow-hidden mt-auto mb-8">
        <div className="overflow-y-auto space-y-2 p-6 bg-gray-50 h-48">
          {messages.map((msg) => (
            <div key={msg.id}>
              <p className="text-xs font-semibold text-gray-600 mb-1 uppercase">
                {msg.sender === 'user' ? '👤 USER' : '🤖 CIKO'}
              </p>
              <div
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
               <div
                className={`max-w-xs lg:max-w-sm px-3 py-1.5 rounded-[12px] border border-[#7b1c1c] shadow-sm ${
                    msg.sender === 'user'
                    ? 'bg-red-900 text-white border-red-900'
                    : 'bg-white text-[#7b1c1c]'
                }`}
               >

                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1 uppercase">
                🤖 CIKO
              </p>
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 px-4 py-2 rounded-lg border-2 border-red-900">
                  <p className="text-sm">Sedang memproses...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="px-6 py-3 border-t-2 border-gray-300 bg-white">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setInputValue(cat.label)}
                className="bg-red-900 hover:bg-red-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-3 border-t-2 border-gray-300 bg-white">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-red-900 hover:bg-red-800 text-white p-1.5 rounded-full transition-colors flex-shrink-0 w-9 h-9 flex items-center justify-center"
                title="Upload foto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <button
                onClick={() => webcamActive ? stopWebcam() : startWebcam()}
                className="bg-red-900 hover:bg-red-800 text-white p-1.5 rounded-full transition-colors flex-shrink-0 w-9 h-9 flex items-center justify-center"
                title="Webcam"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type here..."
              className="flex-1 px-3 py-1.5 border-2 border-red-900 rounded-full focus:outline-none focus:ring-2 focus:ring-red-900 text-xs"
            />

            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-red-900 hover:bg-red-800 text-white p-1.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 w-9 h-9 flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.40,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99701575 L3.03521743,10.4380088 C3.03521743,10.5951061 3.19218622,10.7522035 3.50612381,10.7522035 L16.6915026,11.5376905 C16.6915026,11.5376905 17.1624089,11.5376905 17.1624089,12.0089827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Webcam Modal */}
      {webcamActive && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Ambil Foto dari Webcam</h2>
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg mb-4" />
            <canvas ref={canvasRef} width={640} height={480} className="hidden" />
            <div className="flex gap-4 justify-center">
              <button
                onClick={captureFromWebcam}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Ambil Foto
              </button>
              <button
                onClick={stopWebcam}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
}

export default ChatBot;
