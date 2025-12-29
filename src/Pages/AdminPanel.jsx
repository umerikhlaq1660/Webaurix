import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const [waitlistUsers, setWaitlistUsers] = useState([]);
  const [businessInquiries, setBusinessInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchAllData();
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      setEmailInput("");
      setPasswordInput("");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setWaitlistUsers([]);
    setBusinessInquiries([]);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch Waitlist Users
      const waitlistSnapshot = await getDocs(query(collection(db, "waitlist")));
      setWaitlistUsers(waitlistSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email || "",
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : ""
        };
      }));

      // Fetch Business Inquiries
      const inquiriesSnapshot = await getDocs(query(collection(db, "businessInquiries")));
      setBusinessInquiries(inquiriesSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          companyName: data.companyName || "",
          companyUrl: data.companyUrl || "",
          budget: data.budget || "",
          categories: Array.isArray(data.categories) ? data.categories.join(", ") : "",
          otherCategoryDetail: data.otherCategoryDetail || "",
          projectDetails: data.projectDetails || "",
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : ""
        };
      }));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 space-y-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="space-y-12">
          {/* Waitlist Users */}
          <section>
            <h2 className="text-xl font-bold mb-4">Waitlist Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Joined At</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlistUsers.map((u, idx) => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">{u.email}</td>
                      <td className="py-2 px-4">{u.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Business Inquiries */}
          <section>
            <h2 className="text-xl font-bold mb-4">Business Inquiries</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Phone</th>
                    <th className="py-2 px-4">Company</th>
                    <th className="py-2 px-4">Company URL</th>
                    <th className="py-2 px-4">Budget</th>
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Other Category</th>
                    <th className="py-2 px-4">Project Details</th>
                    <th className="py-2 px-4">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {businessInquiries.map((b, idx) => (
                    <tr key={b.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">{b.firstName} {b.lastName}</td>
                      <td className="py-2 px-4">{b.email}</td>
                      <td className="py-2 px-4">{b.phoneNumber}</td>
                      <td className="py-2 px-4">{b.companyName}</td>
                      <td className="py-2 px-4">{b.companyUrl}</td>
                      <td className="py-2 px-4">{b.budget}</td>
                      <td className="py-2 px-4">{b.categories}</td>
                      <td className="py-2 px-4">{b.otherCategoryDetail}</td>
                      <td className="py-2 px-4">{b.projectDetails}</td>
                      <td className="py-2 px-4">{b.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
