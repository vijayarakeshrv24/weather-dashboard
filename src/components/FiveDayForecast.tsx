"use client"; // ✅ Only needed if you're using Next.js with App Router

import React, { useEffect, useState } from "react";
import { CloudSun, CloudMoonRain, Sun } from "lucide-react";
import { useWeatherStore } from "@/store/weatherdata";

// Map OpenWeather condition to icon
const iconMap: Record<string, any> = {
  Clear: Sun,
  Clouds: CloudSun,
  Rain: CloudMoonRain,
};

// Optional color map
const colorMap: Record<string, string> = {
  Clear: "text-yellow-500",
  Clouds: "text-yellow-400",
  Rain: "text-blue-400",
};

type ForecastItem = {
  day: string;
  icon: any;
  min: number;
  max: number;
  color: string;
};

const FiveDayForecast = () => {
  const { city } = useWeatherStore();
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=87677ad89f0ee41ca4f71e3d812920a8`
        );
        const data = await res.json();

        if (res.status !== 200 || !data.list) {
          throw new Error(data.message || "Failed to fetch forecast");
        }

        // Group forecast by day
        const dailyMap = new Map<string, any[]>();
        data.list.forEach((item: any) => {
          const date = new Date(item.dt_txt);
          const day = date.toLocaleDateString("en-US", { weekday: "long" });
          if (!dailyMap.has(day)) dailyMap.set(day, []);
          dailyMap.get(day)!.push(item);
        });

        const parsed: ForecastItem[] = Array.from(dailyMap.entries())
          .slice(0, 5)
          .map(([day, items]) => {
            const temps = items.map((v) => v.main.temp);
            const min = Math.min(...temps);
            const max = Math.max(...temps);
            const weatherMain = items[0].weather[0].main;

            return {
              day,
              icon: iconMap[weatherMain] || Sun,
              min: Math.round(min),
              max: Math.round(max),
              color: colorMap[weatherMain] || "text-yellow-500",
            };
          });

        setForecast(parsed);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div className="neomorphic rounded-3xl p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-foreground mb-6">
        5-Day Forecast for {city}
      </h3>

      {loading ? (
        <p className="text-muted-foreground">Loading forecast...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="space-y-3">
          {forecast.map((item, index) => (
            <div
              key={index}
              className="neomorphic-inset rounded-xl p-4 hover:neomorphic-hover transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left: Icon + Day */}
                <div className="flex items-center gap-2 sm:flex-[2]">
                  <item.icon
                    className={`h-8 w-8 ${item.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                  <span className="font-medium text-foreground">{item.day}</span>
                </div>

                {/* Right: Min/Bar/Max */}
                <div className="flex items-center gap-2 sm:justify-end sm:flex-[3]">
                  <span className="text-muted-foreground">{item.min}°</span>
                  <div className="w-20 h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full flex-shrink-0"></div>
                  <span className="font-semibold text-foreground">{item.max}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiveDayForecast;
