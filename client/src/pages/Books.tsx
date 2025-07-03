import { BooksTable } from "@/components/modules/books/BooksTable";

// Example summary data (replace with real data as needed)
const summary = [
  { label: "Total Books", value: 120 },
  { label: "Available", value: 90 },
  { label: "Borrowed", value: 30 },
];


// Example recent activity
const recentActivity = [
  { type: "added", book: "React for Beginners", time: "2 min ago" },
  { type: "borrowed", book: "JavaScript: The Good Parts", time: "10 min ago" },
  { type: "returned", book: "Clean Code", time: "1 hour ago" },
];

export default function Books() {

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summary.map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col items-center"
          >
            <div className="text-2xl font-bold text-primary">{item.value}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
        <div className="font-semibold mb-2 text-primary">Recent Activity</div>
        <ul className="space-y-1 text-sm">
          {recentActivity.map((activity, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className={
                activity.type === "added"
                  ? "text-green-500"
                  : activity.type === "borrowed"
                  ? "text-yellow-500"
                  : "text-blue-500"
              }>
                ●
              </span>
              <span>
                <span className="font-medium">{activity.book}</span> {activity.type} <span className="text-gray-400">({activity.time})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Table goes here */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Books List</h2>
        <div className="text-center text-gray-400">
          <BooksTable />
        </div>
      </div>
    </div>
  );
}