import {
  useEffect,
  useState,
  useRef,
  type SubmitEvent,
  type ChangeEvent,
} from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import {
  Users,
  Trash2,
  Edit3,
  Filter,
  Calendar,
  ShieldCheck,
  Image as ImageIcon,
  X,
  Plus,
  AlertTriangle,
  Menu,
} from "lucide-react";

import FeedbackDashboard from "./FeedbackDashboard";
import { SideBarContent, TableSkeleton, ErrorBanner } from "../components";
import { signOut, useSession } from "../lib/auth-client";
import { useBoardQuery } from "../hooks/queries/useBoardQuery";
import {
  useCreateBoardMember,
  useUpdateBoardMember,
  useDeleteBoardMember,
} from "../hooks/mutations/useBoardMutations";
import { useBoardYearsQuery } from "../hooks";

type BoardMemberType = "officer" | "branding" | "technical" | "operation";
type MemberFilter = "All" | BoardMemberType;

interface CurrentMemberFormState {
  id?: string;
  name: string;
  bio: string;
  position: string;
  memberType: BoardMemberType;
  track: string;
  gender: "male" | "female";
  linkedin_url: string;
  boardYear: number;
}

function Dashboard() {
  const navigate = useNavigate();
  const { data: sessionData } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [typeFilter, setTypeFilter] = useState<MemberFilter>("All");
  const [yearFilter, setYearFilter] = useState("2026");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialFormState: CurrentMemberFormState = {
    name: "",
    bio: "",
    position: "",
    memberType: "officer",
    track: "",
    gender: "male",
    linkedin_url: "",
    boardYear: 2026,
  };

  const [currentMember, setCurrentMember] =
    useState<CurrentMemberFormState>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const { data: boardYears } = useBoardYearsQuery();

  const {
    data: boardData,
    isLoading,
    isError,
    error,
    refetch,
  } = useBoardQuery({
    year:
      yearFilter === "All"
        ? (boardYears?.shift() ?? new Date().getFullYear().toString())
        : yearFilter,
    yearTo: yearFilter === "All" ? boardYears?.pop() : undefined,
    memberType:
      typeFilter === "All"
        ? "officer,technical,branding,operation"
        : typeFilter,
    enabled: !!yearFilter,
  });

  const { mutate: createMember, isPending: isCreating } =
    useCreateBoardMember();
  const { mutate: updateMember, isPending: isUpdating } =
    useUpdateBoardMember();
  const { mutate: deleteMember, isPending: isDeleting } =
    useDeleteBoardMember();

  // Flatten the board data if it comes back grouped
  const membersList = Array.isArray(boardData)
    ? boardData
    : boardData
      ? Object.values(boardData).flat()
      : [];

  const filteredMembers = membersList.filter((member: any) => {
    const matchType = typeFilter === "All" || member.memberType === typeFilter;
    const matchYear =
      yearFilter === "All" || member.boardYear?.toString() === yearFilter;
    return matchType && matchYear;
  });

  const triggerDeleteModal = (id: string) => {
    setMemberIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (memberIdToDelete === null) return;
    deleteMember(
      { id: memberIdToDelete },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setMemberIdToDelete(null);
        },
      },
    );
  };

  const openAddModal = () => {
    setCurrentMember(initialFormState);
    setSelectedFile(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (member: any) => {
    setCurrentMember({
      id: member._id || member.id,
      name: member.name,
      bio: member.bio || "",
      position: member.position || "",
      memberType: member.memberType || "officer",
      track: member.track || "",
      gender: member.gender || "male",
      linkedin_url: member.linkedin_url || "",
      boardYear: member.boardYear || 2026,
    });
    setSelectedFile(null);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveMember = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", currentMember.name);
    formData.append("bio", currentMember.bio);
    formData.append("position", currentMember.position);
    formData.append("memberType", currentMember.memberType);
    if (currentMember.memberType !== "officer") {
      formData.append("track", currentMember.track);
    }
    formData.append("gender", currentMember.gender);
    formData.append("linkedin_url", currentMember.linkedin_url);
    formData.append("boardYear", currentMember.boardYear.toString());

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    if (isEditing && currentMember.id) {
      updateMember(
        { id: currentMember.id, formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        },
      );
    } else {
      createMember(
        { formData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        },
      );
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans flex relative">
      <aside className="w-64 bg-[#1E293B] border-r border-slate-700/50 p-6 hidden md:block shrink-0 h-screen sticky top-0">
        <SideBarContent
          sideBarOnclick={() => setIsMobileMenuOpen(false)}
          handleLogOut={handleLogout}
        />
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[99999] md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-64 bg-[#1E293B] border-r border-slate-700 h-full p-6 flex flex-col animate-in slide-in-from-left duration-200">
            <SideBarContent
              sideBarOnclick={() => setIsMobileMenuOpen(false)}
              handleLogOut={handleLogout}
            />
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
                <main className="p-4 md:p-10 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-200">
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
                          {membersList.length}
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">
                          Officers
                        </span>
                        <span className="text-2xl font-bold text-white">
                          {
                            membersList.filter(
                              (m: any) => m.memberType === "officer",
                            ).length
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
                          {
                            membersList.filter((m: any) => m.boardYear === 2026)
                              .length
                          }
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
                        onChange={(e) =>
                          setTypeFilter(e.target.value as MemberFilter)
                        }
                        className="bg-[#0F172A] border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                      >
                        <option value="All">All Types</option>
                        <option value="officer">Officer</option>
                        <option value="technical">Technical</option>
                        <option value="branding">Branding</option>
                        <option value="operation">Operation</option>
                      </select>
                      <select
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="bg-[#0F172A] border border-slate-600 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
                      >
                        {boardYears &&
                          boardYears.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        <option value="All">All Years</option>
                      </select>
                    </div>
                    <span className="text-xs text-slate-400">
                      Showing {filteredMembers.length} records
                    </span>
                  </section>

                  {isError && (
                    <ErrorBanner
                      message={
                        error?.message || "Failed to load board members."
                      }
                      onRetry={refetch}
                    />
                  )}

                  <section className="bg-[#1E293B] rounded-2xl border border-slate-700/50 overflow-hidden shadow-xl">
                    {isLoading ? (
                      <TableSkeleton cols={5} rows={5} />
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                          <thead>
                            <tr className="bg-[#131C2E] border-b border-slate-700/50 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                              <th className="py-4 px-6">Member Info</th>
                              <th className="py-4 px-6">Position / Track</th>
                              <th className="py-4 px-6">Classification</th>
                              <th className="py-4 px-6">Board Year</th>
                              <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-700/40 text-sm">
                            {filteredMembers.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={5}
                                  className="text-center py-8 text-slate-500"
                                >
                                  No members found.
                                </td>
                              </tr>
                            ) : (
                              filteredMembers.map((member: any) => (
                                <tr
                                  key={member._id || member.id}
                                  className="hover:bg-slate-800/40 transition"
                                >
                                  <td className="py-4 px-6 flex items-center gap-3">
                                    <img
                                      src={
                                        member.image_url ||
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                                      }
                                      alt={member.name}
                                      className="w-9 h-9 rounded-full object-cover border border-slate-600"
                                    />
                                    <span className="font-semibold text-white">
                                      {member.name}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 text-slate-300">
                                    <div className="flex flex-col">
                                      <span>{member.position || "-"}</span>
                                      {member.track && (
                                        <span className="text-xs text-slate-500">
                                          {member.track}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-4 px-6">
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                        member.memberType === "officer"
                                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                          : member.memberType === "technical"
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
                                          triggerDeleteModal(
                                            member._id || member.id,
                                          )
                                        }
                                        className="p-1.5 hover:bg-red-500/10 text-red-400 rounded-lg transition"
                                        title="Delete"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
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
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
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
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={currentMember.name}
                  onChange={(e) =>
                    setCurrentMember((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Mahmoud Ahmed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="position"
                    className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                  >
                    Position
                  </label>
                  <input
                    id="position"
                    type="text"
                    required
                    value={currentMember.position}
                    onChange={(e) =>
                      setCurrentMember((prev) => ({
                        ...prev,
                        position: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Chair"
                  />
                </div>
                <div>
                  <label
                    htmlFor="track"
                    className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                  >
                    Track
                  </label>
                  <input
                    id="track"
                    type="text"
                    disabled={currentMember.memberType === "officer"}
                    value={currentMember.track}
                    onChange={(e) =>
                      setCurrentMember((prev) => ({
                        ...prev,
                        track: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Front End"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="memberType"
                    className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                  >
                    Member Type
                  </label>
                  <select
                    id="memberType"
                    value={currentMember.memberType}
                    onChange={(e) =>
                      setCurrentMember((prev) => ({
                        ...prev,
                        memberType: e.target.value as BoardMemberType,
                      }))
                    }
                    className="w-full px-3 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="officer">Officer</option>
                    <option value="technical">Technical</option>
                    <option value="branding">Branding</option>
                    <option value="operation">Operation</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="boardYear"
                    className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                  >
                    Board Year
                  </label>
                  <input
                    id="boardYear"
                    type="number"
                    required
                    value={currentMember.boardYear}
                    onChange={(e) =>
                      setCurrentMember((prev) => ({
                        ...prev,
                        boardYear: Number.parseInt(e.target.value) || 2026,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    value={currentMember.gender}
                    onChange={(e) =>
                      setCurrentMember((prev) => ({
                        ...prev,
                        gender: e.target.value as "male" | "female",
                      }))
                    }
                    className="w-full px-3 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="linkedin_url"
                    className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                  >
                    LinkedIn URL
                  </label>
                  <input
                    id="linkedin_url"
                    type="url"
                    value={currentMember.linkedin_url}
                    onChange={(e) =>
                      setCurrentMember((prev) => ({
                        ...prev,
                        linkedin_url: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="text-xs font-semibold text-slate-300 uppercase block mb-1"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  value={currentMember.bio}
                  onChange={(e) =>
                    setCurrentMember((prev) => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Short biography..."
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase block mb-1">
                  Avatar Image
                </label>
                <div
                  className="border border-dashed border-slate-600 rounded-xl p-4 text-center cursor-pointer text-xs text-slate-300 flex flex-col items-center justify-center gap-2 bg-[#0F172A] hover:bg-slate-800 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon size={24} className="text-slate-500" />
                  <span>
                    {selectedFile
                      ? selectedFile.name
                      : "Click to select an image file"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-700 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm hover:bg-slate-700 transition"
                  disabled={isCreating || isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 shadow-lg shadow-blue-500/10 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isCreating || isUpdating ? "Saving..." : "Save Changes"}
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
                disabled={isDeleting}
              >
                No, Keep Member
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-500 shadow-lg shadow-red-500/20 transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
