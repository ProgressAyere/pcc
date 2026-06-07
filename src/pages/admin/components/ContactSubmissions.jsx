import React, { useState } from 'react';
import { Mail, MailOpen, Download, Eye, Trash2 } from 'lucide-react';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', message: 'I would like to discuss a new construction project...', date: '2024-01-15', read: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Consultation Request', message: 'Looking for architectural design services...', date: '2024-01-16', read: true },
  ]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const toggleRead = (id) => {
    setSubmissions(submissions.map(s =>
      s.id === id ? { ...s, read: !s.read } : s
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      setSubmissions(submissions.filter(s => s.id !== id));
      if (selectedSubmission?.id === id) setSelectedSubmission(null);
    }
  };

  const exportToCSV = () => {
    const csv = [
      ['Name', 'Email', 'Subject', 'Message', 'Date', 'Status'],
      ...submissions.map(s => [s.name, s.email, s.subject, s.message, s.date, s.read ? 'Read' : 'Unread'])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-submissions.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Contact Submissions</h1>
        <button
          onClick={exportToCSV}
          className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export to CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-black">All Submissions ({submissions.length})</h2>
          </div>
          <div className="divide-y max-h-[calc(100vh-250px)] overflow-y-auto">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${!submission.read ? 'bg-blue-50' : ''}`}
                onClick={() => {
                  setSelectedSubmission(submission);
                  if (!submission.read) toggleRead(submission.id);
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {submission.read ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-blue-600" />
                    )}
                    <span className="font-semibold text-black">{submission.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{submission.date}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{submission.email}</p>
                <p className="text-sm font-medium text-black">{submission.subject}</p>
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
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedSubmission.read ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="text-sm text-gray-600">From</label>
                  <p className="text-black font-semibold">{selectedSubmission.name}</p>
                  <p className="text-gray-600">{selectedSubmission.email}</p>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Subject</label>
                  <p className="text-black font-semibold">{selectedSubmission.subject}</p>
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Date</label>
                  <p className="text-black">{selectedSubmission.date}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Message</label>
                  <p className="text-black mt-2 whitespace-pre-wrap">{selectedSubmission.message}</p>
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
    </div>
  );
};

export default ContactSubmissions;
