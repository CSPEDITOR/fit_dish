import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/admin";
import { Search, Plus, AlertCircle, Check, X, Filter, RefreshCw, Trash2, Edit } from "lucide-react";
import Navbar from "../component/Navbar";

const AddDisease = () => {
  const [name, setName] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchDiseases = useCallback(async () => {
    try {
      const res = await API.get("/api/diseases");
      const diseasesArray = Array.isArray(res.data) ? res.data : res.data.data || [];
      setDiseases(diseasesArray);
      setFilteredDiseases(diseasesArray);
    } catch (err) {
      console.error("Failed to fetch diseases", err);
      setError("Failed to load diseases");
    }
  }, []);

  useEffect(() => {
    fetchDiseases();
  }, [fetchDiseases]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDiseases(diseases);
    } else {
      const filtered = diseases.filter(disease =>
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDiseases(filtered);
    }
  }, [searchTerm, diseases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isEditing && editingId) {
        const res = await API.put(`/api/diseases/${editingId}`, { name });
        setMessage(res.data.message);
        setIsEditing(false);
        setEditingId(null);
      } else {
        const res = await API.post("/api/diseases", { name });
        setMessage(res.data.message);
      }
      setName("");
      fetchDiseases();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save disease. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (disease) => {
    setName(disease.name);
    setIsEditing(true);
    setEditingId(disease._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/diseases/${id}`);
      setMessage("Disease deleted successfully");
      fetchDiseases();
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete disease.");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setName("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <>
      <div className="sticky top-0">
        <Navbar/>
      </div>
    
    <div className="min-h-screen bg-[#FBEBEB] p-4 md:p-6">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Disease Management</h1>
              <p className="text-gray-600 mt-1">Manage dietary diseases and restrictions</p>
            </div>
            <motion.button
              onClick={fetchDiseases}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-[#cc2405]/30 hover:text-[#cc2405] transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <motion.div 
            className="lg:col-span-1"
            variants={itemVariants}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#FBEBEB] rounded-lg">
                  {isEditing ? <Edit size={20} className="text-[#cc2405]" /> : <Plus size={20} className="text-[#cc2405]" />}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isEditing ? "Edit Disease" : "Add New Disease"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {isEditing ? "Update disease information" : "Add new dietary restriction"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disease Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter disease name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc2405] focus:border-transparent transition disabled:bg-gray-50"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    type="submit"
                    disabled={!name.trim() || loading}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      loading || !name.trim()
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#cc2405] text-white hover:bg-[#b01f04]"
                    }`}
                    whileHover={!loading && name.trim() ? { scale: 1.02 } : {}}
                    whileTap={!loading && name.trim() ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        {isEditing ? "Updating..." : "Adding..."}
                      </span>
                    ) : isEditing ? (
                      "Update Disease"
                    ) : (
                      "Add Disease"
                    )}
                  </motion.button>
                  
                  {isEditing && (
                    <motion.button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={20} />
                    </motion.button>
                  )}
                </div>
              </form>

              <AnimatePresence>
                {message && (
                  <motion.div
                    className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-2 text-green-700">
                      <Check size={16} />
                      <span className="text-sm font-medium">{message}</span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column - List */}
          <motion.div 
            className="lg:col-span-2"
            variants={itemVariants}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* List Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Existing Diseases</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {filteredDiseases.length} of {diseases.length} diseases
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Search diseases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc2405] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Filter size={16} />
                      <span>Filter</span>
                    </div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-[#FBEBEB] rounded-lg">
                    <div className="text-2xl font-bold text-[#cc2405]">{diseases.length}</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{filteredDiseases.length}</div>
                    <div className="text-xs text-gray-600">Showing</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{diseases.length - filteredDiseases.length}</div>
                    <div className="text-xs text-gray-600">Hidden</div>
                  </div>
                </div>
              </div>

              {/* Diseases List */}
              <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                <AnimatePresence>
                  {filteredDiseases.length > 0 ? (
                    filteredDiseases.map((disease, index) => (
                      <motion.div
                        key={disease._id}
                        className="p-4 hover:bg-gray-50 transition-colors group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-[#FBEBEB] rounded-lg flex items-center justify-center">
                              <span className="font-semibold text-[#cc2405]">{index + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{disease.name}</h3>
                              <p className="text-xs text-gray-500">ID: {disease._id?.substring(0, 8)}...</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              onClick={() => handleEdit(disease)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Edit"
                            >
                              <Edit size={16} />
                            </motion.button>
                            
                            {deleteConfirm === disease._id ? (
                              <div className="flex items-center gap-2">
                                <motion.button
                                  onClick={() => handleDelete(disease._id)}
                                  className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Confirm
                                </motion.button>
                                <motion.button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  Cancel
                                </motion.button>
                              </div>
                            ) : (
                              <motion.button
                                onClick={() => setDeleteConfirm(disease._id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      className="p-12 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No diseases found</h3>
                      <p className="text-gray-500">
                        {searchTerm ? `No results for "${searchTerm}"` : "Start by adding your first disease"}
                      </p>
                      {searchTerm && (
                        <motion.button
                          onClick={() => setSearchTerm("")}
                          className="mt-4 px-4 py-2 text-sm text-[#cc2405] hover:text-[#b01f04] transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Clear search
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* List Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#cc2405]"></div>
                      <span>Selected</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">{filteredDiseases.length}</span>
                    <span className="text-gray-500"> items • </span>
                    <span className="font-medium text-gray-900">{diseases.length}</span>
                    <span className="text-gray-500"> total</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <motion.div 
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                variants={itemVariants}
                onClick={() => {
                  setName("");
                  setIsEditing(false);
                  setEditingId(null);
                }}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#cc2405] hover:text-[#cc2405] transition-colors text-center"
                whileHover={{ y: -2 }}
              >
                <div className="font-medium">Clear Form</div>
              </motion.button>
              <motion.button
                variants={itemVariants}
                onClick={() => setSearchTerm("")}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#cc2405] hover:text-[#cc2405] transition-colors text-center"
                whileHover={{ y: -2 }}
              >
                <div className="font-medium">Clear Search</div>
              </motion.button>
              <motion.button
                variants={itemVariants}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#cc2405] hover:text-[#cc2405] transition-colors text-center"
                whileHover={{ y: -2 }}
              >
                <div className="font-medium">Scroll Up</div>
              </motion.button>
              <motion.button
                variants={itemVariants}
                onClick={fetchDiseases}
                className="p-4 bg-[#cc2405] text-white rounded-lg hover:bg-[#b01f04] transition-colors text-center"
                whileHover={{ y: -2 }}
              >
                <div className="font-medium">Refresh All</div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500">
            Admin Panel • All changes are logged and recorded • v1.0.0
          </p>
        </motion.div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this disease? This will remove it from all records.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const id = deleteConfirm;
                    setDeleteConfirm(null);
                    handleDelete(id);
                  }}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default AddDisease;