import React, { useState, useCallback, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { programOptions, interestOptions } from '../data/profileOptions';
import { useProfile } from '../hooks/useProfile';
import type { User } from '../types/user';

function Profile() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
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

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

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
        photoURL: imagePreview || profile?.photoURL || '/default-avatar.jpg',
        isProfileComplete: true,
        updatedAt: new Date(),
      };

      const cleanedData = Object.fromEntries(
        Object.entries(updatedData)
          .filter(([_, value]) => value !== undefined && value !== '')
      );

      await updateProfile(cleanedData, imageFile);
      setImageFile(null);
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
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img
                  src={imagePreview || profile.photoURL || '/default-avatar.jpg'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md cursor-pointer
                 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
              >
                <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

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
                <option value="">Select a program</option>
                {programOptions.map((program) => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Interests
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(formData.interests || profile.interests || []).includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600
                     focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tell us about yourself, your interests, and what you're looking to achieve.
            </p>
            <textarea
              value={formData.description ?? profile.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-md border border-gray-300
               dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900
                dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Write a brief description about yourself..."
            />
          </div>

          <div className="flex justify-end items-center space-x-4">
            {isSaving && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Saving changes...
              </span>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
               dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-50
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isSaving ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;