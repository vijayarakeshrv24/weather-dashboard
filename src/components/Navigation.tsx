import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useWeatherStore } from "@/store";
import { useState } from "react";

const Navigation = () => {
  const { setCity } = useWeatherStore();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(inputValue)
  };

  return (
    <nav className="w-full p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        {/* Search Input Form */}
        <form className="flex-1 relative" onSubmit={handleSubmit}>
          <div className="neomorphic-inset rounded-2xl p-1">
            <div className="flex items-center gap-3 px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={inputValue}
                placeholder="Search city..."
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                onChange={(e) => setInputValue(e.target.value)} // Only store the value
              />
            </div>
          </div>
        </form>

        {/* Current Location Button */}
        <button className="neomorphic glow-green rounded-2xl px-6 py-3 font-semibold text-sm hover:neomorphic-hover animate-glow transition-all duration-300 whitespace-nowrap">
          Current Location
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
