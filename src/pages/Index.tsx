
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { WeatherCard } from '../components/WeatherCard';
import { LocationStory } from '../components/LocationStory';
import { SearchBar } from '../components/SearchBar';
import { ThemeToggle } from '../components/ThemeToggle';

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState({
    location: 'San Francisco',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 24,
    description: 'A beautiful day with scattered clouds and gentle coastal breeze'
  });

  const [featuredLocations] = useState([
    {
      id: 1,
      name: 'Tokyo',
      country: 'Japan',
      temperature: 28,
      condition: 'Clear',
      image: '/placeholder.svg',
      story: 'Cherry blossoms paint the city in delicate pink hues as spring temperatures bring new life to the bustling metropolis.',
      highlights: ['Shibuya Crossing', 'Mount Fuji views', 'Temple gardens']
    },
    {
      id: 2,
      name: 'Reykjavik',
      country: 'Iceland',
      temperature: 5,
      condition: 'Aurora',
      image: '/placeholder.svg',
      story: 'Under the dancing northern lights, the crisp Arctic air carries whispers of ancient glaciers and volcanic tales.',
      highlights: ['Northern Lights', 'Blue Lagoon', 'Volcanic landscapes']
    },
    {
      id: 3,
      name: 'Santorini',
      country: 'Greece',
      temperature: 26,
      condition: 'Sunny',
      image: '/placeholder.svg',
      story: 'Golden sunlight bathes white-washed buildings perched on volcanic cliffs, while Aegean breezes carry the scent of wild herbs.',
      highlights: ['Sunset views', 'Volcanic beaches', 'Ancient ruins']
    }
  ]);

  const getWeatherGradient = (condition: string) => {
    const gradients = {
      'Clear': 'from-blue-400 via-blue-500 to-blue-600 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800',
      'Sunny': 'from-yellow-400 via-orange-400 to-red-400 dark:from-yellow-600 dark:via-orange-600 dark:to-red-600',
      'Partly Cloudy': 'from-blue-300 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900',
      'Cloudy': 'from-gray-300 via-gray-400 to-gray-500 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800',
      'Rainy': 'from-gray-500 via-blue-600 to-gray-700 dark:from-gray-800 dark:via-blue-900 dark:to-gray-900',
      'Aurora': 'from-green-400 via-purple-500 to-blue-600 dark:from-green-600 dark:via-purple-700 dark:to-blue-800',
      'Snow': 'from-blue-100 via-gray-50 to-gray-100 dark:from-slate-600 dark:via-slate-700 dark:to-slate-800'
    };
    return gradients[condition] || gradients['Clear'];
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getWeatherGradient(currentWeather.condition)} relative overflow-hidden transition-colors duration-500`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-foreground/20 rounded-full mix-blend-overlay animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-foreground/20 rounded-full mix-blend-overlay animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-foreground/20 rounded-full mix-blend-overlay animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Theme Toggle */}
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
            Weather Stories
          </h1>
          <p className="text-xl text-gray-700 dark:text-white/80 animate-fade-in delay-200">
            Discover the world through weather and tales
          </p>
        </header>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in delay-300">
          <SearchBar onLocationSelect={(location) => console.log('Selected:', location)} />
        </div>

        {/* Current Weather Hero */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in delay-400">
          <div className="bg-white/30 dark:bg-background/20 backdrop-blur-lg rounded-3xl p-8 border border-gray-300/50 dark:border-white/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="text-gray-800 dark:text-white h-6 w-6" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{currentWeather.location}</h2>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 dark:text-white/80">
                <Clock className="h-4 w-4" />
                <span>Updated now</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="text-center lg:text-left">
                <div className="text-6xl font-light text-gray-800 dark:text-white mb-2">
                  {currentWeather.temperature}°C
                </div>
                <div className="text-xl text-gray-700 dark:text-white/90 mb-4">
                  {currentWeather.condition}
                </div>
                <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                  {currentWeather.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 dark:bg-background/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="h-4 w-4 text-gray-600 dark:text-white/80" />
                    <span className="text-gray-600 dark:text-white/80 text-sm">Feels like</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-800 dark:text-white">{currentWeather.feelsLike}°C</div>
                </div>

                <div className="bg-white/20 dark:bg-background/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wind className="h-4 w-4 text-gray-600 dark:text-white/80" />
                    <span className="text-gray-600 dark:text-white/80 text-sm">Wind</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-800 dark:text-white">{currentWeather.windSpeed} km/h</div>
                </div>

                <div className="bg-white/20 dark:bg-background/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="h-4 w-4 text-gray-600 dark:text-white/80" />
                    <span className="text-gray-600 dark:text-white/80 text-sm">Humidity</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-800 dark:text-white">{currentWeather.humidity}%</div>
                </div>

                <div className="bg-white/20 dark:bg-background/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-4 w-4 text-gray-600 dark:text-white/80" />
                    <span className="text-gray-600 dark:text-white/80 text-sm">Visibility</span>
                  </div>
                  <div className="text-xl font-semibold text-gray-800 dark:text-white">{currentWeather.visibility} km</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Locations */}
        <section className="animate-fade-in delay-500">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            Featured Weather Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredLocations.map((location, index) => (
              <div key={location.id} className={`animate-fade-in delay-${600 + index * 100}`}>
                <LocationStory location={location} />
              </div>
            ))}
          </div>
        </section>

        {/* Weather Cards Grid */}
        <section className="mt-16 animate-fade-in delay-700">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            Around the World
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: 'London', temp: 15, condition: 'Rainy', country: 'UK' },
              { city: 'Dubai', temp: 35, condition: 'Sunny', country: 'UAE' },
              { city: 'Moscow', temp: -5, condition: 'Snow', country: 'Russia' },
              { city: 'Sydney', temp: 23, condition: 'Clear', country: 'Australia' }
            ].map((weather, index) => (
              <div key={weather.city} className={`animate-fade-in delay-${800 + index * 100}`}>
                <WeatherCard weather={weather} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
