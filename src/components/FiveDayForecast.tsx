
import { CloudSun, CloudMoonRain, Sun } from "lucide-react";

const FiveDayForecast = () => {
  const forecast = [
    { day: "Today", icon: CloudSun, min: 18, max: 24, color: "text-yellow-400" },
    { day: "Tomorrow", icon: Sun, min: 20, max: 28, color: "text-yellow-500" },
    { day: "Wednesday", icon: CloudMoonRain, min: 15, max: 22, color: "text-blue-400" },
    { day: "Thursday", icon: CloudSun, min: 17, max: 25, color: "text-yellow-400" },
    { day: "Friday", icon: Sun, min: 19, max: 29, color: "text-yellow-500" },
  ];

  return (
    <div className="neomorphic rounded-3xl p-6 animate-slide-up">
      <h3 className="text-xl font-bold text-foreground mb-6">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((item, index) => (
          <div
            key={index}
            className="neomorphic-inset rounded-xl p-4 hover:neomorphic-hover transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <item.icon className={`h-8 w-8 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="font-medium text-foreground">{item.day}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{item.min}°</span>
                <div className="w-16 h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"></div>
                <span className="font-semibold text-foreground">{item.max}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
