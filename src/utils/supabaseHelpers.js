import { supabase } from '../config/supabaseClient';

// ============ PROJECTS ============

export const getAllProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getProjectById = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createProject = async (projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateProject = async (id, projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// ============ MEDIA LIBRARY ============

export const getAllMedia = async () => {
  const { data, error } = await supabase
    .from('media_library')
    .select('*, projects(title)')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const uploadFile = async (bucket, path, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return { ...data, publicUrl };
};

export const deleteFile = async (bucket, path) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  if (error) throw error;
  return true;
};

export const createMediaRecord = async (mediaData) => {
  const { data, error } = await supabase
    .from('media_library')
    .insert([mediaData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteMediaRecord = async (id) => {
  const { error } = await supabase
    .from('media_library')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// ============ CONTACT SUBMISSIONS ============

export const getAllContactSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createContactSubmission = async (submissionData) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([submissionData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const toggleReadStatus = async (id, currentStatus) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ read: !currentStatus })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteContactSubmission = async (id) => {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// ============ TESTIMONIALS ============

export const getAllTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getApprovedTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createTestimonial = async (testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonialData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateTestimonial = async (id, testimonialData) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ ...testimonialData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateTestimonialStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const deleteTestimonial = async (id) => {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// ============ COMPANY SETTINGS ============

export const getCompanySettings = async () => {
  const { data, error } = await supabase
    .from('company_settings')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
};

export const updateCompanySettings = async (settings) => {
  const { data, error } = await supabase
    .from('company_settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('id', settings.id)
    .select();
  
  if (error) throw error;
  return data[0];
};
