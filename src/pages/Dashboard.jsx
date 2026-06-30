import { useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Users,
  LogOut,
  Trash2,
  Edit3,
  Filter,
  Calendar,
  ShieldCheck,
  Image,
  X,
  Plus,
  AlertTriangle,
  MessageSquare,
  Menu,
} from "lucide-react";

import FeedbackDashboard from "./FeedbackDashboard";

const initialMembers = [
  {
    id: "1",
    fullName: "Ahmed Salama",
    role: "Chairman",
    memberType: "High Board",
    boardYear: 2026,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    id: "2",
    fullName: "Sara Mostafa",
    role: "Vice Chairman",
    memberType: "High Board",
    boardYear: 2026,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "3",
    fullName: "Omar Khaled",
    role: "PR Head",
    memberType: "Head",
    boardYear: 2025,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "4",
    fullName: "Nour Ali",
    role: "Web Development Member",
    memberType: "Member",
    boardYear: 2026,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [members, setMembers] = useState(initialMembers);
  const [typeFilter, setTypeFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    fullName: "",
    role: "",
    memberType: "Member",
    boardYear: 2026,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const triggerDeleteModal = (id) => {
    setMemberIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setMembers(members.filter((m) => m.id !== memberIdToDelete));
    setIsDeleteModalOpen(false);
    setMemberIdToDelete(null);
  };

  const openAddModal = () => {
    setCurrentMember({
      fullName: "",
      role: "",
      memberType: "Member",
      boardYear: 2026,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (member) => {
    setCurrentMember(member);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveMember = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMembers(
        members.map((m) => (m.id === currentMember.id ? currentMember : m)),
      );
    } else {
      const newMember = {
        ...currentMember,
        id: Date.now().toString(),
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      };
      setMembers([...members, newMember]);
    }
    setIsModalOpen(false);
  };

  const filteredMembers = members.filter((member) => {
    const matchType = typeFilter === "All" || member.memberType === typeFilter;
    const matchYear =
      yearFilter === "All" || member.boardYear.toString() === yearFilter;
    return matchType && matchYear;
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight text-white">
                IEEE Al-Azhar
              </h2>
              <span className="text-xs text-blue-400">Admin Panel</span>
            </div>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl text-sm transition border ${
              location.pathname === "/dashboard" ||
              location.pathname === "/dashboard/"
                ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                : "text-slate-400 hover:bg-slate-800/50 border-transparent"
            }`}
          >
            <Users size={18} /> Board Members
          </Link>
          <Link
            to="/dashboard/feedback"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl text-sm transition border ${
              location.pathname === "/dashboard/feedback"
                ? "bg-blue-600/10 text-blue-400 border-blue-500/20"
                : "text-slate-400 hover:bg-slate-800/50 border-transparent"
            }`}
          >
            <MessageSquare size={18} /> Feedback
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition w-full mt-auto"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans flex relative">
      {/* 💻 Sidebar للديسك توب */}
      <aside className="w-64 bg-[#1E293B] border-r border-slate-700/50 p-6 hidden md:block shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-64 bg-[#1E293B] border-r border-slate-700 h-full p-6 flex flex-col animate-in slide-in-from-left duration-200">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden flex items-center justify-between p-4 bg-[#1E293B] border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={20} />
            <span className="font-bold text-xs text-white">IEEE Panel</span>
          </div>
          <button
            className="p-2 text-slate-400 hover:text-white bg-[#0F172A] rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={
                <main className="p-4 md:p-10 max-w-7xl mx-auto w-full space-y-8">
                  <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Board Members
                      </h1>
                      <p className="text-slate-400 text-sm mt-1">
                        Manage and update the IEEE student branch council
                        records.
                      </p>
                    </div>
                    <button
                      onClick={openAddModal}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-500/10 transition flex items-center justify-center gap-2 text-sm self-start sm:self-auto"
                    >
                      <Plus size={16} /> Add Member
                    </button>
                  </header>

                  <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                        <Users size={24} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">
                          Total Council
                        </span>
                        <span className="text-2xl font-bold text-white">
                          {members.length}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">
                          High Board
                        </span>
                        <span className="text-2xl font-bold text-white">
                          {
                            members.filter((m) => m.memberType === "High Board")
                              .length
                          }
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">
                          Current Year
                        </span>
                        <span className="text-2xl font-bold text-white">
                          {members.filter((m) => m.boardYear === 2026).length}
                        </span>
                      </div>
                    </div>
                  </section>

                  <section className="bg-[#1E293B] p-4 rounded-2xl border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Filter size={16} /> Filter by:
                      </div>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="bg-[#0F172A] border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                      >
                        <option value="All">All Types</option>
                        <option value="High Board">High Board</option>
                        <option value="Head">Head</option>
                        <option value="Vice Head">Vice Head</option>
                        <option value="Member">Member</option>
                      </select>
                      <select
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="bg-[#0F172A] border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                      >
                        <option value="All">All Years</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                    <span className="text-xs text-slate-400">
                      Showing {filteredMembers.length} records
                    </span>
                  </section>

                  <section className="bg-[#1E293B] rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-[#131C2E] border-b border-slate-700/50 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                            <th className="py-4 px-6">Member Info</th>
                            <th className="py-4 px-6">Official Role</th>
                            <th className="py-4 px-6">Classification</th>
                            <th className="py-4 px-6">Board Year</th>
                            <th className="py-4 px-6 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/40 text-sm">
                          {filteredMembers.map((member) => (
                            <tr
                              key={member.id}
                              className="hover:bg-slate-800/40 transition"
                            >
                              <td className="py-4 px-6 flex items-center gap-3">
                                <img
                                  src={member.avatar}
                                  alt={member.fullName}
                                  className="w-9 h-9 rounded-full object-cover border border-slate-600"
                                />
                                <span className="font-semibold text-white">
                                  {member.fullName}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-slate-300">
                                {member.role}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    member.memberType === "High Board"
                                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                      : member.memberType === "Head"
                                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                        : "bg-slate-600/20 text-slate-400"
                                  }`}
                                >
                                  {member.memberType}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-slate-400">
                                {member.boardYear}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex justify-center items-center gap-2">
                                  <button
                                    onClick={() => openEditModal(member)}
                                    className="p-1.5 hover:bg-blue-500/10 text-blue-400 rounded-lg transition"
                                    title="Edit"
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      triggerDeleteModal(member.id)
                                    }
                                    className="p-1.5 hover:bg-red-500/10 text-red-400 rounded-lg transition"
                                    title="Delete"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </main>
              }
            />

            <Route path="/feedback" element={<FeedbackDashboard />} />
          </Routes>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999999] flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-700">
              <h3 className="text-lg font-bold text-white">
                {isEditing ? "Edit Board Member" : "Add New Council Member"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={currentMember.fullName}
                  onChange={(e) =>
                    setCurrentMember({
                      ...currentMember,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Mahmoud Ahmed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                  Role Description
                </label>
                <input
                  type="text"
                  required
                  value={currentMember.role}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, role: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Logistics Head"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                    Member Type
                  </label>
                  <select
                    value={currentMember.memberType}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        memberType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="High Board">High Board</option>
                    <option value="Head">Head</option>
                    <option value="Vice Head">Vice Head</option>
                    <option value="Member">Member</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                    Board Year
                  </label>
                  <input
                    type="number"
                    required
                    value={currentMember.boardYear}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        boardYear: parseInt(e.target.value) || 2026,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                  Avatar Image
                </label>
                <div className="border border-dashed border-slate-600 rounded-xl p-4 text-center cursor-not-allowed text-xs text-slate-500 flex items-center justify-center gap-2 bg-[#0F172A]">
                  <Image size={16} />{" "}
                  <span>Images managed via Cloudinary in production</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 shadow-lg shadow-blue-500/10 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999999] flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl w-full max-w-sm p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Confirm Destruction
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Are you sure you want to completely remove this member from the
              IEEE database? This action is irreversible.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700 transition"
              >
                No, Keep Member
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
    </div>
  );
}

export default Dashboard;
