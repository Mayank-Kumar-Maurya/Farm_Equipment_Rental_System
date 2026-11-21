

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ServerContext from "../../Context/ServerContext.js";
// import { showFlashMessage } from "./FlashMessage.jsx";

// const Booking_Request = () => {
//   const { token, server } = useContext(ServerContext);
//   const navigate = useNavigate();

//   const [equipmentList, setEquipmentList] = useState([]);
//   const [myBookings, setMyBookings] = useState([]);
//   const [activeTab, setActiveTab] = useState("incoming");

//   const [loading, setLoading] = useState(true);
//   const [approvingId, setApprovingId] = useState(null);
//   const [error, setError] = useState("");

//   // Fetch incoming requests and bookings made by the logged-in user
//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [incomingResponse, myBookingsResponse] = await Promise.all([
//         server.get("/listedAppointments", {
//           headers: { token },
//         }),
//         server.get("/viewMyBooking", {
//           headers: { token },
//         }),
//       ]);

//       setEquipmentList(
//         incomingResponse.data.myEquipmentsWithBookings || []
//       );

//       setMyBookings(myBookingsResponse.data.myBookings || []);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);

//       setError(
//         err.response?.data?.msg ||
//           "Unable to load booking information."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       setLoading(false);
//       setError("Please log in to view booking information.");
//       return;
//     }

//     fetchRequests();
//   }, [token]);

//   // Combine equipment information with incoming bookings
//   const allBookings = equipmentList.flatMap((equipment) =>
//     (equipment.bookings || []).map((booking) => ({
//       ...booking,
//       equipmentName: equipment.name,
//       equipmentId: equipment._id,
//     }))
//   );

//   // Approve a booking request
//   const handleApprove = async (bookingId) => {
//     if (!bookingId) {
//       setError("Booking ID is missing.");
//       return;
//     }

//     try {
//       setApprovingId(bookingId);
//       setError("");

//       await server.post(
//         `/${bookingId}/approve`,
//         {},
//         {
//           headers: { token },
//         }
//       );

//       showFlashMessage("success", "Booking approved successfully.");

//       await fetchRequests();
//     } catch (err) {
//       console.error("Error approving booking:", err);

//       const message =
//         err.response?.data?.msg ||
//         "Unable to approve this booking.";

//       setError(message);
//       showFlashMessage("error", message);
//     } finally {
//       setApprovingId(null);
//     }
//   };

//   // Reject a booking request
//   const handleReject = async (bookingId) => {
//     if (!bookingId) {
//       setError("Booking ID is missing.");
//       return;
//     }

//     try {
//       setApprovingId(bookingId);
//       setError("");

//       await server.post(
//         `/${bookingId}/reject`,
//         {},
//         {
//           headers: { token },
//         }
//       );

//       showFlashMessage("success", "Booking marked as not approved.");

//       await fetchRequests();
//     } catch (err) {
//       console.error("Error rejecting booking:", err);

//       const message =
//         err.response?.data?.msg ||
//         "Unable to reject this booking.";

//       setError(message);
//       showFlashMessage("error", message);
//     } finally {
//       setApprovingId(null);
//     }
//   };

//   // Handle payment
//   // Connect your payment gateway/API inside this function.

// const initPay =   (order) =>{

//         const options =  {
//           key: import.meta.env.VITE_RAZORPAY_KEY_ID ,
//           amount : order.amount,
//           currency:order.currency,
//           name:'Booking Payment',
//           description: 'Booking Payment',
//           order_id : order.id,
//           receipt : order.receipt,
//           handler : async (response)=>{
//             console.log(response)
//             try{

//               const {data}  = await server.post('/payment/verifyRazorpay',response,{headers:{token}})
//               if(data.success){
//                  myBookingsResponse()
//                  incomingResponse()
//                 navigate('/booking-request')
//               }
//             }
//             catch(err){
//               console.log(err)
//               toast.error(err.message)
//             }
//           }

//         }
//         const rzp = new window.Razorpay(options)
//         rzp.open()

//       }
 
//       useEffect(() => {
//   const script = document.createElement("script");

//   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   script.async = true;

//   script.onload = () => {
//     console.log("Razorpay loaded:", typeof window.Razorpay);
//   };

//   script.onerror = () => {
//     console.error("Failed to load Razorpay SDK");
//   };

//   document.body.appendChild(script);

//   return () => {
//     if (document.body.contains(script)) {
//       document.body.removeChild(script);
//     }
//   };
// }, []);

