import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Star, Loader2 } from 'lucide-react';
import { supabase } from '../../../config/supabaseClient';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setShowModal(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowModal(true);
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        await fetchTestimonials();
      } catch (err) {
        alert('Failed to delete testimonial: ' + err.message);
      }
    }
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: 'approved', approved_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      await fetchTestimonials();
    } catch (err) {
      alert('Failed to approve testimonial: ' + err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: 'rejected' })
        .eq('id', id);
      
      if (error) throw error;
      await fetchTestimonials();
    } catch (err) {
      alert('Failed to reject testimonial: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading testimonials: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Testimonials Management</h1>
        <button
          onClick={handleAddTestimonial}
          className="bg-[#FFD700] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
                ))}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                testimonial.status === 'approved' ? 'bg-green-100 text-green-800' :
                testimonial.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
              </span>
            </div>

            <p className="text-black mb-4 italic">"{testimonial.content}"</p>
            <p className="text-black font-semibold mb-4">- {testimonial.client_name}</p>
            <p className="text-gray-500 text-sm mb-4">{new Date(testimonial.created_at).toLocaleDateString()}</p>

            <div className="flex flex-col gap-2">
              {testimonial.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(testimonial.id)}
                    className="flex-1 bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 transition-all flex items-center justify-center gap-1 text-sm"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(testimonial.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition-all flex items-center justify-center gap-1 text-sm"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="flex-1 bg-gray-500 text-white py-2 px-3 rounded hover:bg-gray-600 transition-all flex items-center justify-center gap-1 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <TestimonialModal
          testimonial={editingTestimonial}
          onClose={() => setShowModal(false)}
          onSave={async (testimonial) => {
            try {
              if (editingTestimonial) {
                const { error } = await supabase
                  .from('testimonials')
                  .update({
                    client_name: testimonial.name,
                    content: testimonial.content,
                    rating: testimonial.rating,
                    status: testimonial.status
                  })
                  .eq('id', testimonial.id);
                
                if (error) throw error;
              } else {
                const { error } = await supabase
                  .from('testimonials')
                  .insert([{
                    client_name: testimonial.name,
                    content: testimonial.content,
                    rating: testimonial.rating,
                    status: testimonial.status
                  }]);
                
                if (error) throw error;
              }
              await fetchTestimonials();
              setShowModal(false);
            } catch (err) {
              alert('Failed to save testimonial: ' + err.message);
            }
          }}
        />
      )}
    </div>
  );
};

const TestimonialModal = ({ testimonial, onClose, onSave }) => {
  const [formData, setFormData] = useState(testimonial || {
    name: '',
    content: '',
    rating: 5,
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Client Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Testimonial Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Rating</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700]"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#FFD700] text-black font-semibold py-3 rounded hover:bg-yellow-500 transition-all"
            >
              Save Testimonial
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialsManagement;
