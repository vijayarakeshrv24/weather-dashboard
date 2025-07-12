"use client";

import Navigation from "@/components/Navigation";
import WeatherCard from "@/components/WeatherCard";
import FiveDayForecast from "@/components/FiveDayForecast";
import HourlyForecast from "@/components/HourlyForecast";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-rose-200 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-foreground transition-colors duration-700">
      {/* Header */}
      <header className="text-center py-12 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-500 via-amber-400 to-pink-500 bg-clip-text text-transparent drop-shadow dark:from-yellow-300 dark:via-orange-400 dark:to-pink-500">
          Weather Dashboard
        </h1>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 font-medium">
          Live weather updates for your selected city
        </p>
      </header>

      {/* Navigation/Search */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <Navigation />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Weather Card */}
          <section className="lg:col-span-2 animate-slide-up animate-swing rounded-3xl shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6">
            <WeatherCard />
          </section>

          {/* 5-Day Forecast */}
          <aside className="lg:col-span-1 animate-slide-up animate-swing rounded-3xl shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6">
            <FiveDayForecast />
          </aside>
        </div>

        {/* Hourly Forecast */}
        <section className="animate-slide-up animate-swing rounded-3xl shadow-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6">
          <HourlyForecast />
        </section>
      </main>
    </div>
  );
};

export default Index;
