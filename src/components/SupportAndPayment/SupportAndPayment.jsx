'use client'
import { useState, useEffect } from "react";
import { FaUser, FaCheck } from "react-icons/fa";

const SupportAndPayment = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentSupports, setRecentSupports] = useState([
    {
      id: 1,
      name: "John Doe",
      amount: 30,
      message: "Keep up the great work!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      id: 2,
      name: "Sarah Smith",
      amount: 20,
      message: "Amazing content!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    {
      id: 3,
      name: "Mike Johnson",
      amount: 50,
      message: "Supporting your journey!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    }
  ]);

  const predefinedAmounts = [10, 20, 30];

  const validateForm = () => {
    const newErrors = {};
    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    if (message.length > 200) {
      newErrors.message = "Message must not exceed 200 characters";
    }
    if (!selectedAmount && !customAmount) {
      newErrors.amount = "Please select or enter an amount";
    }
    if (customAmount && (isNaN(customAmount) || Number(customAmount) <= 0)) {
      newErrors.customAmount = "Please enter a valid amount";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const amount = customAmount || selectedAmount;
      const newSupport = {
        id: recentSupports.length + 1,
        name,
        amount: Number(amount),
        message,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
      };

      setRecentSupports([newSupport, ...recentSupports.slice(0, 4)]);
      setShowSuccess(true);
      setName("");
      setMessage("");
      setSelectedAmount(null);
      setCustomAmount("");

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Support Messages */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Support</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {recentSupports.map((support) => (
                <div
                  key={support.id}
                  className="bg-white rounded-lg p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={support.avatar}
                      alt={support.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1599566150163-29194dcaad36";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{support.name}</h3>
                      <p className="text-green-600 font-semibold">${support.amount}</p>
                      <p className="text-gray-500 text-sm">{support.message}</p>
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Leave a supportive message (optional)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {message.length}/200 characters
                </p>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Amount *
                </label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-2 px-4 rounded-md ${
                        selectedAmount === amount
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div>
                  <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700">
                    Custom Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="customAmount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="mt-1 block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  {errors.customAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.customAmount}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!name || (!selectedAmount && !customAmount)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Support Now
              </button>
            </form>

            {showSuccess && (
              <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                <FaCheck className="h-5 w-5" />
                <span>Thank you for your support!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAndPayment;
