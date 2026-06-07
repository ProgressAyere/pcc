import React, { useState } from 'react';
import { Image as ImageIcon, Video, Trash2, FolderOpen, Upload } from 'lucide-react';

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState([
    { id: 1, name: 'project-1-before.jpg', type: 'image', project: '5 Bedroom Duplex', size: '2.4 MB', date: '2024-01-15' },
    { id: 2, name: 'project-1-after.jpg', type: 'image', project: '5 Bedroom Duplex', size: '2.8 MB', date: '2024-01-15' },
    { id: 3, name: 'construction-video.mp4', type: 'video', project: '7 Units Apartment', size: '45 MB', date: '2024-02-10' },
  ]);
  const [filter, setFilter] = useState('all');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setMediaFiles(mediaFiles.filter(f => f.id !== id));
    }
  };

  const filteredMedia = filter === 'all' 
    ? mediaFiles 
    : mediaFiles.filter(m => m.type === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Media Library</h1>
        <button className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Media
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'all' ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
              filter === 'image' ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Images
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
              filter === 'video' ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Video className="w-4 h-4" />
            Videos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((file) => (
          <div key={file.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              {file.type === 'image' ? (
                <ImageIcon className="w-16 h-16 text-gray-400" />
              ) : (
                <Video className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-black mb-2">{file.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FolderOpen className="w-4 h-4" />
                <span>{file.project}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
              <button
                onClick={() => handleDelete(file.id)}
                className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
