import React, { useState, useCallback, useEffect } from 'react';
import { programOptions, interestOptions } from '../data/profileOptions';
import { useProfile } from '../hooks/useProfile';
import type { User } from '../types/user';

function Profile() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    studentId: '',
    programOfStudy: '',
    description: '',
    interests: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        studentId: profile.studentId || '',
        programOfStudy: profile.programOfStudy || '',
        description: profile.description || '',
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  const handleInputChange = useCallback((field: keyof User, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleInterestChange = useCallback((interest: string, checked: boolean) => {
    setFormData(prev => {
      const currentInterests = prev.interests || [];
      const newInterests = checked
        ? [...currentInterests, interest]
        : currentInterests.filter(i => i !== interest);
      
      return {
        ...prev,
        interests: newInterests
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setIsSaving(true);
    
    try {
      const updatedData = {
        ...profile,
        ...formData,
        isProfileComplete: true,
        updatedAt: new Date(),
      };

      const cleanedData = Object.fromEntries(
        Object.entries(updatedData)
          .filter(([_, value]) => value !== undefined && value !== '')
      );

      await updateProfile(cleanedData);
      setSuccessMessage('Profile updated successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !profile) return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  if (!profile) return <div className="flex items-center justify-center min-h-[400px]">No profile found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName ?? profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2
                  focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName ?? profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2
                  focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Student ID
              </label>
              <input
                type="text"
                value={formData.studentId ?? profile.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2
                  focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Program of Study
              </label>
              <select
                value={formData.programOfStudy ?? profile.programOfStudy}
                onChange={(e) => handleInputChange('programOfStudy', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2
                  focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select Program</option>
                {programOptions.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              About Me
            </label>
            <textarea
              value={formData.description ?? profile.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2
                focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interests
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.interests?.includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;