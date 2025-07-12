"use client";

import React, { useEffect, useState } from "react";
import { CloudSun, CloudMoonRain, Sun } from "lucide-react";
import { useWeatherStore } from "@/store/weatherdata";

const iconMap: Record<string, any> = {
  Clear: Sun,
  Clouds: CloudSun,
  Rain: CloudMoonRain,
};

const colorMap: Record<string, string> = {
  Clear: "text-yellow-500",
  Clouds: "text-yellow-400",
  Rain: "text-blue-400",
};

type HourItem = {
  time: string;
  temp: number;
  wind: number;
  icon: any;
  color: string;
};

const HourlyForecast = () => {
  const { city } = useWeatherStore();
  const [hourlyData, setHourlyData] = useState<HourItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=87677ad89f0ee41ca4f71e3d812920a8`
        );
        const data = await res.json();

        if (res.status !== 200 || !data.list) {
          throw new Error(data.message || "Failed to fetch hourly forecast");
        }

        // Take first 8 entries = next 24 hours (each entry = 3h interval)
        const parsed = data.list.slice(0, 8).map((item: any) => {
          const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          const weatherMain = item.weather[0].main;
          const icon = iconMap[weatherMain] || Sun;
          const color = colorMap[weatherMain] || "text-yellow-500";

          return {
            time,
            temp: Math.round(item.main.temp),
            wind: Math.round(item.wind.speed),
            icon,
            color,
          };
        });

        setHourlyData(parsed);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyForecast();
  }, [city]);

  return (
    <div className="neomorphic rounded-3xl p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Hourly Forecast for {city}
      </h3>

      {loading ? (
        <p className="text-muted-foreground">Loading hourly forecast...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {hourlyData.map((item, index) => (
            <div
              key={index}
              className="neomorphic-inset rounded-xl p-4 min-w-[100px] hover:neomorphic-hover transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground font-medium">
                  {item.time}
                </p>
                <item.icon
                  className={`h-8 w-8 mx-auto ${item.color} group-hover:scale-110 transition-transform duration-300`}
                />
                <div className="space-y-1">
                  <p className="text-lg font-bold text-foreground">{item.temp}°</p>
                  <p className="text-xs text-muted-foreground">
                    {item.wind} km/h
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
