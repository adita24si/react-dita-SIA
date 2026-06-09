
import { useEffect, useState } from "react";
import { notesAPI } from "../services/notesAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";

export default function Note() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const loadNotes = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError(`Terjadi kesalahan saat memuat catatan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await notesAPI.createNote(dataForm);
      setSuccess("Catatan berhasil ditambahkan!");
      setDataForm({ title: "", content: "", status: "draft" });
      setTimeout(() => setSuccess(""), 3000);
      await loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h1>
        <p className="text-gray-500">Buat dan lihat catatan Anda di sini.</p>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tambah Catatan Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={dataForm.title}
              placeholder="Judul catatan"
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            />

            <textarea
              name="content"
              value={dataForm.content}
              placeholder="Isi catatan"
              onChange={handleChange}
              disabled={loading}
              required
              rows="4"
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
            />

            <select
              name="status"
              value={dataForm.status}
              onChange={handleChange}
              disabled={loading}
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {loading ? "Mohon Tunggu..." : "Tambah Catatan"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Daftar Catatan</h2>
            <span className="text-sm text-gray-500">{notes.length} item</span>
          </div>

          {loading && notes.length === 0 ? (
            <LoadingSpinner text="Memuat catatan..." />
          ) : notes.length === 0 ? (
            <p className="text-gray-500">Belum ada catatan. Tambahkan catatan baru.</p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id || note.title} className="border border-gray-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{note.status || "draft"}</span>
                  </div>
                  <p className="text-gray-600">{note.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
