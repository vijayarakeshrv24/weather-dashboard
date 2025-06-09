
import { CloudSun, Sun, CloudMoonRain } from "lucide-react";

const HourlyForecast = () => {
  const hourlyData = [
    { time: "12:00", temp: 24, icon: CloudSun, wind: 12, color: "text-yellow-400" },
    { time: "13:00", temp: 26, icon: Sun, wind: 15, color: "text-yellow-500" },
    { time: "14:00", temp: 28, icon: Sun, wind: 18, color: "text-yellow-500" },
    { time: "15:00", temp: 27, icon: CloudSun, wind: 16, color: "text-yellow-400" },
    { time: "16:00", temp: 25, icon: CloudMoonRain, wind: 14, color: "text-blue-400" },
    { time: "17:00", temp: 23, icon: CloudMoonRain, wind: 12, color: "text-blue-400" },
    { time: "18:00", temp: 21, icon: CloudSun, wind: 10, color: "text-yellow-400" },
    { time: "19:00", temp: 20, icon: CloudSun, wind: 8, color: "text-yellow-400" },
  ];

  return (
    <div className="neomorphic rounded-3xl p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-foreground mb-6">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className="neomorphic-inset rounded-xl p-4 min-w-[100px] hover:neomorphic-hover transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground font-medium">{item.time}</p>
              <item.icon className={`h-8 w-8 mx-auto ${item.color} group-hover:scale-110 transition-transform duration-300`} />
              <div className="space-y-1">
                <p className="text-lg font-bold text-foreground">{item.temp}°</p>
                <p className="text-xs text-muted-foreground">{item.wind} km/h</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
