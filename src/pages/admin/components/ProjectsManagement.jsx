import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload, Image as ImageIcon, Video, ChevronUp, ChevronDown, MapPin, Loader2 } from 'lucide-react';
import { supabase } from '../../../config/supabaseClient';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['2 Bedroom', '3 Bedroom', '4 Bedroom', 'Duplex', '7 Bedroom', 'Shopping Mall', 'Hostel'];

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching projects from Supabase...');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        console.error('❌ Error fetching projects:', error);
        throw error;
      }
      
      console.log('✅ Projects fetched successfully!');
      console.log('📊 Total projects:', data?.length || 0);
      console.log('📦 Projects data:', data);
      
      setProjects(data || []);
    } catch (err) {
      console.error('❌ Error in fetchProjects:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      console.log('✅ Fetch projects completed');
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      console.log('🗑️ Deleting project with ID:', id);
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Error deleting project:', error);
        throw error;
      }
      
      console.log('✅ Project deleted successfully!');
      await fetchProjects();
    } catch (err) {
      console.error('❌ Error in handleDeleteProject:', err);
      alert('Error deleting project: ' + err.message);
    }
  };

  const handleMoveUp = async (projectId) => {
    const idx = filteredProjects.findIndex(p => p.id === projectId);
    if (idx === 0) return;
    const project1 = filteredProjects[idx - 1];
    const project2 = filteredProjects[idx];

    try {
      console.log('⬆️ Moving project up:', project2.title);
      console.log('Swapping display_order:', project1.display_order, '↔️', project2.display_order);
      
      await supabase.from('projects').update({ display_order: project2.display_order }).eq('id', project1.id);
      await supabase.from('projects').update({ display_order: project1.display_order }).eq('id', project2.id);
      
      console.log('✅ Project moved up successfully!');
      await fetchProjects();
    } catch (err) {
      console.error('❌ Error moving project up:', err);
      alert('Error updating order: ' + err.message);
    }
  };

  const handleMoveDown = async (projectId) => {
    const idx = filteredProjects.findIndex(p => p.id === projectId);
    if (idx === filteredProjects.length - 1) return;
    const project1 = filteredProjects[idx];
    const project2 = filteredProjects[idx + 1];

    try {
      console.log('⬇️ Moving project down:', project1.title);
      console.log('Swapping display_order:', project1.display_order, '↔️', project2.display_order);
      
      await supabase.from('projects').update({ display_order: project2.display_order }).eq('id', project1.id);
      await supabase.from('projects').update({ display_order: project1.display_order }).eq('id', project2.id);
      
      console.log('✅ Project moved down successfully!');
      await fetchProjects();
    } catch (err) {
      console.error('❌ Error moving project down:', err);
      alert('Error updating order: ' + err.message);
    }
  };

  const filteredProjects = projects
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => filterType === 'all' || p.type === filterType)
    .filter(p => filterStatus === 'all' || p.status === filterStatus)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return (
    <div className="px-3 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Projects Management</h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">Manage 3D designs and construction projects</p>
        </div>
        <button
          onClick={handleAddProject}
          className="bg-[#FFD700] text-black px-4 py-2.5 rounded-lg font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 text-sm whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Statistics — always 2-col on mobile, 4-col on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Projects" value={projects.length} valueClass="text-black" />
        <StatCard label="3D Designs" value={projects.filter(p => p.type === 'design').length} valueClass="text-blue-600" />
        <StatCard label="Construction" value={projects.filter(p => p.type === 'construction').length} valueClass="text-green-600" />
        <StatCard label="In Progress" value={projects.filter(p => p.status === 'In Progress').length} valueClass="text-yellow-600" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-5">
        <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 sm:gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] text-sm"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] text-sm bg-white"
          >
            <option value="all">All Types</option>
            <option value="design">3D Designs</option>
            <option value="construction">Construction Projects</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFD700] text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Projects — card list on mobile/tablet, table on lg+ */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-md flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600">
          Error loading projects: {error}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md text-center py-12">
          <p className="text-gray-500 text-base">No projects found</p>
          <button onClick={handleAddProject} className="mt-3 text-[#FFD700] hover:underline font-semibold text-sm">
            Add your first project
          </button>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet card list (hidden on lg+) */}
          <div className="lg:hidden space-y-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={filteredProjects.length}
                onMoveUp={() => handleMoveUp(project.id)}
                onMoveDown={() => handleMoveDown(project.id)}
                onEdit={() => handleEditProject(project)}
                onDelete={() => handleDeleteProject(project.id)}
              />
            ))}
          </div>

          {/* Desktop table (hidden below lg) */}
          <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-16">Order</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Project Title</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Media</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => handleMoveUp(project.id)}
                          disabled={index === 0}
                          className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(project.id)}
                          disabled={index === filteredProjects.length - 1}
                          className={`p-1 rounded ${index === filteredProjects.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {project.main_image ? (
                          <img src={project.main_image} alt={project.title} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <span className="text-black font-medium text-sm">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        project.type === 'design' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {project.type === 'design' ? '3D Design' : 'Construction'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.category.map((cat, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs whitespace-nowrap">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{project.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>{project.images?.length || 0}</span>
                        </div>
                        {project.video && (
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4 text-blue-600" />
                            <span>1</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showModal && (
        <ProjectModal
          project={editingProject}
          categories={categories}
          onClose={() => setShowModal(false)}
          onSave={async (project) => {
            try {
              console.log('💾 Saving project...');
              console.log('📦 Project data:', project);
              
              if (editingProject) {
                console.log('✏️ Updating existing project ID:', editingProject.id);
                
                const { error } = await supabase
                  .from('projects')
                  .update({
                    title: project.title,
                    type: project.type,
                    status: project.status,
                    location: project.location,
                    description: project.description,
                    category: project.category,
                    main_image: project.image,
                    images: project.images,
                    video: project.video
                  })
                  .eq('id', project.id);

                if (error) {
                  console.error('❌ Error updating project:', error);
                  throw error;
                }
                
                console.log('✅ Project updated successfully!');
              } else {
                console.log('➕ Creating new project...');
                
                const maxOrder = projects.length > 0 ? Math.max(...projects.map(p => p.display_order || 0)) : 0;
                console.log('📊 Max display order:', maxOrder, '→ New order:', maxOrder + 1);

                const { data, error } = await supabase
                  .from('projects')
                  .insert({
                    title: project.title,
                    type: project.type,
                    status: project.status,
                    location: project.location,
                    description: project.description,
                    category: project.category,
                    main_image: project.image,
                    images: project.images,
                    video: project.video,
                    display_order: maxOrder + 1
                  })
                  .select();

                if (error) {
                  console.error('❌ Error creating project:', error);
                  throw error;
                }
                
                console.log('✅ Project created successfully!');
                console.log('📦 Created project data:', data);
              }

              console.log('🔄 Refreshing projects list...');
              await fetchProjects();
              setShowModal(false);
              console.log('✅ Save complete!');
            } catch (err) {
              console.error('❌ Error in onSave:', err);
              alert('Error saving project: ' + err.message);
            }
          }}
        />
      )}
    </div>
  );
};

/* ── Small reusable stat card ── */
const StatCard = ({ label, value, valueClass }) => (
  <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
    <p className="text-gray-600 text-xs sm:text-sm leading-tight">{label}</p>
    <p className={`text-xl sm:text-2xl font-bold mt-0.5 ${valueClass}`}>{value}</p>
  </div>
);

/* ── Mobile / tablet project card ── */
const ProjectCard = ({ project, index, total, onMoveUp, onMoveDown, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <div className="flex items-start gap-3">
      {/* Thumbnail */}
      {project.image ? (
        <img src={project.image} alt={project.title} className="w-14 h-14 object-cover rounded flex-shrink-0" />
      ) : project.main_image ? (
        <img src={project.main_image} alt={project.title} className="w-14 h-14 object-cover rounded flex-shrink-0" />
      ) : (
        <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-black text-sm leading-snug">{project.title}</p>

        {/* Type + Status badges */}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            project.type === 'design' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
          }`}>
            {project.type === 'design' ? '3D Design' : 'Construction'}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1.5 text-gray-500 text-xs">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{project.location}</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {project.category.map((cat, i) => (
            <span key={i} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">{cat}</span>
          ))}
        </div>
      </div>

      {/* Order controls */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className={`p-1 rounded ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className={`p-1 rounded ${index === total - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Footer row: media count + actions */}
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{project.images?.length || 0} images</span>
        </div>
        {project.video && (
          <div className="flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-blue-600" />
            <span>1 video</span>
          </div>
        )}
      </div>
      <div className="flex gap-1">
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded"
          title="Edit"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

/* ── Project Modal (unchanged logic, tightened mobile padding) ── */
const ProjectModal = ({ project, categories, onClose, onSave }) => {
  const [formData, setFormData] = useState(project || {
    title: '',
    category: [],
    type: 'design',
    status: 'In Progress',
    location: '',
    description: '',
    image: '',
    images: [],
    video: null,
    date: new Date().toISOString().split('T')[0]
  });

  const [imagePreview, setImagePreview] = useState(project?.image || '');
  const [imagePreviews, setImagePreviews] = useState(project?.images || []);
  const [videoPreview, setVideoPreview] = useState(project?.video || null);
  const [customCategory, setCustomCategory] = useState('');

  const handleCategoryToggle = (cat) => {
    const current = formData.category || [];
    setFormData({
      ...formData,
      category: current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat]
    });
  };

  const handleAddCustomCategory = (e) => {
    e.preventDefault();
    const trimmed = customCategory.trim();
    if (!trimmed) return;
    
    const current = formData.category || [];
    if (!current.includes(trimmed)) {
      setFormData({
        ...formData,
        category: [...current, trimmed]
      });
    }
    setCustomCategory('');
  };

  const handleRemoveCategory = (cat) => {
    const current = formData.category || [];
    setFormData({
      ...formData,
      category: current.filter(c => c !== cat)
    });
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];
    let loaded = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        loaded++;
        if (loaded === files.length) {
          const updated = [...imagePreviews, ...newPreviews];
          setImagePreviews(updated);
          setFormData({ ...formData, images: updated });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setFormData({ ...formData, video: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const updated = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updated);
    setFormData({ ...formData, images: updated });
  };

  const removeVideo = () => {
    setVideoPreview(null);
    setFormData({ ...formData, video: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((formData.category || []).length === 0) {
      alert('Please select at least one category');
      return;
    }
    onSave({ ...formData, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl my-4 sm:my-8">
        {/* Modal header */}
        <div className="p-4 sm:p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-lg sm:text-2xl font-bold text-black">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black p-1">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Project Type */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Project Type *</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'design' })}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  formData.type === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                3D Design
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'construction' })}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  formData.type === 'construction' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Construction
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Project Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700] text-sm sm:text-base"
              placeholder="e.g., 5 Bedroom Duplex Design"
              required
            />
          </div>

          {/* Location + Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700] text-sm sm:text-base"
                placeholder="e.g., Lagos, Nigeria"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700] text-sm sm:text-base bg-white"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Categories * (Select at least one)</label>
            
            {/* Predefined categories */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3 py-1.5 rounded-full font-semibold transition-all text-xs sm:text-sm ${
                    (formData.category || []).includes(cat)
                      ? 'bg-[#FFD700] text-black'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom category input */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2">
              <label className="block text-gray-600 text-xs sm:text-sm font-semibold mb-2">Add Custom Category</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomCategory(e);
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700] text-xs sm:text-sm"
                  placeholder="e.g., 5 Bedroom, Bungalow, etc."
                />
                <button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="bg-[#FFD700] text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition-all text-xs sm:text-sm whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Selected categories display */}
            {(formData.category || []).length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Selected Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {(formData.category || []).map((cat, idx) => (
                    <span key={idx} className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="hover:bg-blue-700 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Project Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFD700] text-sm sm:text-base"
              rows="3"
              placeholder="Describe the project, its features, and unique characteristics..."
              required
            />
          </div>

          {/* Main Image */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Main Featured Image *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 sm:h-64 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(''); setFormData({ ...formData, image: '' }); }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2 text-sm">Click to upload main image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFD700] file:text-black hover:file:bg-yellow-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Gallery Images */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Additional Images Gallery</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6">
              <div className="text-center mb-3">
                <ImageIcon className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2 text-sm">Upload multiple images</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleMultipleImagesUpload}
                  className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFD700] file:text-black hover:file:bg-yellow-500"
                />
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 mt-3">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-20 sm:h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Video */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Project Video (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6">
              {videoPreview ? (
                <div className="relative">
                  <video src={videoPreview} controls className="w-full h-48 sm:h-64 rounded" />
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Video className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2 text-sm">Click to upload project video</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="block w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#FFD700] file:text-black hover:file:bg-yellow-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-[#FFD700] text-black font-semibold py-2.5 sm:py-3 rounded hover:bg-yellow-500 transition-all text-sm sm:text-base"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2.5 sm:py-3 rounded hover:bg-gray-100 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsManagement;
