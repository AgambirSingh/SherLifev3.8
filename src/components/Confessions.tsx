import { useState, useCallback, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Flag, Search, Send, AlertTriangle } from 'lucide-react';
import { confessionServices } from '../services/firebase';

import { auth } from '../config/firebase';
import type { Confession } from '../types';

function Confessions() {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [newConfession, setNewConfession] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const CONFESSION_TAGS = [
    'Academic',
    'Social',
    'Personal',
    'Funny',
    'Campus Life',
    'Advice'
  ]
  
  useEffect(() => {
    const unsubscribe = confessionServices.getRealTimeConfessions((snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      } as Confession));
      setConfessions(data);
    });

    return () => unsubscribe();
  }, []);

  const handleVote = useCallback(async (confessionId: string, isUpvote: boolean) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert('Please login to vote');
      return;
    }

    try {
      await confessionServices.handleVote(confessionId, userId, isUpvote);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  }, []);

  const handleFlag = useCallback(async (confessionId: string) => {
    try {
      await confessionServices.flagConfession(confessionId);
      
    } catch (error) {
      console.error('Flagging failed:', error);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!newConfession.trim() || selectedTags.length === 0) return;
    if (!auth.currentUser) {
      alert('Please login to post');
      return;
    }

    try {
      await confessionServices.createConfession(
        newConfession.trim(),
        selectedTags,
        auth.currentUser.uid,
        {
          content: newConfession.trim(),
          tags: selectedTags,
          userVote: null,
          isFlagged: false,
          createdAt: new Date(),
 }
      );
      setNewConfession('');
      setSelectedTags([]);
    } catch (error) {
      console.error('Posting failed:', error);
    }
  }, [newConfession, selectedTags]);

  const filteredConfessions = confessions.filter(confession => {
  const matchesSearch = confession.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
  confession.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTags = searchTags.length === 0 || 
      searchTags.some(tag => confession.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="space-y-6">
      {/* Search Navigation */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700/30 
      rounded-lg p-4 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search confessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
              dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CONFESSION_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchTags.includes(tag)
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post Confession */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700/30">
        <textarea
          placeholder="Share your confession anonymously..."
          value={newConfession}
          onChange={(e) => setNewConfession(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white 
          dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500
           dark:focus:ring-blue-400 focus:border-transparent"
        />
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {CONFESSION_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!newConfession.trim() || selectedTags.length === 0}
            className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-
             hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Anonymously
          </button>
        </div>
      </div>

      {/* Confessions List */}
      <div className="space-y-4">
        {filteredConfessions.map((confession) => (
          <div key={confession.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-700/30">
            {confession.isFlagged && (
              <div className="mb-4 flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800
               dark:text-yellow-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>This confession has been flagged for review.</span>
              </div>
            )}
            <p className="text-gray-800 dark:text-gray-200">{confession.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {confession.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVote(confession.id, true)}
                  disabled={confession.userVote !== null}
                  className={`flex items-center space-x-1 ${
                    confession.userVote === 'up'
                      ? 'text-blue-600 dark:text-blue-400'
                      : confession.userVote === null
                      ? 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                      : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  }`}
                  title={confession.userVote !== null ? "You've already voted" : "Upvote this confession"}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{confession.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(confession.id, false)}
                  disabled={confession.userVote !== null}
                  className={`flex items-center space-x-1 ${
                    confession.userVote === 'down'
                      ? 'text-red-600 dark:text-red-400'
                      : confession.userVote === null
                      ? 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
                      : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                  }`}
                  title={confession.userVote !== null ? "You've already voted" : "Downvote this confession"}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{confession.downvotes}</span>
                </button>
              </div>
              <button
                onClick={() => handleFlag(confession.id)}
                disabled={confession.isFlagged}
                className={`${
                  confession.isFlagged
                    ? 'text-red-500 dark:text-red-400 cursor-not-allowed'
                    : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
                }`}
                title={confession.isFlagged ? "This confession has been flagged" : "Flag inappropriate content"}
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Confessions;