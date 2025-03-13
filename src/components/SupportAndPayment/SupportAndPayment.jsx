"use client"
import PaymentForm from "../ui/PaymentForm";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SupportAndPayment =({donation}) => {

  const {data :session , status}  = useSession()
  const profileEmail = usePathname().split("/")[2].toLowerCase()
  const [isSameUser, setIsSameUser] = useState(false)

  useEffect(()=>{
    if(status === "loading") return
    if (profileEmail === session.user.email) setIsSameUser(true)
  },[profileEmail,status,session?.user?.email])
  if (status === "loading") return
 
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Support Messages */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Support</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {donation.map((support) => (
                <div
                  key={support.id}
                  className="bg-white rounded-lg p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={support.donar_image}
                      alt={support.donar_name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1599566150163-29194dcaad36";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{support.donar_name}</h3>
                      <p className="text-green-600 font-semibold">${support.donation_amount}</p>
                      <p className="text-gray-500 text-sm">{support.donation_message}</p>
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          {!isSameUser &&  (<PaymentForm/>)}
          
        </div>
      </div>
    </div>
  );
};

export default SupportAndPayment;
