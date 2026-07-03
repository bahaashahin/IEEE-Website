import { useState, useEffect } from "react";
import {
  MessageSquare,
  Trash2,
  Mail,
  User,
  Clock,
  Filter,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useFeedbackQuery } from "../hooks/queries/useFeedbackQuery";
import {
  useUpdateFeedbackStatus,
  useDeleteFeedback,
} from "../hooks/mutations/useFeedbackMutations";
import { FeedbackCardSkeleton, ErrorBanner } from "../components";
import { useSession } from "../lib/auth-client";

type FeedbackStatus = "New" | "Read";
type FeedbackFilter = "All" | FeedbackStatus;

function FeedbackDashboard() {
  const { data: sessionData } = useSession();

  const [statusFilter, setStatusFilter] = useState<FeedbackFilter>("All");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedbackIdToDelete, setFeedbackIdToDelete] = useState<string | null>(
    null
  );

  const {
    data: feedbacks = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFeedbackQuery();

  const { mutate: updateStatus } = useUpdateFeedbackStatus();
  const { mutate: deleteFeedback } = useDeleteFeedback();

  const triggerDeleteModal = (id: string) => {
    setFeedbackIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (feedbackIdToDelete === null) {
      return;
    }

    deleteFeedback({ id: feedbackIdToDelete });
    setIsDeleteModalOpen(false);
    setFeedbackIdToDelete(null);
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    updateStatus({
      id,
      status: currentStatus === "New" ? "Read" : "New",
    });
  };

  const filteredFeedbacks = Array.isArray(feedbacks)
    ? feedbacks.filter((fb: any) => {
        return statusFilter === "All" || fb.status === statusFilter;
      })
    : [];

  return (
    <main className="p-4 md:p-10 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-200">
      <header className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <MessageSquare className="text-blue-500" size={28} /> Users Feedback
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Review, analyze and manage the suggestions and inquiries submitted by
          visitors and members.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
            <MessageSquare size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">
              Total Feedbacks
            </span>
            <span className="text-2xl font-bold text-white">
              {feedbacks.length || 0}
            </span>
          </div>
        </div>
        <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
            <AlertTriangle size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Unread / New</span>
            <span className="text-2xl font-bold text-white">
              {feedbacks.filter((f: any) => f.status === "New").length || 0}
            </span>
          </div>
        </div>
        <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">
              Processed / Read
            </span>
            <span className="text-2xl font-bold text-white">
              {feedbacks.filter((f: any) => f.status === "Read").length || 0}
            </span>
          </div>
        </div>
      </section>

      <section className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Filter size={16} /> Status:
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FeedbackFilter)}
            className="bg-[#0F172A] border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          >
            <option value="All">All Feedbacks</option>
            <option value="New">New Only</option>
            <option value="Read">Archived / Read</option>
          </select>
        </div>
        <span className="text-xs text-slate-400">
          Showing {filteredFeedbacks.length} messages
        </span>
      </section>

      {isError && (
        <ErrorBanner
          message={error?.message || "Failed to load feedbacks."}
          onRetry={refetch}
        />
      )}

      <section className="space-y-4">
        {isLoading ? (
          <>
            <FeedbackCardSkeleton />
            <FeedbackCardSkeleton />
            <FeedbackCardSkeleton />
          </>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="bg-[#1E293B] rounded-2xl p-12 text-center border border-slate-800 text-slate-500">
            No feedback found matching the criteria.
          </div>
        ) : (
          filteredFeedbacks.map((fb: any) => (
            <div
              key={fb._id || fb.id}
              className={`p-5 rounded-2xl border transition flex flex-col gap-4 ${
                fb.status === "New"
                  ? "bg-[#1E293B] border-blue-500/30 shadow-md shadow-blue-500/5"
                  : "bg-[#1E293B]/60 border-slate-800"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-base flex items-center gap-1.5">
                      <User size={14} className="text-slate-400" /> {fb.name}
                    </span>
                    {fb.status === "New" && (
                      <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-blue-500 text-white rounded-full animate-pulse">
                        New Message
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Mail size={12} /> {fb.email}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 self-end sm:self-auto">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />{" "}
                    {new Date(fb.createdAt || fb.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-200 mb-1.5">
                  Subject:{" "}
                  <span className="text-white font-medium">{fb.subject || "No Subject"}</span>
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed bg-[#0F172A]/40 p-4 rounded-xl border border-slate-800/80 whitespace-pre-line">
                  {fb.message}
                </p>
              </div>

              <div className="flex justify-end items-center gap-2 pt-1">
                <button
                  onClick={() => toggleStatus(fb._id || fb.id, fb.status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    fb.status === "New"
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600"
                      : "bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {fb.status === "New" ? "Mark as Read" : "Mark as New"}
                </button>
                <button
                  onClick={() => triggerDeleteModal(fb._id || fb.id)}
                  className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition border border-red-500/10"
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999999] flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Delete Submission
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Are you completely sure you want to remove this feedback? This
              cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                No, Keep it
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-500 shadow-lg shadow-red-500/20 transition"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default FeedbackDashboard;
