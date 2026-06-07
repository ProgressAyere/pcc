import React, { useState, useEffect } from 'react';
import { Save, Building, Phone, Mail, Globe, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../../../config/supabaseClient';
import { useAuth } from '../../../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    website: ''
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: '',
    instagram: '',
    tiktok: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load settings from Supabase
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading settings from Supabase...');
      
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value');

      if (error) throw error;

      console.log('✅ Settings loaded from database:', data);

      // Map settings to state
      const settings = {};
      data.forEach(item => {
        settings[item.setting_key] = item.setting_value;
      });

      console.log('📦 Mapped settings object:', settings);

      // Update company info
      setCompanyInfo({
        name: settings.company_name || 'Pad Construction Consult and Services (PCC)',
        email: settings.company_email || '',
        phone: settings.company_phone || '',
        address: settings.company_address || '',
        website: settings.company_website || ''
      });

      // Update social media
      setSocialMedia({
        facebook: settings.social_facebook || '',
        instagram: settings.social_instagram || '',
        tiktok: settings.social_tiktok || ''
      });

      console.log('✅ State updated with settings');

    } catch (error) {
      console.error('❌ Error loading settings:', error);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  // Update or insert a setting
  const updateSetting = async (key, value, category = 'general') => {
    console.log(`🔄 Updating setting: ${key} = ${value}`);
    
    const { data: existing } = await supabase
      .from('admin_settings')
      .select('id')
      .eq('setting_key', key)
      .single();

    if (existing) {
      console.log(`📝 Setting exists, updating: ${key}`);
      // Update existing setting
      const { error } = await supabase
        .from('admin_settings')
        .update({ 
          setting_value: value,
          updated_at: new Date().toISOString(),
          updated_by: user?.id
        })
        .eq('setting_key', key);
      
      if (error) throw error;
      console.log(`✅ Updated: ${key}`);
    } else {
      console.log(`➕ Setting doesn't exist, creating: ${key}`);
      // Insert new setting
      const { error } = await supabase
        .from('admin_settings')
        .insert({
          setting_key: key,
          setting_value: value,
          setting_type: 'text',
          category: category,
          updated_by: user?.id
        });
      
      if (error) throw error;
      console.log(`✅ Created: ${key}`);
    }
  };

  const handleSaveCompanyInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    console.log('💾 Saving company information...');
    console.log('Company Info Data:', companyInfo);

    try {
      await updateSetting('company_name', companyInfo.name, 'company');
      await updateSetting('company_email', companyInfo.email, 'company');
      await updateSetting('company_phone', companyInfo.phone, 'company');
      await updateSetting('company_address', companyInfo.address, 'company');
      await updateSetting('company_website', companyInfo.website, 'company');

      console.log('✅ Company information saved successfully!');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('❌ Error saving company info:', error);
      setError('Failed to save company information');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    console.log('💾 Saving social media links...');
    console.log('Social Media Data:', socialMedia);

    try {
      await updateSetting('social_facebook', socialMedia.facebook, 'social');
      await updateSetting('social_instagram', socialMedia.instagram, 'social');
      await updateSetting('social_tiktok', socialMedia.tiktok, 'social');

      console.log('✅ Social media links saved successfully!');
      console.log('Final values in database:', {
        facebook: socialMedia.facebook,
        instagram: socialMedia.instagram,
        tiktok: socialMedia.tiktok
      });
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('❌ Error saving social media:', error);
      setError('Failed to save social media links');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setSaved(true);
      setPasswordData({ newPassword: '', confirmPassword: '' });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">Settings</h1>

      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Settings saved successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-6 h-6 text-[#FFD700]" />
            <h2 className="text-xl font-semibold text-black">Company Information</h2>
          </div>

          <form onSubmit={handleSaveCompanyInfo}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={companyInfo.website}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Company Info
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-[#FFD700]" />
            <h2 className="text-xl font-semibold text-black">Social Media Links</h2>
          </div>

          <form onSubmit={handleSaveSocialMedia}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Facebook</label>
              <input
                type="url"
                value={socialMedia.facebook}
                onChange={(e) => setSocialMedia({ ...socialMedia, facebook: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Instagram</label>
              <input
                type="url"
                value={socialMedia.instagram}
                onChange={(e) => setSocialMedia({ ...socialMedia, instagram: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">TikTok</label>
              <input
                type="url"
                value={socialMedia.tiktok}
                onChange={(e) => setSocialMedia({ ...socialMedia, tiktok: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="https://tiktok.com/@yourprofile"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Social Media
                </>
              )}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Change Password</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your new password below. You don't need to enter your current password since you're already logged in.
          </p>
          
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="Re-enter your new password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
