
import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Framework List</h1>
      <div className="grid gap-4">
        {frameworkData.map((framework) => (
          <article key={framework.id} className="border p-5 rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold text-slate-900">{framework.name}</h2>
            <p className="text-slate-600 mt-2">{framework.description}</p>
            <div className="mt-3 text-sm text-slate-500">
              <p>
                <strong>Developer:</strong> {framework.details.developer}
              </p>
              <p>
                <strong>Release Year:</strong> {framework.details.releaseYear}
              </p>
              <p>
                <strong>Official Website:</strong>{' '}
                <a href={framework.details.officialWebsite} target="_blank" rel="noreferrer" className="text-sky-600 hover:underline">
                  {framework.details.officialWebsite}
                </a>
              </p>
            </div>
            <div className="mt-3 text-sm text-slate-700">
              <strong>Tags:</strong> {framework.tags.join(', ')}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}