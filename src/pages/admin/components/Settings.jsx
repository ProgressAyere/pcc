import React, { useState } from 'react';
import { Save, Building, Phone, Mail, Globe, MapPin } from 'lucide-react';

const Settings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Pad Construction Consult and Services (PCC)',
    email: 'info@pcc.com',
    phone: '+234 123 456 7890',
    address: 'Lagos, Nigeria',
    website: 'www.pcc.com'
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: 'https://facebook.com/pcc',
    instagram: 'https://instagram.com/pcc',
    twitter: 'https://twitter.com/pcc',
    linkedin: 'https://linkedin.com/company/pcc'
  });

  const [saved, setSaved] = useState(false);

  const handleSaveCompanyInfo = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveSocialMedia = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">Settings</h1>

      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Settings saved successfully!
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
              className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Company Info
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
              <label className="block text-gray-700 font-semibold mb-2">Twitter</label>
              <input
                type="url"
                value={socialMedia.twitter}
                onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="https://twitter.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">LinkedIn</label>
              <input
                type="url"
                value={socialMedia.linkedin}
                onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Social Media
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-black mb-6">Change Password</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded hover:bg-gray-800 transition-all"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