//   const handlePayment = async (bookingId) => {
//     if (!bookingId) {
//       setError("Booking ID is missing.");
//       return;
//     }
//     try{
//       console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
//       console.log("hello1")
//       console.log(bookingId)
//       const  {data}  = await server.post('/payment/payment-razorpay',{bookingId},{headers:{token}})
//       console.log(data)
//          console.log("hello2")
//       if(data.success){
//            console.log("hello3")
//         initPay(data.order)
//         // console.log(data.order)
//       }
//      }
//      catch(err){
//       console.log(err)
//           setError(err.message)
//      }
//   };

//   // Format booking date
//   const formatDate = (date) => {
//     if (!date) return "Not provided";

//     const parsedDate = new Date(date);

//     if (Number.isNaN(parsedDate.getTime())) {
//       return "Invalid date";
//     }

//     return parsedDate.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Booking status labels
//   const getStatus = (status) => {
//     switch (Number(status)) {
//       case -1:
//         return {
//           label: "Pending",
//           className: "bg-warning text-dark",
//         };

//       case 0:
//         return {
//           label: "Approved",
//           className: "bg-success",
//         };

//       case 1:
//         return {
//           label: "Payment Completed",
//           className: "bg-primary",
//         };

//       case 2:
//         return {
//           label: "Not Approved",
//           className: "bg-danger",
//         };

//       default:
//         return {
//           label: "Unknown",
//           className: "bg-secondary",
//         };
//     }
//   };

//   // Loading screen
//   if (loading) {
//     return (
//       <div className="container py-5 text-center">
//         <div
//           className="spinner-border text-success"
//           role="status"
//         >
//           <span className="visually-hidden">Loading...</span>
//         </div>

//         <p className="text-muted mt-2">
//           Loading booking information...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container-fluid py-5"
//       style={{
//         minHeight: "85vh",
//         backgroundColor: "#f1f4f3",
//       }}
//     >
//       <div className="container">
//         {/* Page heading */}
//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
//           <div>
//             <h2 className="fw-bold mb-1">
//               Booking Management
//             </h2>

//             <p className="text-muted mb-0">
//               Manage equipment requests and track your bookings.
//             </p>
//           </div>

//           <button
//             type="button"
//             className="btn btn-outline-secondary"
//             onClick={() => navigate("/")}
//           >
//             Back
//           </button>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="alert alert-danger" role="alert">
//             {error}
//           </div>
//         )}

//         {/* Section selector */}
//         <div className="d-flex flex-wrap gap-2 mb-4">
//           <button
//             type="button"
//             className={`btn ${
//               activeTab === "incoming"
//                 ? "btn-success"
//                 : "btn-outline-success"
//             }`}
//             onClick={() => setActiveTab("incoming")}
//           >
//             Incoming Requests ({allBookings.length})
//           </button>

//           <button
//             type="button"
//             className={`btn ${
//               activeTab === "mine"
//                 ? "btn-success"
//                 : "btn-outline-success"
//             }`}
//             onClick={() => setActiveTab("mine")}
//           >
//             My Booking Status ({myBookings.length})
//           </button>
//         </div>

//         {/* SECTION 1: Incoming booking requests */}
//         {activeTab === "incoming" && (
//           <div className="card border-0 shadow-sm rounded-3">
//             <div className="card-body">
//               <h5 className="fw-bold mb-1">
//                 Incoming Booking Requests
//               </h5>

//               <p className="text-muted mb-4">
//                 Review requests from customers who want to rent
//                 your equipment.
//               </p>

//               {allBookings.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="fs-1 mb-2">📅</div>

//                   <h6 className="fw-bold">
//                     No Booking Requests Yet
//                   </h6>

//                   <p className="text-muted mb-0">
//                     Requests for your equipment will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table table-hover align-middle mb-0">
//                     <thead className="table-dark">
//                       <tr>
//                         <th>Equipment</th>
//                         <th>Customer</th>
//                         <th>Booking Date</th>
//                         <th>Location</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {allBookings.map((booking) => {
//                         const status = getStatus(
//                           booking.booking_status
//                         );

//                         const customer = booking.who_booked;

//                         return (
//                           <tr key={booking._id}>
//                             <td className="fw-semibold">
//                               {booking.equipmentName}
//                             </td>

//                             <td>
//                               <div className="fw-semibold">
//                                 {customer?.name ||
//                                   customer?.username ||
//                                   "Customer"}
//                               </div>

//                               <small className="text-muted">
//                                 {customer?.email || ""}
//                               </small>
//                             </td>

//                             <td>{formatDate(booking.date)}</td>

