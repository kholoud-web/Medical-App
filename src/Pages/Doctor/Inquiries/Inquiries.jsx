import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInquiries } from "@/RiduxToolkit/Slices/InquirySlice";
import InquiryHeader from "./InquiryHeader";
import InquiryForm from "./InquiryForm";
import InquiryCard from "./InquiryCard";
import InquiryDetailsModal from "./InquiryDetailsModal";


export default function Inquiries() {
  const dispatch = useDispatch();
  
  //  Local state for edit mode
  const [editingInquiryId, setEditingInquiryId] = useState(null);
  const [filter, setFilter] = useState("all"); 

  // Get data from Redux
  const { inquiries, loading, error } = useSelector((state) => state.inquiry);

  // Fetch inquiries when component mounts
  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  //  Filter inquiries based on status
  const getFilteredInquiries = () => {
    if (!inquiries || inquiries.length === 0) return [];
    
    if (filter === "all") {
      return inquiries;
    }
    
    return inquiries.filter(
      (inquiry) => inquiry.status?.toLowerCase() === filter.toLowerCase()
    );
  };

  const filteredInquiries = getFilteredInquiries();

  //  Handle edit inquiry
  const handleEditInquiry = (inquiryId) => {
    setEditingInquiryId(inquiryId);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingInquiryId(null);
  };

  // Render inquiry cards with different states
  const renderInquiryCards = () => {
    // Loading state
    if (loading && inquiries.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading inquiries...</p>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium mb-2">Failed to load inquiries</p>
          <p className="text-red-600 text-sm mb-4">
            {typeof error === "string" ? error : "Something went wrong"}
          </p>
          <button
            onClick={() => dispatch(fetchInquiries())}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
          >
            Retry
          </button>
        </div>
      );
    }

    // Empty state (no inquiries at all)
    if (!inquiries || inquiries.length === 0) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 text-5xl mb-3">📋</div>
          <p className="text-gray-700 font-medium mb-1">No inquiries yet</p>
          <p className="text-gray-500 text-sm">
            Create your first inquiry using the form
          </p>
        </div>
      );
    }

    // Empty state (filtered results)
    if (filteredInquiries.length === 0) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-700 font-medium mb-1">
            No {filter !== "all" ? filter : ""} inquiries found
          </p>
          <p className="text-gray-500 text-sm">Try a different filter</p>
        </div>
      );
    }

    // Display cards
    return filteredInquiries.map((inquiry) => (
      <InquiryCard
        key={inquiry.inquiryId}
        inquiry={inquiry}
        onEdit={() => handleEditInquiry(inquiry.inquiryId)}
        isEditing={editingInquiryId === inquiry.inquiryId}
      />
    ));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <InquiryHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              {editingInquiryId && (
                <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <span className="text-sm text-amber-700 font-medium">
                    Edit mode active
                  </span>
                  <button
                    onClick={handleCancelEdit}
                    className="text-sm text-amber-700 hover:text-amber-900 underline"
                  >
                    Cancel & Create New
                  </button>
                </div>
              )}
              
              <InquiryForm 
                inquiryId={editingInquiryId}
                onSuccess={() => {
                  setEditingInquiryId(null);
                  dispatch(fetchInquiries()); 
                }}
              />
            </div>
          </div>

          {/* Cards Section */}
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="bg-white rounded-lg border shadow-sm p-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setFilter("all")}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("Pending")}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition ${
                    filter === "Pending"
                      ? "bg-amber-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("Completed")}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition ${
                    filter === "Completed"
                      ? "bg-green-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Inquiries Count */}
            {inquiries && inquiries.length > 0 && (
              <div className="flex items-center justify-between text-xs text-gray-500 px-1">
                <span>
                  Showing {filteredInquiries.length} of {inquiries.length} inquiries
                </span>
                {loading && (
                  <span className="flex items-center gap-1">
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-600 border-t-transparent"></div>
                    Refreshing...
                  </span>
                )}
              </div>
            )}

            {/* Inquiry Cards */}
            <div className="space-y-3">
              {renderInquiryCards()}
            </div>

            {/* Refresh Button */}
            {inquiries && inquiries.length > 0 && (
              <button
                onClick={() => dispatch(fetchInquiries())}
                disabled={loading}
                className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 
                bg-white border rounded-lg hover:bg-gray-50 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Refreshing..." : "🔄 Refresh List"}
              </button>
            )}
          </div>
        </div>

        {/* Modal */}
        <InquiryDetailsModal />
      </div>
    </div>
  );
}