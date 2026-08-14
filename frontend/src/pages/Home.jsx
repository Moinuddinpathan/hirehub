import Hero from "../components/Hero";
import Stats from "../components/Stats";
import SearchBar from "../components/SearchBar";
import FeaturedCompanies from "../components/FeaturedCompanies";
import LatestJobs from "../components/LatestJobs";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";




function Home() {
  return (
    <>
      <Hero />

      <Stats />

      <SearchBar />

      <FeaturedCompanies />

      <LatestJobs />

      <WhyChooseUs />

      <Footer />
    </>
  );
}

export default Home;