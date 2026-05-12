import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const ITEMS_PER_PAGE = 5;

export default function Products() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // data dummy
  const data = useMemo(() => {
    const categories = ["Laptop", "Mouse", "Keyboard", "Monitor", "Headset"];

    return Array.from({ length: 30 }, (_, i) => {
      const category = categories[i % categories.length];
      const price = (i + 1) * 125000;
      const stock = (i * 7) % 35;

      return {
        id: i + 1,
        title: `${category} ${i + 1}`,
        category,
        price,
        stock,
      };
    });
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    if (!s) return data;

    return data.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  }, [data, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ITEMS_PER_PAGE)
  );

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentData = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        Products
      </h1>

      <p className="text-sm text-gray-400 mb-5">
        Manage your products data
      </p>

      <div className="relative mb-5 w-80">
        <input
          type="text"
          placeholder="Search products..."
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
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-gray-400"
                >
                  No products found
                </td>
              </tr>
            ) : (
              currentData.map((p) => (
                <tr
                  key={p.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-gray-500">
                    #{p.id}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    <Link to={`/products/${p.id}`} className="text-emerald-400 hover:text-emerald-500">
        {p.title}
    </Link>
                  </td>



                  <td className="px-6 py-4 text-gray-500">
                    {p.category}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    Rp {p.price.toLocaleString("id-ID")}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {p.stock}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    -
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(totalPages, p + 1)
              )
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}