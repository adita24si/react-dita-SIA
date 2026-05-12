import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom"; // 1. Tambahkan Link di sini
import {
  FaSearch,
  FaUserPlus,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

function LoyaltyBadge({ loyalty }) {
  const styles =
    loyalty === "Gold"
      ? "bg-yellow-100 text-yellow-600"
      : loyalty === "Silver"
      ? "bg-gray-200 text-gray-600"
      : "bg-orange-100 text-orange-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {loyalty}
    </span>
  );
}

// 2. BAGIAN INI YANG DIUBAH AGAR BISA DIKLIK
function TableRow({ id, name, email, phone, loyalty }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-gray-500">#{id}</td>

      {/* Nama sekarang menggunakan Link agar bisa ditekan */}
      <td className="px-6 py-4 font-medium text-blue-600 hover:underline cursor-pointer">
        <Link to={`/customers/${id}`}>
          {name}
        </Link>
      </td>

      <td className="px-6 py-4 text-gray-500">{email}</td>
      <td className="px-6 py-4 text-gray-500">{phone}</td>

      <td className="px-6 py-4">
        <LoyaltyBadge loyalty={loyalty} />
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-3">
          {/* Tombol View juga menggunakan Link */}
          <Link 
            to={`/customers/${id}`} 
            className="text-blue-500 hover:underline text-sm flex items-center gap-1"
          >
            <FaEye /> View
          </Link>

          <button className="text-red-500 hover:underline text-sm flex items-center gap-1">
            <FaTrashAlt /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function Customers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const data = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: ["Rafi", "Andi", "Siti", "Budi"][i % 4] + " " + (i + 1),
      email: `user${i + 1}@email.com`,
      phone: `08123${100000 + i}`,
      loyalty: ["Bronze", "Silver", "Gold"][i % 3],
    }));
  }, []);

  const filtered = data.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-400">Manage your customers data</p>
        </div>
        <button
          onClick={() => navigate("/customers/add")}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow"
        >
          <FaUserPlus /> Add Customer
        </button>
      </div>

      <div className="relative mb-5 w-80">
        <input
          placeholder="Search customer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Loyalty</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((c) => (
              <TableRow key={c.id} {...c} />
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">No customers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}