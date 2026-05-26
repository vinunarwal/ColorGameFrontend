// Complaints.jsx - Updated with modern design
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Complaints = () => {
  const navigate = useNavigate();
  const [complaintText, setComplaintText] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!complaintText.trim()) {
      Swal.fire({
        icon: "error",
        title: "Empty Message",
        text: "Please enter your complaint or suggestion before submitting.",
        background: "linear-gradient(145deg, #1e1e3a, #16162e)",
        color: "#fff",
        confirmButtonColor: "#ff6584"
      });
      return;
    }

    Swal.fire({
      title: "Submit Feedback?",
      html: `
        <div style="text-align: left">
          <p style="margin-bottom: 10px"><strong>Subject:</strong> ${subject || "General"}</p>
          <p><strong>Message:</strong> ${complaintText.substring(0, 100)}${complaintText.length > 100 ? "..." : ""}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6c63ff",
      cancelButtonColor: "#ff6584",
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "Cancel",
      background: "linear-gradient(145deg, #1e1e3a, #16162e)",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would typically send the complaint to your backend
        // For now, we'll just show success and navigate
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Thank you for your feedback. We'll get back to you soon.",
          background: "linear-gradient(145deg, #1e1e3a, #16162e)",
          color: "#fff",
          confirmButtonColor: "#38ef7d",
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          navigate("/ProfilePage");
        }, 2000);
      }
    });
  };

  const complaintCategories = [
    { value: "general", label: "General Feedback", icon: "💬" },
    { value: "technical", label: "Technical Issue", icon: "🔧" },
    { value: "payment", label: "Payment Problem", icon: "💰" },
    { value: "suggestion", label: "Suggestion", icon: "💡" },
    { value: "other", label: "Other", icon: "📝" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-[420px] mx-auto px-4 py-4 pb-24">
        
        {/* Header Card */}
        <div className="period-card p-5 mb-4">
          <div className="period-header mb-4">
            <Link to="/ProfilePage" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <div>
                <p className="period-label">FEEDBACK</p>
                <p className="period-value text-lg">Complaints & Suggestions</p>
              </div>
            </Link>
          </div>
          
          <p className="text-white/60 text-xs text-center">
            We value your feedback. Please let us know how we can improve your experience.
          </p>
        </div>

        {/* Complaint Form */}
        <div className="record-container">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">📝 SUBMIT FEEDBACK</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className="block text-white/70 text-sm mb-2 font-medium">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all"
                  required
                >
                  <option value="" className="bg-[#1a1a2e]">Select a category</option>
                  {complaintCategories.map((cat) => (
                    <option key={cat.value} value={cat.label} className="bg-[#1a1a2e]">
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-white/70 text-sm mb-2 font-medium">
                  Your Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  className="resize-none w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:outline-none transition-all h-40 placeholder:text-white/30"
                  placeholder="Please describe your complaint or suggestion in detail..."
                ></textarea>
                <p className="text-white/40 text-xs mt-1 text-right">
                  {complaintText.length}/500 characters
                </p>
              </div>

              {/* Contact Info Note */}
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-400 text-xs flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  We'll respond to your feedback within 24-48 hours via your registered contact
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="record-container mt-4">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">❓ FREQUENTLY ASKED</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-purple-400 font-semibold text-sm">How long does it take to get a response?</p>
                <p className="text-white/60 text-xs mt-1">We typically respond within 24-48 business hours.</p>
              </div>
              
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-purple-400 font-semibold text-sm">What issues can I report?</p>
                <p className="text-white/60 text-xs mt-1">Technical issues, payment problems, game suggestions, or general feedback.</p>
              </div>
              
              <div className="p-3 rounded-xl bg-white/5">
                <p className="text-purple-400 font-semibold text-sm">Will I get a confirmation?</p>
                <p className="text-white/60 text-xs mt-1">Yes, you'll receive a confirmation after successful submission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;