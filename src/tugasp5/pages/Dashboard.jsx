import React from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import PageHeader from "../components/PageHeader";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- DATA DUMMY UNTUK GRAFIK & TABEL ---
const chartData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "Mei", revenue: 6000 },
  { name: "Jun", revenue: 7000 },
];

const recentOrders = [
  { id: "#INV-001", name: "Budi Santoso", amount: "Rp. 250.000", status: "Selesai", date: "15 Apr" },
  { id: "#INV-002", name: "Siti Aminah", amount: "Rp. 120.000", status: "Proses", date: "14 Apr" },
  { id: "#INV-003", name: "Andi Wijaya", amount: "Rp. 450.000", status: "Batal", date: "13 Apr" },
  { id: "#INV-004", name: "Rina Melati", amount: "Rp. 300.000", status: "Selesai", date: "12 Apr" },
];
// ---------------------------------------

function Card({ icon, value, label, bg }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${bg} text-white text-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </div>
  );
}

// Fungsi pembantu untuk warna badge status
const getStatusColor = (status) => {
  switch (status) {
    case "Selesai": return "bg-green-100 text-green-600";
    case "Proses": return "bg-blue-100 text-blue-600";
    case "Batal": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-600";
  }
};

export default function Dashboard() {
  return (
    <div className="flex bg-[#F3F4F6] min-h-screen">
      <Sidebar />

      <div className="flex-1 overflow-hidden">
        <Header />

        <div className="px-6 py-5 overflow-y-auto h-[calc(100vh-80px)]">
          <PageHeader />

          {/* SECTION 1: STATS CARDS (Tetap seperti semula) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            <Card icon={<FaShoppingCart />} value="75" label="Total Orders" bg="bg-green-500" />
            <Card icon={<FaTruck />} value="175" label="Total Delivered" bg="bg-blue-500" />
            <Card icon={<FaBan />} value="40" label="Total Canceled" bg="bg-red-500" />
            <Card icon={<FaDollarSign />} value="Rp.128M" label="Total Revenue" bg="bg-yellow-500" />
          </div>

          {/* SECTION 2: CHARTS & RECENT ORDERS (Tambahan Baru) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
            
            {/* GRAFIK PENDAPATAN (Memakan 2 kolom di layar besar) */}
            <div className="bg-white rounded-2xl shadow-sm px-6 py-5 lg:col-span-2">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Grafik Pendapatan</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} />
                    <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TABEL TRANSAKSI TERAKHIR (Memakan 1 kolom di layar besar) */}
            <div className="bg-white rounded-2xl shadow-sm px-6 py-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Transaksi Terakhir</h2>
                <button className="text-sm text-blue-500 font-medium hover:underline">Lihat Semua</button>
              </div>
              
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{order.name}</p>
                      <p className="text-xs text-gray-400">{order.id} • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-sm">{order.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}