import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Download, Eye, Trash2, RefreshCw, Loader2 } from 'lucide-react';
import { supabase } from '../../../config/supabaseClient';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      console.log('📥 Loading contact submissions from Supabase...');

      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      console.log('✅ Loaded submissions:', data);
      setSubmissions(data);
    } catch (error) {
      console.error('❌ Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshSubmissions = async () => {
    setRefreshing(true);
    await loadSubmissions();
    setRefreshing(false);
  };

  const toggleRead = async (id) => {
    try {
      const submission = submissions.find(s => s.id === id);
      const newStatus = submission.status === 'read' ? 'new' : 'read';

      const { error } = await supabase
        .from('contact_submissions')
        .update({ 
          status: newStatus,
          read_at: newStatus === 'read' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) throw error;

      setSubmissions(submissions.map(s =>
        s.id === id ? { ...s, status: newStatus } : s
      ));

      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus });
      }

      console.log(`✅ Status updated to ${newStatus}`);
    } catch (error) {
      console.error('❌ Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        const { error } = await supabase
          .from('contact_submissions')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setSubmissions(submissions.filter(s => s.id !== id));
        if (selectedSubmission?.id === id) setSelectedSubmission(null);

        console.log('✅ Submission deleted');
      } catch (error) {
        console.error('❌ Error deleting submission:', error);
      }
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date', 'Status'],
      ...submissions.map(s => [
        s.name, 
        s.email, 
        s.phone || '', 
        s.subject, 
        s.message, 
        new Date(s.submitted_at).toLocaleString(), 
        s.status
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Contact Submissions</h1>
        <div className="flex gap-2">
          <button
            onClick={refreshSubmissions}
            disabled={refreshing}
            className="bg-gray-200 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center gap-2 text-sm sm:text-base disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="bg-[#FFD700] text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Export
          </button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No submissions yet</h3>
          <p className="text-gray-500">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-semibold text-black">
                All Submissions ({submissions.length})
                {submissions.filter(s => s.status === 'new').length > 0 && (
                  <span className="ml-2 text-sm text-blue-600">
                    ({submissions.filter(s => s.status === 'new').length} new)
                  </span>
                )}
              </h2>
            </div>
            <div className="divide-y max-h-[calc(100vh-250px)] overflow-y-auto">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    submission.status === 'new' ? 'bg-blue-50' : ''
                  } ${selectedSubmission?.id === submission.id ? 'border-l-4 border-[#FFD700]' : ''}`}
                  onClick={() => {
                    setSelectedSubmission(submission);
                    if (submission.status === 'new') toggleRead(submission.id);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {submission.status === 'new' ? (
                        <Mail className="w-5 h-5 text-blue-600" />
                      ) : (
                        <MailOpen className="w-5 h-5 text-gray-400" />
                      )}
                      <span className="font-semibold text-black">{submission.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(submission.submitted_at)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                  {submission.phone && (
                    <p className="text-sm text-gray-600 mb-1">{submission.phone}</p>
                  )}
                  <p className="text-sm font-medium text-black truncate">{submission.subject}</p>
                  <p className="text-sm text-gray-500 truncate mt-1">{submission.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            {selectedSubmission ? (
              <div>
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold text-black">Message Details</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleRead(selectedSubmission.id)}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                      title={selectedSubmission.status === 'read' ? 'Mark as unread' : 'Mark as read'}
                    >
                      {selectedSubmission.status === 'read' ? (
                        <Mail className="w-5 h-5" />
                      ) : (
                        <MailOpen className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedSubmission.id)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                      title="Delete submission"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 font-semibold">From</label>
                    <p className="text-black font-semibold text-lg">{selectedSubmission.name}</p>
                    <p className="text-gray-600">{selectedSubmission.email}</p>
                    {selectedSubmission.phone && (
                      <p className="text-gray-600">{selectedSubmission.phone}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 font-semibold">Subject</label>
                    <p className="text-black font-semibold">{selectedSubmission.subject}</p>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 font-semibold">Date</label>
                    <p className="text-black">{new Date(selectedSubmission.submitted_at).toLocaleString()}</p>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 font-semibold">Status</label>
                    <p className="text-black">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        selectedSubmission.status === 'new' 
                          ? 'bg-blue-100 text-blue-800' 
                          : selectedSubmission.status === 'read'
                          ? 'bg-gray-100 text-gray-800'
                          : selectedSubmission.status === 'responded'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Message</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <p className="text-black whitespace-pre-wrap">{selectedSubmission.message}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                      className="w-full bg-[#FFD700] text-black py-3 px-4 rounded font-semibold hover:bg-yellow-500 transition-all inline-flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <Eye className="w-16 h-16 mx-auto mb-4" />
                <p>Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSubmissions;
