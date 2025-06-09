import Navigation from "@/components/Navigation";
import WeatherCard from "@/components/WeatherCard";
import FiveDayForecast from "@/components/FiveDayForecast";
import HourlyForecast from "@/components/HourlyForecast";

const Index = () => {
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 tracking-tight drop-shadow-sm animate-fade-in">
        WEATHER DASHBOARD
      </h1>

      <Navigation />

      <main className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-2">
            <WeatherCard />
          </div>

          {/* 5-Day Forecast */}
          <div className="lg:col-span-1">
            <FiveDayForecast />
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="mt-8">
          <HourlyForecast />
        </div>
      </main>
    </div>
  );
};

export default Index;
