import React, { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  /* 1. INISIALISASI STATE DATAFORM */
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
  });

  /* 2. HANDLE CHANGE FUNCTION */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const allTags = [...new Set(frameworkData.flatMap((f) => f.tags))];

  /* 3. LOGIKA FILTER */
  const filteredFrameworks = frameworkData.filter((framework) => {
    const _searchTerm = dataForm.searchTerm.toLowerCase();
    
    // Search Logic
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    // Tag Logic
    const matchesTag = dataForm.selectedTag 
      ? framework.tags.includes(dataForm.selectedTag) 
      : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="p-4 md:p-8 bg-[#050505] text-white min-h-screen relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-12 text-center tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-green-500 via-blue-500 to-red-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
          WELCOME FMWRK RAZER4YOU
        </h1>

        {/* --- SEARCH BOX AREA --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-16 p-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-xl">
          <input
            type="text"
            name="searchTerm"
            placeholder="SYSTEM SEARCH..."
            className="flex-1 p-5 bg-black/40 border border-white/10 rounded-xl text-xl font-mono uppercase tracking-widest focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            value={dataForm.searchTerm}
            onChange={handleChange}
          />
          <select
            name="selectedTag"
            className="md:w-1/3 p-5 bg-black/40 border border-white/10 rounded-xl text-xl font-mono uppercase focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer"
            value={dataForm.selectedTag}
            onChange={handleChange}
          >
            <option value="">[ ALL_MODULES ]</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag} className="bg-black">{tag.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* --- KONDISI JIKA DATA DITEMUKAN --- */}
        {filteredFrameworks.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFrameworks.map((framework) => (
              <div key={framework.id} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-green-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <article className="relative h-full p-8 rounded-2xl bg-[#0d0d0d] border border-white/10 flex flex-col">
                  <h2 className="text-3xl font-black italic mb-6 group-hover:text-cyan-400 transition-all">
                    {framework.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {framework.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-[10px] font-black bg-white/5 border border-white/20 rounded-full">
                        #{tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 mb-8">{framework.description}</p>
                  <a href={framework.details.officialWebsite} target="_blank" rel="noreferrer" className="mt-auto px-6 py-3 bg-white/5 rounded-lg text-center font-bold hover:bg-cyan-500 hover:text-black transition-all">
                    ACCESS_CORE
                  </a>
                </article>
              </div>
            ))}
          </div>
        ) : (
          /* --- KONDISI JIKA DATA TIDAK DITEMUKAN --- */
          <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
            <span className="text-6xl mb-4">⚠️</span>
            <h2 className="text-3xl font-mono font-black text-red-500 tracking-tighter uppercase">
              Data Tidak Ditemukan!
            </h2>
            <p className="text-gray-500 mt-2 font-mono">
              SISTEM TIDAK MENEMUKAN DATA UNTUK: "{dataForm.searchTerm.toUpperCase()}"
            </p>
            <button 
              onClick={() => setDataForm({ searchTerm: "", selectedTag: "" })}
              className="mt-8 px-6 py-2 border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all rounded-full font-bold text-xs"
            >
              RESET_SEARCH_PROTOCOL
            </button>
          </div>
        )}

      </div>
    </div>
  );
}