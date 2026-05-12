import { useParams } from "react-router-dom";
// Perhatikan nama variabel saat import harus sama dengan saat digunakan
import productsData from "../../data/Products.json";

export default function ProductDetail() {
  const { id } = useParams();

  // Mencari produk berdasarkan ID
  const product = productsData.find(
    (item) => item.id.toString() === id.replace("#", "")
  );

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-red-500">
          Produk dengan ID {id} tidak ditemukan!
        </h1>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        {/* Gambar Produk */}
        <div className="w-full h-64 bg-gray-200">
          <img
            src={product.thumbnail || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Konten Detail */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.title}
          </h2>
          
          <div className="space-y-2">
            <p className="text-sm text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full font-medium">
              Kategori: {product.category}
            </p>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-sm">Harga Resmi</p>
              <p className="text-2xl font-bold text-green-600">
                {product.price}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4">
              <p className="text-gray-600">
                Stok Tersedia: <span className="font-bold text-gray-800">
                  {product.stock}
                </span>
              </p>
            </div>
          </div>

          <button 
            onClick={() => window.history.back()}
            className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Kembali ke Daftar
          </button>
        </div>
      </div>
    </div>
  );
}