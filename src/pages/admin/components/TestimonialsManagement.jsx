import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Star } from 'lucide-react';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: 'Mr. Johnson O.', content: 'PCC delivered beyond our expectations...', rating: 5, status: 'approved', date: '2024-01-10' },
    { id: 2, name: 'Mrs. Adeyemi T.', content: 'From design to completion...', rating: 5, status: 'pending', date: '2024-01-12' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setShowModal(true);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setShowModal(true);
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleApprove = (id) => {
    setTestimonials(testimonials.map(t =>
      t.id === id ? { ...t, status: 'approved' } : t
    ));
  };

  const handleReject = (id) => {
    setTestimonials(testimonials.map(t =>
      t.id === id ? { ...t, status: 'rejected' } : t
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Testimonials Management</h1>
        <button
          onClick={handleAddTestimonial}
          className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
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
            <p className="text-black font-semibold mb-4">- {testimonial.name}</p>
            <p className="text-gray-500 text-sm mb-4">{testimonial.date}</p>

            <div className="flex gap-2">
              {testimonial.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(testimonial.id)}
                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(testimonial.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all flex items-center justify-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => handleEditTestimonial(testimonial)}
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all flex items-center justify-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteTestimonial(testimonial.id)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-all flex items-center justify-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <TestimonialModal
          testimonial={editingTestimonial}
          onClose={() => setShowModal(false)}
          onSave={(testimonial) => {
            if (editingTestimonial) {
              setTestimonials(testimonials.map(t => t.id === testimonial.id ? testimonial : t));
            } else {
              setTestimonials([...testimonials, { ...testimonial, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
            }
            setShowModal(false);
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
