import React, { useState, useEffect } from 'react';
import { FolderOpen, Image, Mail, Star, TrendingUp, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabaseClient';

const Overview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { icon: FolderOpen, label: 'Total Projects', value: '0', color: 'bg-blue-500' },
    { icon: Image, label: 'Media Files', value: '0', color: 'bg-green-500' },
    { icon: Mail, label: 'Contact Submissions', value: '0', color: 'bg-purple-500' },
    { icon: Star, label: 'Testimonials', value: '0', color: 'bg-yellow-500' },
  ]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch projects count
      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      // Fetch media count
      const { count: mediaCount } = await supabase
        .from('media_library')
        .select('*', { count: 'exact', head: true });

      // Fetch contact submissions count
      const { count: contactsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });

      // Fetch testimonials count
      const { count: testimonialsCount } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true });

      // Update stats
      setStats([
        { icon: FolderOpen, label: 'Total Projects', value: String(projectsCount || 0), color: 'bg-blue-500' },
        { icon: Image, label: 'Media Files', value: String(mediaCount || 0), color: 'bg-green-500' },
        { icon: Mail, label: 'Contact Submissions', value: String(contactsCount || 0), color: 'bg-purple-500' },
        { icon: Star, label: 'Testimonials', value: String(testimonialsCount || 0), color: 'bg-yellow-500' },
      ]);

      // Fetch recent activity from multiple tables
      const activities = [];

      // Recent projects
      const { data: recentProjects } = await supabase
        .from('projects')
        .select('title, created_at')
        .order('created_at', { ascending: false })
        .limit(2);

      if (recentProjects) {
        recentProjects.forEach(project => {
          activities.push({
            action: `New project added: ${project.title}`,
            time: formatTimeAgo(project.created_at),
            type: 'project'
          });
        });
      }

      // Recent contacts
      const { data: recentContacts } = await supabase
        .from('contact_submissions')
        .select('name, submitted_at')
        .order('submitted_at', { ascending: false })
        .limit(2);

      if (recentContacts) {
        recentContacts.forEach(contact => {
          activities.push({
            action: `Contact form submission from ${contact.name}`,
            time: formatTimeAgo(contact.submitted_at),
            type: 'contact'
          });
        });
      }

      // Recent media
      const { data: recentMedia } = await supabase
        .from('media_library')
        .select('original_filename, uploaded_at')
        .order('uploaded_at', { ascending: false })
        .limit(1);

      if (recentMedia) {
        recentMedia.forEach(media => {
          activities.push({
            action: `Media uploaded: ${media.original_filename}`,
            time: formatTimeAgo(media.uploaded_at),
            type: 'media'
          });
        });
      }

      // Recent testimonials
      const { data: recentTestimonials } = await supabase
        .from('testimonials')
        .select('client_name, created_at')
        .order('created_at', { ascending: false })
        .limit(1);

      if (recentTestimonials) {
        recentTestimonials.forEach(testimonial => {
          activities.push({
            action: `Testimonial from ${testimonial.client_name}`,
            time: formatTimeAgo(testimonial.created_at),
            type: 'testimonial'
          });
        });
      }

      // Sort activities by most recent
      activities.sort((a, b) => {
        const timeA = extractTime(a.time);
        const timeB = extractTime(b.time);
        return timeA - timeB;
      });

      setRecentActivity(activities.slice(0, 4));

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const extractTime = (timeString) => {
    const match = timeString.match(/(\d+)\s+(minute|hour|day)/);
    if (!match) return 0;
    const value = parseInt(match[1]);
    const unit = match[2];
    if (unit === 'minute') return value;
    if (unit === 'hour') return value * 60;
    if (unit === 'day') return value * 1440;
    return 0;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-6">Dashboard Overview</h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-black mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Recent Activity</h2>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <TrendingUp className="w-5 h-5 text-[#FFD700]" />
                      <div className="flex-1">
                        <p className="text-black font-medium">{activity.action}</p>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              )}
            </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/admin/dashboard/projects')}
              className="w-full bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all"
            >
              Add New Project
            </button>
            <button 
              onClick={() => navigate('/admin/dashboard/media')}
              className="w-full bg-gray-800 text-white font-semibold py-3 rounded hover:bg-gray-700 transition-all"
            >
              Upload Media
            </button>
            <button 
              onClick={() => navigate('/admin/dashboard/contacts')}
              className="w-full border-2 border-gray-800 text-black font-semibold py-3 rounded hover:bg-gray-800 hover:text-white transition-all"
            >
              View Submissions
            </button>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Overview;
