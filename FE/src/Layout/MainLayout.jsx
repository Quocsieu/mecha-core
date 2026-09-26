import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Header luôn cố định ở trên */}
      <Header />

      {/* Nội dung các trang (Home, Products, Cart...) sẽ hiển thị ở đây */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer luôn cố định ở dưới */}
      <Footer />
    </div>
  );
}

export default MainLayout;