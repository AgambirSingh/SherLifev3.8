import  { useState } from 'react';
import { Search, Tag, DollarSign, Mail, Phone, X } from 'lucide-react';
import type { MarketplaceListing } from '../types';
import { MARKETPLACE_LISTINGS, MARKETPLACE_CATEGORIES } from '../data/marketplace';

interface ContactModalProps {
  listing: MarketplaceListing;
  onClose: () => void;
}

function ContactModal({ listing, onClose }: ContactModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-4 sm:p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Seller</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700
           dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Seller Name</p>
            <p className="dark:text-white">{listing.sellerName}</p>
          </div>
          
          {listing.sellerContact.email && (
            <div className="flex items-start space-x-2">
              <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <div className="flex-1 break-words">
                <p className="font-medium text-gray-700 dark:text-gray-300">Email</p>
                <a 
                  href={`mailto:${listing.sellerContact.email}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700
                   dark:hover:text-indigo-300"
                >
                  {listing.sellerContact.email}
                </a>
              </div>
            </div>
          )}
          
          {listing.sellerContact.phone && (
            <div className="flex items-start space-x-2">
              <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-700 dark:text-gray-300">Phone</p>
                <a 
                  href={`tel:${listing.sellerContact.phone}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  {listing.sellerContact.phone}
                </a>
              </div>
            </div>
          )}
          
          <div className="mt-2 pt-2 border-t dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Preferred contact method: {listing.sellerContact.preferredMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<typeof MARKETPLACE_CATEGORIES[number]>('All');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);

  const filteredListings = MARKETPLACE_LISTINGS.filter(listing => {
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Search and Categories Navigation */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 sm:p-4 backdrop-blur-sm bg-opacity-90">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#013767] focus:border-[#013767] dark:focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-wrap gap-2 flex-1">
              {MARKETPLACE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    selectedCategory === category
                      ? 'bg-[#013767] dark:bg-blue-500 text-white'
                      : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={() => alert('Post Item clicked')}
              className="px-4 py-2 bg-[#013767] dark:bg-blue-600 text-white rounded-lg hover:bg-[#012d56] dark:hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Post Item
            </button>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative pb-[60%]">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-xs sm:text-sm bg-white/90 dark:bg-gray-800/90 text-[#013767] dark:text-blue-300 rounded-full shadow">
                  {listing.category}
                </span>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{listing.title}</h3>
                <div className="flex items-center text-[#013767] dark:text-blue-300 font-semibold text-sm sm:text-base">
                  <DollarSign className="w-4 h-4" />
                  <span>{listing.price === 0 ? 'Free' : listing.price}</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2 mb-3">{listing.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <Tag className="w-4 h-4 mr-1" />
                  <span>{listing.condition}</span>
                </div>
                <button
                  onClick={() => setSelectedListing(listing)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#013767] dark:bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-[#012d56] dark:hover:bg-blue-700 transition-colors"
                >
                  Seller Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {selectedListing && (
        <ContactModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}

      {filteredListings.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No listings found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Marketplace;