
import React, { useState } from 'react';
import { MapPin, Star, Eye, ChevronRight } from 'lucide-react';

interface LocationStoryProps {
  location: {
    id: number;
    name: string;
    country: string;
    temperature: number;
    condition: string;
    image: string;
    story: string;
    highlights: string[];
  };
}

export const LocationStory: React.FC<LocationStoryProps> = ({ location }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getWeatherEmoji = (condition: string) => {
    const emojis = {
      'Clear': '☀️',
      'Sunny': '🌞',
      'Partly Cloudy': '⛅',
      'Cloudy': '☁️',
      'Rainy': '🌧️',
      'Aurora': '🌌',
      'Snow': '❄️'
    };
    return emojis[condition] || '🌤️';
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      'Clear': 'text-blue-600 dark:text-blue-400',
      'Sunny': 'text-yellow-600 dark:text-yellow-400',
      'Partly Cloudy': 'text-gray-600 dark:text-gray-400',
      'Cloudy': 'text-gray-700 dark:text-gray-300',
      'Rainy': 'text-blue-800 dark:text-blue-300',
      'Aurora': 'text-purple-600 dark:text-purple-400',
      'Snow': 'text-blue-400 dark:text-blue-200'
    };
    return colors[condition] || colors['Clear'];
  };

  return (
    <div className="bg-white/30 dark:bg-background/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-300/50 dark:border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={location.image} 
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Weather Badge */}
        <div className="absolute top-4 right-4 bg-white/30 dark:bg-background/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
          <span className="text-lg">{getWeatherEmoji(location.condition)}</span>
          <span className="text-gray-800 dark:text-foreground font-semibold">{location.temperature}°</span>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-4 left-4 text-gray-100 dark:text-foreground">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm opacity-90">{location.country}</span>
          </div>
          <h3 className="text-2xl font-bold">{location.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Weather Info */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center space-x-2 ${getConditionColor(location.condition)}`}>
            <span className="font-medium">{location.condition}</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-gray-600 dark:text-foreground/70 hover:text-gray-800 dark:hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span className="text-sm">View Story</span>
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Story */}
        <p className="text-gray-700 dark:text-foreground/90 text-sm leading-relaxed mb-4">
          {location.story}
        </p>

        {/* Expandable Highlights */}
        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-gray-300/50 dark:border-white/20 pt-4">
            <h4 className="text-gray-800 dark:text-foreground font-medium mb-2 flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Highlights</span>
            </h4>
            <div className="space-y-2">
              {location.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600 dark:text-foreground/80 text-sm">
                  <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-foreground/60 rounded-full"></div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300/50 dark:border-white/20">
          <div className="flex items-center space-x-4 text-gray-600 dark:text-foreground/60 text-sm">
            <span>Real-time weather</span>
          </div>
          <button className="bg-white/30 dark:bg-background/20 hover:bg-white/40 dark:hover:bg-background/30 transition-colors px-4 py-2 rounded-full text-gray-800 dark:text-foreground text-sm font-medium">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};