//                             <td>
//                               {booking.location || "Not provided"}
//                             </td>

//                             <td>
//                               <span
//                                 className={`badge ${status.className}`}
//                               >
//                                 {status.label}
//                               </span>
//                             </td>

//                             <td>
//                               {Number(booking.booking_status) === -1 ? (
//                                 <div className="d-flex flex-wrap gap-2">
//                                   <button
//                                     type="button"
//                                     className="btn btn-success btn-sm"
//                                     disabled={
//                                       approvingId === booking._id
//                                     }
//                                     onClick={() =>
//                                       handleApprove(booking._id)
//                                     }
//                                   >
//                                     {approvingId === booking._id
//                                       ? "Processing..."
//                                       : "Approve"}
//                                   </button>

//                                   <button
//                                     type="button"
//                                     className="btn btn-danger btn-sm"
//                                     disabled={
//                                       approvingId === booking._id
//                                     }
//                                     onClick={() =>
//                                       handleReject(booking._id)
//                                     }
//                                   >
//                                     {approvingId === booking._id
//                                       ? "Processing..."
//                                       : "Not Approved"}
//                                   </button>
//                                 </div>
//                               ) : (
//                                 <span className="text-muted small">
//                                   No action needed
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* SECTION 2: My bookings */}
//         {activeTab === "mine" && (
//           <div className="card border-0 shadow-sm rounded-3">
//             <div className="card-body">
//               <h5 className="fw-bold mb-1">
//                 My Booking Status
//               </h5>

//               <p className="text-muted mb-4">
//                 Track requests you have submitted to other equipment
//                 owners.
//               </p>

//               {myBookings.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="fs-1 mb-2">📋</div>

//                   <h6 className="fw-bold">
//                     No Bookings Found
//                   </h6>

//                   <p className="text-muted mb-0">
//                     Equipment you request to rent will appear here.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="table-responsive">
//                   <table className="table table-hover align-middle mb-0">
//                     <thead className="table-dark">
//                       <tr>
//                         <th>Equipment</th>
//                         <th>Booking Date</th>
//                         <th>Location</th>
//                         <th>Status</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {myBookings.map((booking) => {
//                         const status = getStatus(
//                           booking.booking_status
//                         );

//                         const isApproved =
//                           Number(booking.booking_status) === 0;

//                         return (
//                           <tr key={booking._id}>
//                             <td className="fw-semibold">
//                               {booking.equipment?.name || "Equipment"}
//                             </td>

//                             <td>{formatDate(booking.date)}</td>

//                             <td>
//                               {booking.location || "Not provided"}
//                             </td>

//                             <td>
//                               <span
//                                 className={`badge ${status.className}`}
//                               >
//                                 {status.label}
//                               </span>
//                             </td>

//                             <td>
//                               {isApproved ? (
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handlePayment(booking._id)
//                                   }
//                                   className="btn btn-primary btn-sm px-3"
//                                 >
//                                   Pay Now
//                                 </button>
//                               ) : (
//                                 <span className="text-muted small">
//                                   {Number(booking.booking_status) === 1
//                                     ? "Payment Completed"
//                                     : "Payment unavailable"}
//                                 </span>
//                               )}
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Booking_Request;




import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServerContext from "../../Context/ServerContext.js";
import { showFlashMessage } from "./FlashMessage.jsx";

