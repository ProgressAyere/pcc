import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, Trash2, FolderOpen, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../../../config/supabaseClient';

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    file: null,
    folder: 'uncategorized',
    altText: '',
    caption: '',
    tags: ''
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, fileUrl) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Delete from storage if file_url contains storage path
      if (fileUrl && fileUrl.includes('storage')) {
        const filePath = fileUrl.split('/storage/v1/object/public/')[1];
        if (filePath) {
          const [bucket, ...pathParts] = filePath.split('/');
          await supabase.storage.from(bucket).remove([pathParts.join('/')]);
        }
      }

      setMediaFiles(mediaFiles.filter(f => f.id !== id));
    } catch (err) {
      alert('Error deleting file: ' + err.message);
      console.error('Error deleting media:', err);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadData({ ...uploadData, file });
    }
  };

  const handleUpload = async () => {
    if (!uploadData.file) {
      alert('Please select a file');
      return;
    }

    try {
      setUploading(true);
      const file = uploadData.file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${uploadData.folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const fileType = file.type.startsWith('image/') ? 'image' : 
                       file.type.startsWith('video/') ? 'video' : 'document';

      const { error: dbError } = await supabase
        .from('media_library')
        .insert({
          filename: fileName,
          original_filename: file.name,
          file_type: fileType,
          mime_type: file.type,
          file_size: file.size,
          file_url: publicUrl,
          folder: uploadData.folder,
          alt_text: uploadData.altText,
          caption: uploadData.caption,
          tags: uploadData.tags ? uploadData.tags.split(',').map(t => t.trim()) : []
        });

      if (dbError) throw dbError;

      await fetchMedia();
      
      setShowUploadModal(false);
      setUploadData({
        file: null,
        folder: 'uncategorized',
        altText: '',
        caption: '',
        tags: ''
      });

      alert('File uploaded successfully!');
    } catch (err) {
      alert('Error uploading file: ' + err.message);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const filteredMedia = filter === 'all' 
    ? mediaFiles 
    : mediaFiles.filter(m => m.file_type === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Media Library</h1>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-[#FFD700] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
          Upload Media
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold whitespace-nowrap text-sm sm:text-base ${
              filter === 'all' ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilter('image')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap text-sm sm:text-base ${
              filter === 'image' ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Images
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap text-sm sm:text-base ${
              filter === 'video' ? 'bg-[#FFD700] text-black' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Video className="w-4 h-4" />
            Videos
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          Error loading media: {error}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No media files found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredMedia.map((file) => (
            <div key={file.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                {file.file_type === 'image' ? (
                  file.thumbnail_url || file.file_url ? (
                    <img 
                      src={file.thumbnail_url || file.file_url} 
                      alt={file.alt_text || file.original_filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  )
                ) : file.file_type === 'video' ? (
                  file.thumbnail_url ? (
                    <img 
                      src={file.thumbnail_url} 
                      alt={file.original_filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Video className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                  )
                ) : (
                  <FolderOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                )}
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-black mb-2 text-sm sm:text-base truncate">
                  {file.original_filename}
                </h3>
                {file.folder && file.folder !== 'uncategorized' && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                    <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{file.folder}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-3">
                  <span>{formatFileSize(file.file_size)}</span>
                  <span>{formatDate(file.uploaded_at)}</span>
                </div>
                <button
                  onClick={() => handleDelete(file.id, file.file_url)}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Upload Media</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">File</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {uploadData.file && (
                  <p className="text-sm text-gray-600 mt-1">{uploadData.file.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Folder</label>
                <input
                  type="text"
                  value={uploadData.folder}
                  onChange={(e) => setUploadData({ ...uploadData, folder: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g., projects, designs"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Alt Text</label>
                <input
                  type="text"
                  value={uploadData.altText}
                  onChange={(e) => setUploadData({ ...uploadData, altText: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Description for accessibility"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Caption</label>
                <textarea
                  value={uploadData.caption}
                  onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows="3"
                  placeholder="Optional caption"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={uploadData.tags}
                  onChange={(e) => setUploadData({ ...uploadData, tags: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g., residential, duplex, lagos"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpload}
                disabled={uploading || !uploadData.file}
                className="flex-1 bg-[#FFD700] text-black py-2 rounded font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload'
                )}
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadData({
                    file: null,
                    folder: 'uncategorized',
                    altText: '',
                    caption: '',
                    tags: ''
                  });
                }}
                disabled={uploading}
                className="flex-1 bg-gray-300 text-black py-2 rounded font-semibold hover:bg-gray-400 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
