"use client"
import { handlePaymentForm } from "@/app/actions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const PaymentForm = () => {
    const {data : session, status } = useSession()
    const profileuserEmail = usePathname().split("/")[2]
    if(status === "loading") return
    
    
  return (
    <div className="bg-white dark:bg-gray-800 dark:border dark:border-cyan-950 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold dark:text-slate-200 text-gray-900 mb-6">Support Us</h2>

      <form action={handlePaymentForm} className="space-y-6">
        
        {/* Message Input */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium dark:text-slate-300 text-gray-700"
          >
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="mt-1 p-3 block w-full dark:bg-gray-700 rounded-md  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Leave a supportive message (optional)"
          />
        </div>

        {/* Custom Amount Input */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm dark:text-slate-300 font-medium text-gray-700"
          >
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              className="w-full h-12 px-6 dark:bg-gray-700 rounded-lg border border-gray-300 shadow-sm transition duration-200"
              placeholder="Enter amount"
            />
            <input type="text" hidden name = "donarUserEmail" defaultValue = {session.user.email} />
            <input type="text" hidden name = "receiverUserEmail" defaultValue = {profileuserEmail} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Support Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
