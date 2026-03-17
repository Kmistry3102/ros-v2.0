import Header from "../layout/Header";
import AboutSection from "./AboutSection";
import TerritoryMap from "./TerritoryMap";

export default function MainPage() {
  return (
    <>
      <Header />
      <div className="relative container mx-auto w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:gap-12 gap-8 px-8">
          <div className="flex items-center justify-center relative">
            <TerritoryMap />
          </div>
          <AboutSection />
        </div>
      </div>
    </>
  )
}
