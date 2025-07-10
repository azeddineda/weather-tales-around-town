
import React from 'react';
import { MapPin, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  weather: {
    city: string;
    country: string;
    temp: number;
    condition: string;
  };
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherEmoji = (condition: string) => {
    const emojis = {
      'Clear': '☀️',
      'Sunny': '🌞',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Snow': '❄️',
      'Aurora': '🌌'
    };
    return emojis[condition] || '🌤️';
  };

  const getConditionGradient = (condition: string) => {
    const gradients = {
      'Clear': 'from-blue-400 to-blue-600',
      'Sunny': 'from-yellow-400 to-orange-500',
      'Partly Cloudy': 'from-gray-300 to-blue-400',
      'Cloudy': 'from-gray-400 to-gray-600',
      'Rainy': 'from-gray-600 to-blue-700',
      'Snow': 'from-blue-200 to-gray-300',
      'Aurora': 'from-green-400 to-purple-600'
    };
    return gradients[condition] || gradients['Clear'];
  };

  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
      <div className={`bg-gradient-to-br ${getConditionGradient(weather.condition)} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 backdrop-blur-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-white/80" />
            <span className="text-white/90 text-sm font-medium">{weather.country}</span>
          </div>
          <div className="text-2xl">{getWeatherEmoji(weather.condition)}</div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{weather.city}</h3>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-light text-white mb-1">{weather.temp}°</div>
            <div className="text-white/80 text-sm">{weather.condition}</div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Thermometer className="h-6 w-6 text-white/60" />
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};
