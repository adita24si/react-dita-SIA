import { useParams } from "react-router-dom";
// Jika kamu sudah punya Customers.json di folder data, ganti import di bawah ini
// Untuk contoh, saya buatkan array data langsung agar file tidak error saat dijalankan
const customersData = [
  { id: 1, name: "Adita Sastra", email: "adita@example.com", phone: "08123456789", address: "Jakarta, Indonesia" },
  { id: 2, name: "Budi Utomo", email: "budi@example.com", phone: "08987654321", address: "Bandung, Indonesia" }
];

export default function CustomerDetail() {
  const { id } = useParams();

  // Mencari customer berdasarkan ID dari URL
  const customer = customersData.find((item) => item.id.toString() === id);

  if (!customer) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-red-500">Customer tidak ditemukan!</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full flex justify-center items-center text-blue-600 text-3xl font-bold">
              {customer.name.charAt(0)}
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold">{customer.name}</h2>
              <p className="opacity-80">ID Customer: #{customer.id}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500 block">Email</label>
              <p className="text-lg font-medium text-gray-800">{customer.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 block">No. Telepon</label>
              <p className="text-lg font-medium text-gray-800">{customer.phone}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="text-sm text-gray-500 block">Alamat Lengkap</label>
            <p className="text-lg text-gray-800 leading-relaxed">
              {customer.address}
            </p>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Kembali ke Daftar Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}