import { CloudSun } from "lucide-react";
import { useWeatherStore } from "@/store";
import { useEffect, useState } from "react";

const WeatherCard = () => {
  const { city } = useWeatherStore();
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87677ad89f0ee41ca4f71e3d812920a8&units=metric`
        );
        if (!response.ok) {
          console.error("Error fetching weather:", response.statusText);
          return;
        }
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!weather) {
    return (
      <div className="text-center p-8">
        <p className="text-xl text-muted-foreground">Loading weather data...</p>
      </div>
    );
  }

  const kelvinToTime = (unix: number) =>
    new Date(unix * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
const getCityTime = () => {
  if (!weather) return "";

  // Get current UTC time in milliseconds
  const nowUTC = Date.now();

  // Add the city’s offset to get its current time in ms
  const cityOffset = weather.timezone * 1000; // convert seconds to ms
  const cityTime = new Date(nowUTC + cityOffset);

  // Format the city time in UTC (since we've manually applied the offset)
  return cityTime.toLocaleTimeString("en-US", {
    timeZone: "UTC", // display exactly what we've calculated
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};




  return (
    <div className=" rounded-3xl p-8 animate-slide-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{weather.name}</h1>
        <p className="text-muted-foreground text-lg">{currentDate}</p>
        <p className="text-muted-foreground text-xl font-mono">{getCityTime()}</p>
      </div>

      {/* Main Weather Display */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CloudSun className="h-24 w-24 text-yellow-400 animate-bounce-subtle" />
        </div>
        <div className="space-y-2">
          <h2 className="text-6xl font-bold text-foreground">
            {Math.round(weather.main.temp)}°C
          </h2>
          <p className="text-xl text-muted-foreground">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
          <p className="text-lg font-medium text-foreground animate-bounce-subtle">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      {/* Sun Times */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="neomorphic-inset rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Sunrise</p>
          <p className="text-lg font-semibold text-foreground">
            {kelvinToTime(weather.sys.sunrise)}
          </p>
        </div>
        <div className="neomorphic-inset rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Sunset</p>
          <p className="text-lg font-semibold text-foreground">
            {kelvinToTime(weather.sys.sunset)}
          </p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="neomorphic-inset rounded-xl p-4 text-center hover:neomorphic-hover transition-all duration-300">
          <p className="text-xs text-muted-foreground mb-1">Humidity</p>
          <p className="text-lg font-bold text-foreground">{weather.main.humidity}%</p>
        </div>
        <div className="neomorphic-inset rounded-xl p-4 text-center hover:neomorphic-hover transition-all duration-300">
          <p className="text-xs text-muted-foreground mb-1">Wind</p>
          <p className="text-lg font-bold text-foreground">{weather.wind.speed} km/h</p>
        </div>
        <div className="neomorphic-inset rounded-xl p-4 text-center hover:neomorphic-hover transition-all duration-300">
          <p className="text-xs text-muted-foreground mb-1">Pressure</p>
          <p className="text-lg font-bold text-foreground">{weather.main.pressure} hPa</p>
        </div>
        <div className="neomorphic-inset rounded-xl p-4 text-center hover:neomorphic-hover transition-all duration-300">
          <p className="text-xs text-muted-foreground mb-1">Condition</p>
          <p className="text-lg font-bold text-foreground">{weather.weather[0].main}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
