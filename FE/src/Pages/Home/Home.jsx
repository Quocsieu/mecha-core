// import logo from "./assets/images/logo.png";
// import heroImg from "./assets/images/hero.png";
// import herodt from "./assets/images/herodt.jpg";
// import sp from "./assets/images/sp.jpg";
// import tool from "./assets/images/tool.jpg";
// import tool2 from "./assets/images/tool-2.jpg";

import Hero from '../Home/Components/HeroSection'
import Cate from '../Home/Components/CategorySection'
import Features from '../Home/Components/FeaturedSection'
import News from '../Home/Components/NewSection'
import WhySection from '../Home/Components/WhySection'
import Banner from '../Home/Components/BannerSection'

function Home() {
  // const [isOpen, setIsOpen] = useState(false);
  // const [activeNav, setActiveNav] = useState("Gundam Kits");
  // const navLinks = ["Gundam Kits", "Mecha Kits", "Tools", "Tài khoản"];
  // useEffect(() => {
  //   document.body.style.overflow = isOpen ? "hidden" : "auto";
  // }, [isOpen]);
  return (
    <div className="w-full">

      <div className="px-4">
        {/* Hero Section */}
        <Hero />

        {/* Explore Categories Section */}
        <Cate />

        {/* Featured Builds Section */}
        <Features />

        {/* New Arrivals Section */}
        <News />

        {/* Workspace Banner Section */}
        <Banner />

        {/* Why Mecha Core Section */}
        <WhySection />
      </div>

    </div>
  );
}

export default Home;