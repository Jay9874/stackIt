const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-300 bg-white shadow-sm sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600 mb-2 md:mb-0">StackIt</h1>
      <div className="flex flex-wrap gap-2 items-center">
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          Ask New Question
        </button>
        <select className="border px-2 py-1 rounded">
          <option>Newest</option>
          <option>Unanswered</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded w-48"
        />
        <button className="border px-4 py-1 rounded hover:bg-gray-100">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
