import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Trang bạn tìm kiếm không tồn tại.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:opacity-90 transition"
      >
        Về Trang Chủ
      </Link>
    </div>
  );
}

export default NotFound;