const Booking_Request = () => {
  const { token, server } = useContext(ServerContext);
  const navigate = useNavigate();

  const [equipmentList, setEquipmentList] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("incoming");

  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [payingId, setPayingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch incoming requests and my bookings
  const fetchRequests = async () => {
    try {
      setError("");

      const [incomingResponse, myBookingsResponse] = await Promise.all([
        server.get("/listedAppointments", {
          headers: { token },
        }),
        server.get("/viewMyBooking", {
          headers: { token },
        }),
      ]);

      setEquipmentList(
        incomingResponse.data.myEquipmentsWithBookings || []
      );

      setMyBookings(
        myBookingsResponse.data.myBookings || []
      );
    } catch (err) {
      console.error("Error fetching bookings:", err);

      setError(
        err.response?.data?.msg ||
          "Unable to load booking information."
      );
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("Please log in to view booking information.");
      return;
    }

    const loadData = async () => {
      setLoading(true);
      await fetchRequests();
      setLoading(false);
    };

    loadData();
  }, [token]);

  // Load Razorpay checkout script
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onerror = () => {
      console.error("Failed to load Razorpay SDK.");
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Combine equipment information with incoming bookings
  const allBookings = equipmentList.flatMap((equipment) =>
    (equipment.bookings || []).map((booking) => ({
      ...booking,
      equipmentName: equipment.name,
      equipmentId: equipment._id,
    }))
  );

  // Approve booking
  const handleApprove = async (bookingId) => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      return;
    }

    try {
      setApprovingId(bookingId);
      setError("");

      await server.post(
        `/${bookingId}/approve`,
        {},
        { headers: { token } }
      );

      showFlashMessage("success", "Booking approved successfully.");

      await fetchRequests();
    } catch (err) {
      console.error("Error approving booking:", err);

      const message =
        err.response?.data?.msg ||
        "Unable to approve this booking.";

      setError(message);
      showFlashMessage("error", message);
    } finally {
      setApprovingId(null);
    }
  };

  // Reject booking
  const handleReject = async (bookingId) => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      return;
    }

    try {
      setApprovingId(bookingId);
      setError("");

      await server.post(
        `/${bookingId}/rejected`,
        {},
        { headers: { token } }
      );

      showFlashMessage("success", "Booking marked as not approved.");

      await fetchRequests();
    } catch (err) {
      console.error("Error rejecting booking:", err);

      const message =
        err.response?.data?.msg ||
        "Unable to reject this booking.";

      setError(message);
      showFlashMessage("error", message);
    } finally {
      setApprovingId(null);
    }
  };

  // Verify payment on the backend and update the UI
  const verifyPayment = async (response, bookingId) => {
    try {
      const { data } = await server.post(
        "/payment/verifyRazorpay",
        {
          ...response,
          bookingId,
        },
        { headers: { token } }
      );

      if (!data.success) {
        throw new Error(
          data.msg || "Payment verification failed."
        );
      }

      // Immediately update the UI without a page reload.
      setMyBookings((previousBookings) =>
        previousBookings.map((booking) =>
          String(booking._id) === String(bookingId)
            ? { ...booking, booking_status: 1 }
            : booking
        )
      );

      showFlashMessage(
        "success",
        "Payment completed successfully!"
      );

      // Sync the UI with the backend's saved booking status.
      await fetchRequests();
    } catch (err) {
      console.error("Payment verification error:", err);

      const message =
        err.response?.data?.msg ||
        err.message ||
        "Unable to verify payment.";

      setError(message);
      showFlashMessage("error", message);
    } finally {
      setPayingId(null);
    }
  };

  // Open Razorpay checkout
  const initPay = (order, bookingId) => {
    if (!window.Razorpay) {
      setPayingId(null);
      showFlashMessage(
        "error",
        "Payment gateway is still loading. Please try again."
      );
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Booking Payment",
      description: "Equipment Booking Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        await verifyPayment(response, bookingId);
      },

      modal: {
        ondismiss: () => {
          setPayingId(null);
        },
      },

      theme: {
        color: "#198754",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", (response) => {
      console.error("Razorpay payment failed:", response.error);

      setPayingId(null);

      showFlashMessage(
        "error",
        response.error?.description || "Payment failed. Please try again."
      );
    });

    razorpay.open();
  };

  // Start payment
  const handlePayment = async (bookingId) => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      return;
    }

    if (!window.Razorpay) {
      setError("Razorpay is not loaded. Please try again.");
      showFlashMessage("error", "Razorpay is not loaded.");
      return;
    }

    try {
      setPayingId(bookingId);
      setError("");

      const { data } = await server.post(
        "/payment/payment-razorpay",
        { bookingId },
        { headers: { token } }
      );

      if (!data.success || !data.order) {
        throw new Error(
          data.msg || "Unable to create payment order."
        );
      }

      initPay(data.order, bookingId);
    } catch (err) {
      console.error("Payment initialization error:", err);

      const message =
        err.response?.data?.msg ||
        err.message ||
        "Unable to initiate payment.";

      setError(message);
      showFlashMessage("error", message);
      setPayingId(null);
    }
  };

  // Format booking date
  const formatDate = (date) => {
    if (!date) return "Not provided";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Invalid date";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Booking status labels
  const getStatus = (status) => {
    switch (Number(status)) {
      case -1:
        return {
          label: "Pending",
          className: "bg-warning text-dark",
        };

      case 0:
        return {
          label: "Approved",
          className: "bg-success",
        };

      case 1:
        return {
          label: "Payment Completed",
          className: "bg-primary",
        };

      case -2:
        return {
          label: "Not Approved",
          className: "bg-danger",
        };

      default:
        return {
          label: "Unknown",
          className: "bg-secondary",
        };
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="text-muted mt-2">
          Loading booking information...
        </p>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "85vh",
        backgroundColor: "#f1f4f3",
      }}
    >
      <div className="container">
        {/* Page heading */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              Booking Management
            </h2>

            <p className="text-muted mb-0">
              Manage equipment requests and track your bookings.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className={`btn ${
              activeTab === "incoming"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("incoming")}
          >
            Incoming Requests ({allBookings.length})
          </button>

          <button
            type="button"
            className={`btn ${
              activeTab === "mine"
                ? "btn-success"
                : "btn-outline-success"
            }`}
            onClick={() => setActiveTab("mine")}
          >
            My Booking Status ({myBookings.length})
          </button>
        </div>

        {/* Incoming booking requests */}
        {activeTab === "incoming" && (
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h5 className="fw-bold mb-1">
                Incoming Booking Requests
              </h5>

              <p className="text-muted mb-4">
                Review requests from customers who want to rent your equipment.
              </p>

              {allBookings.length === 0 ? (
                <div className="text-center py-5">
                  <div className="fs-1 mb-2">📅</div>
                  <h6 className="fw-bold">No Booking Requests Yet</h6>
                  <p className="text-muted mb-0">
                    Requests for your equipment will appear here.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Equipment</th>
                        <th>Customer</th>
                        <th>Booking Date</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {allBookings.map((booking) => {
                        const status = getStatus(booking.booking_status);
                        const customer = booking.who_booked;

                        return (
                          <tr key={booking._id}>
                            <td className="fw-semibold">
                              {booking.equipmentName}
                            </td>

                            <td>
                              <div className="fw-semibold">
                                {customer?.name ||
                                  customer?.username ||
                                  "Customer"}
                              </div>

                              <small className="text-muted">
                                {customer?.email || ""}
                              </small>
                            </td>

                            <td>{formatDate(booking.date)}</td>

                            <td>
                              {booking.location || "Not provided"}
                            </td>

                            <td>
                              <span className={`badge ${status.className}`}>
                                {status.label}
                              </span>
                            </td>

                            <td>
                              {Number(booking.booking_status) === -1 ? (
                                <div className="d-flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    disabled={approvingId === booking._id}
                                    onClick={() => handleApprove(booking._id)}
                                  >
                                    {approvingId === booking._id
                                      ? "Processing..."
                                      : "Approve"}
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    disabled={approvingId === booking._id}
                                    onClick={() => handleReject(booking._id)}
                                  >
                                    {approvingId === booking._id
                                      ? "Processing..."
                                      : "Not Approved"}
                                  </button>
                                </div>
                              ) : (
                                <span className="text-muted small">
                                  No action needed
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My bookings */}
        {activeTab === "mine" && (
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h5 className="fw-bold mb-1">
                My Booking Status
              </h5>

              <p className="text-muted mb-4">
                Track requests you have submitted to other equipment owners.
              </p>

              {myBookings.length === 0 ? (
                <div className="text-center py-5">
                  <div className="fs-1 mb-2">📋</div>
                  <h6 className="fw-bold">No Bookings Found</h6>
                  <p className="text-muted mb-0">
                    Equipment you request to rent will appear here.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Equipment</th>
                        <th>Booking Date</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {myBookings.map((booking) => {
                        const status = getStatus(booking.booking_status);
                        const isApproved =
                          Number(booking.booking_status) === 0;

                        const isPaid =
                          Number(booking.booking_status) === 1;

                        const isPaying =
                          String(payingId) === String(booking._id);

                        return (
                          <tr key={booking._id}>
                            <td className="fw-semibold">
                              {booking.equipment?.name || "Equipment"}
                            </td>

                            <td>{formatDate(booking.date)}</td>

                            <td>
                              {booking.location || "Not provided"}
                            </td>

                            <td>
                              <span className={`badge ${status.className}`}>
                                {status.label}
                              </span>
                            </td>

                            <td>
                              {isPaid ? (
                                <span className="text-success fw-semibold">
                                  <i className="bi bi-check-circle-fill me-1"></i>
                                  Payment Completed
                                </span>
                              ) : isApproved ? (
                                <button
                                  type="button"
                                  onClick={() => handlePayment(booking._id)}
                                  disabled={payingId !== null}
                                  className="btn btn-primary btn-sm px-3"
                                >
                                  {isPaying ? (
                                    <>
                                      <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                      />
                                      Processing...
                                    </>
                                  ) : (
                                    "Pay Now"
                                  )}
                                </button>
                              ) : (
                                <span className="text-muted small">
                                  Payment unavailable
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking_Request;
