import { useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Search, AlertTriangle } from 'lucide-react';
import { EVENT_LISTINGS, EVENT_CATEGORIES } from '../data/events';

function Events() {
  const [selectedCategory, setSelectedCategory] = useState<typeof EVENT_CATEGORIES[number]>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingOnly, setUpcomingOnly] = useState(true);

  const filteredEvents = EVENT_LISTINGS.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !upcomingOnly || new Date(event.date) >= new Date();
    
    return matchesCategory && matchesSearch && matchesDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 backdrop-blur-sm bg-opacity-90 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white
               dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
            <input
              type="checkbox"
              checked={upcomingOnly}
              onChange={(e) => setUpcomingOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Show upcoming only</span>
          </label>
        </div>
        {/* Event Categories */}
        <div className="flex flex-wrap gap-2">
          {EVENT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const isUpcoming = new Date(event.date) >= new Date();
            return (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
              transition-transform hover:scale-[1.02]">
                <div className="p-6">
                  {!isUpcoming && (
                    <div className="mb-4 flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800
                     dark:text-yellow-200 rounded-lg">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span>This event has already taken place</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                    <span className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 
                    dark:text-blue-300 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })} at {new Date(event.date).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    
                    {event.link && (
                      <div className="flex items-center">
                        <LinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                        <a 
                          href={event.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          More Information
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg">
            No events found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;