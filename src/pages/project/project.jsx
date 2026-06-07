import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { ProjectSkeleton } from '../../components/skeleton/Skeleton';
import { supabase } from '../../config/supabaseClient';

// Import images
import design2bed from '../../assets/constructions/building-2bedroom-bungalow.jpeg';
import design2bed2 from '../../assets/constructions/building-2bedroom-bungalow1.jpeg';
import design3bed1 from '../../assets/designs/3-bedroom/3bedroom1.jpeg';
import design3bed2 from '../../assets/designs/3-bedroom/3bedroom2.jpeg';
import design3bed3 from '../../assets/designs/3-bedroom/3bedroomBungalow-with-2bedroom.jpeg';
import design3bedBung1 from '../../assets/designs/3-bedroom-bungalow/3bedroom-bungalow-design.jpeg';
import design3bedBung2 from '../../assets/designs/3-bedroom-bungalow/3bedroom-bungalow-with-1bedroom-apartment.jpeg';
import design4bed1 from '../../assets/designs/4-bedroom/building-4bedroom.jpeg';
import design4bed2 from '../../assets/designs/4-bedroom/4bedroom1.jpeg';
import design4bed3 from '../../assets/designs/4-bedroom/4bedroom2.jpeg';
import design5bed1 from '../../assets/designs/5-bedroom/5bedroom-duplex.jpeg';
import design5bed2 from '../../assets/designs/5-bedroom/5bedroom1.jpeg';
import design5bed3 from '../../assets/designs/5-bedroom/5bedroom2.jpeg';
import design7units from '../../assets/designs/7-units-flat/design-7units-flat.jpeg';
import apartment1 from '../../assets/designs/apartment-design/apartmentDesign-1.jpeg';
import apartment2 from '../../assets/designs/apartment-design/apartmentDesign-2.jpeg';
import apartment3 from '../../assets/designs/apartment-design/apartmentDesign-3.jpeg';
import apartment4 from '../../assets/designs/apartment-design/apartmentDesign-4.jpeg';
import blocksFlat from '../../assets/designs/blocks-of-flat/designs-block-of-flats.jpeg';
import hostel1 from '../../assets/designs/senate-hostel/senate-hostel-1.jpeg';
import hostel2 from '../../assets/designs/senate-hostel/senate-hostel-2.jpeg';
import hostel3 from '../../assets/designs/senate-hostel/senate-hostel-3.jpeg';
import mall1 from '../../assets/designs/shopping-mall/Shopping-mall-1.jpeg';
import mall2 from '../../assets/designs/shopping-mall/Shopping-mall-2.jpeg';
import mall3 from '../../assets/designs/shopping-mall/Shopping-mall-3.jpeg';
import mall4 from '../../assets/designs/shopping-mall/Shopping-mall-4.jpeg';
import construction7units2 from '../../assets/constructions/construction-7units-flat1.jpeg';
import construction7units3 from '../../assets/constructions/construction-7units-flat2.jpeg';
import construction1 from '../../assets/constructions/construction-1.jpeg';
import construction2 from '../../assets/constructions/construction-2.jpeg';
import construction3 from '../../assets/constructions/construction-3.jpeg';
import construction4 from '../../assets/constructions/construction-4.jpeg';
import construction5 from '../../assets/constructions/construction-5.jpeg';
import construction6 from '../../assets/constructions/construction-6.jpeg';
import construction7 from '../../assets/constructions/construction-7.jpeg';
import construction8 from '../../assets/constructions/construction-8.jpeg';
import construction9 from '../../assets/constructions/construction-9.jpeg';
import construction10 from '../../assets/constructions/construction-10.jpeg';
import construction11 from '../../assets/constructions/construction-11.jpeg';
import construction12 from '../../assets/constructions/construction-12.jpeg';
import construction13 from '../../assets/constructions/construction-13.jpeg';
import construction14 from '../../assets/constructions/construction-14.jpeg';
import construction15 from '../../assets/constructions/construction-15.jpeg';
import construction16 from '../../assets/constructions/construction-16.jpeg';
import construction17 from '../../assets/constructions/construction-17.jpeg';
import construction25 from '../../assets/constructions/construction25.jpeg';
import construction26 from '../../assets/constructions/construction26.jpeg';
import construction27 from '../../assets/constructions/constrcution27.jpeg';
import construction28 from '../../assets/constructions/constrcution28.jpeg';
import construction111 from '../../assets/constructions/construction-111.jpeg';
import firstStage1 from '../../assets/constructions/first-stage-of-building-1.jpeg';
import firstStage2 from '../../assets/constructions/first-stage-of-building-2.jpeg';
import firstStage3 from '../../assets/constructions/first-stage-of-building-3.jpeg';
import firstStage4 from '../../assets/constructions/first-stage-of-building-4.jpeg';
import firstStage5 from '../../assets/constructions/first-stage-of-building-5.jpeg';
import firstStage6 from '../../assets/constructions/first-stage-of-building-6.jpeg';
import firstStage7 from '../../assets/constructions/first-stage-of-building-7.jpeg';
import firstStage8 from '../../assets/constructions/first-stage-of-building-8.jpeg';
import onsite from '../../assets/constructions/onsite.jpeg';
import onsite2 from '../../assets/constructions/onsite2.jpeg';
import onsite4 from '../../assets/constructions/onsite4.jpeg';
import videoSrc from '../../assets/constructions/construction-video.mp4';
import fastforwardedVideo from '../../assets/constructions/fastforwarded.mp4';
import introVideo from '../../assets/constructions/intro.mp4';
import menWorkingVideo from '../../assets/constructions/men-working.mp4';
import overviewVideo from '../../assets/constructions/overview-of-work.mp4';
import buildingConstructionIcon from '../../assets/3d-icons/building-construction.svg';
import projectsIcon from '../../assets/3d-icons/projects.svg';
import headerBg from '../../assets/designs/senate-hostel/senate-hostel-3.jpeg';

// Project data
const projects = [
  {
    id: 1,
    title: '3 Bedroom Design',
    category: ['3 Bedroom'],
    type: 'design',
    image: design3bed1,
    images: [design3bed1, design3bed2, design3bed3],
    location: 'Lagos, Nigeria',
    description: 'Contemporary 3-bedroom design with spacious living areas and modern amenities. Designed for comfort and functionality.',
    status: 'Completed'
  },
  {
    id: 2,
    title: '3 Bedroom Bungalow Design',
    category: ['3 Bedroom'],
    type: 'design',
    image: design3bedBung1,
    images: [design3bedBung1, design3bedBung2],
    location: 'Port Harcourt, Nigeria',
    description: '3-bedroom bungalow with additional 1-bedroom apartment. Perfect for extended families or rental income opportunities.',
    status: 'Completed'
  },
  {
    id: 3,
    title: '4 Bedroom Residence Design',
    category: ['4 Bedroom'],
    type: 'design',
    image: design4bed1,
    images: [design4bed1, design4bed2, design4bed3],
    location: 'Lagos, Nigeria',
    description: 'Elegant 4-bedroom residence with contemporary design elements and premium finishes throughout.',
    status: 'Completed'
  },
  {
    id: 4,
    title: '5 Bedroom Duplex Design',
    category: ['Duplex'],
    type: 'design',
    image: design5bed1,
    images: [design5bed1, design5bed2, design5bed3],
    location: 'Lagos, Nigeria',
    description: 'Stunning 5-bedroom duplex with contemporary design, featuring spacious living areas and premium amenities.',
    status: 'Completed'
  },
  {
    id: 5,
    title: '7 Units Flat Design',
    category: ['7 Bedroom'],
    type: 'design',
    image: design7units,
    images: [design7units],
    location: 'Lagos, Nigeria',
    description: 'Multi-unit residential complex featuring 7 modern apartments with efficient space planning and contemporary design.',
    status: 'Completed'
  },
  {
    id: 6,
    title: 'Apartment Design',
    category: ['4 Bedroom'],
    type: 'design',
    image: apartment1,
    images: [apartment1, apartment2, apartment3, apartment4],
    location: 'Abuja, Nigeria',
    description: 'Modern apartment complex with multiple units featuring contemporary design and efficient space utilization.',
    status: 'Completed'
  },
  {
    id: 7,
    title: 'Blocks of Flat Design',
    category: ['7 Bedroom'],
    type: 'design',
    image: blocksFlat,
    images: [blocksFlat],
    location: 'Lagos, Nigeria',
    description: 'Multi-story blocks of flats with modern architecture and comprehensive amenities for residents.',
    status: 'Completed'
  },
  {
    id: 8,
    title: 'Senate Hostel Complex Design',
    category: ['Hostel'],
    type: 'design',
    image: hostel1,
    images: [hostel1, hostel2, hostel3],
    location: 'Enugu, Nigeria',
    description: 'Modern student hostel complex with multiple rooms, common areas, and security features. Designed for comfort and functionality.',
    status: 'Completed'
  },
  {
    id: 9,
    title: 'Shopping Mall Design',
    category: ['Shopping Mall'],
    type: 'design',
    image: mall1,
    images: [mall1, mall2, mall3, mall4],
    location: 'Lagos, Nigeria',
    description: 'State-of-the-art shopping mall with modern retail spaces, parking facilities, and contemporary architecture.',
    status: 'Completed'
  },
  {
    id: 10,
    title: '2 Bedroom Bungalow Construction',
    category: ['2 Bedroom'],
    type: 'construction',
    image: design2bed,
    images: [design2bed, design2bed2],
    location: 'Lagos, Nigeria',
    description: 'A beautifully designed 2-bedroom bungalow featuring modern architecture and efficient space utilization.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 11,
    title: '7 Units Flat Construction',
    category: ['7 Bedroom'],
    type: 'construction',
    image: construction7units2,
    images: [construction7units2, construction7units3, construction3],
    location: 'Abuja, Nigeria',
    description: 'Ongoing construction of 7-unit apartment building with modern amenities and quality finishes.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 12,
    title: 'Residential Construction Project',
    category: ['2 Bedroom'],
    type: 'construction',
    image: construction5,
    images: [construction5, construction6],
    location: 'Asaba, Nigeria',
    description: 'Quality residential construction showcasing our expertise in building durable and beautiful homes.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 13,
    title: 'Modern Residential Construction',
    category: ['3 Bedroom'],
    type: 'construction',
    image: construction1,
    images: [construction1, construction2, construction4],
    location: 'Lagos, Nigeria',
    description: 'Contemporary residential building with modern architectural design and quality construction.',
    video: null,
    status: 'Completed'
  },
  {
    id: 14,
    title: 'Duplex Construction Project',
    category: ['Duplex'],
    type: 'construction',
    image: construction7,
    images: [construction7, construction8, construction9],
    location: 'Port Harcourt, Nigeria',
    description: 'High-end duplex construction featuring premium materials and expert craftsmanship.',
    video: fastforwardedVideo,
    status: 'In Progress'
  },
  {
    id: 15,
    title: 'Estate Development Construction',
    category: ['4 Bedroom'],
    type: 'construction',
    image: construction10,
    images: [construction10, construction11, construction12],
    location: 'Abuja, Nigeria',
    description: 'Large-scale estate development with multiple residential units and modern infrastructure.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 16,
    title: 'Luxury Home Construction',
    category: ['4 Bedroom'],
    type: 'construction',
    image: construction13,
    images: [construction13, construction14, construction15],
    location: 'Lagos, Nigeria',
    description: 'Luxury residential construction with premium finishes and sophisticated design elements.',
    video: overviewVideo,
    status: 'Completed'
  },
  {
    id: 17,
    title: 'Contemporary Building Project',
    category: ['3 Bedroom'],
    type: 'construction',
    image: construction16,
    images: [construction16, construction17, construction111],
    location: 'Enugu, Nigeria',
    description: 'Contemporary building featuring innovative construction techniques and modern amenities.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 18,
    title: 'Commercial Construction',
    category: ['Shopping Mall'],
    type: 'construction',
    image: construction25,
    images: [construction25, construction26, construction27, construction28],
    location: 'Lagos, Nigeria',
    description: 'Commercial construction project with modern facilities and strategic location.',
    video: menWorkingVideo,
    status: 'In Progress'
  },
  {
    id: 19,
    title: 'Foundation & First Stage Construction',
    category: ['4 Bedroom'],
    type: 'construction',
    image: firstStage1,
    images: [firstStage1, firstStage2, firstStage3, firstStage4, firstStage5, firstStage6, firstStage7, firstStage8],
    location: 'Port Harcourt, Nigeria',
    description: 'Foundation and early stage construction showcasing our attention to structural integrity and quality workmanship.',
    video: introVideo,
    status: 'In Progress'
  },
  {
    id: 20,
    title: 'On-Site Construction Work',
    category: ['3 Bedroom'],
    type: 'construction',
    image: onsite,
    images: [onsite, onsite2, onsite4],
    location: 'Asaba, Nigeria',
    description: 'Active construction site showcasing our team at work building quality residential structures.',
    video: null,
    status: 'In Progress'
  }
];

// Filter categories
const filterCategories = [
  'All',
  '2 Bedroom',
  '3 Bedroom',
  '4 Bedroom',
  'Duplex',
  '7 Bedroom',
  'Shopping Mall',
  'Hostel'
];

// Image Gallery Component
const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-black">
      <img 
        src={images[currentIndex]} 
        alt={`${title} ${currentIndex + 1}`} 
        className="w-full h-full object-contain" 
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-black text-white p-3 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#D4AF37] hover:bg-black text-white p-3 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

// Project Detail Modal
const ProjectDetail = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-[#D4AF37] text-white p-2 rounded-full hover:bg-black transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-[#D4AF37] mb-6">
              <MapPin size={20} />
              <span className="text-lg">{project.location}</span>
            </div>

            <div className="border-t-2 border-black my-8"></div>

            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Project Designs</h2>
            <ImageGallery
              images={project.images}
              title={project.title}
            />

            <div className="border-t-2 border-black my-8"></div>

            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Project Description</h2>
            <p className="text-black text-base md:text-lg leading-relaxed mb-4">{project.description}</p>
            <div className="flex gap-4 flex-wrap">
              <span className="bg-[#D4AF37] text-white px-4 py-2 rounded text-sm font-semibold">
                Status: {project.status}
              </span>
              {project.category.map((cat, idx) => (
                <span key={idx} className="border-2 border-[#D4AF37] text-black px-4 py-2 rounded text-sm font-semibold">
                  {cat}
                </span>
              ))}
            </div>

            {project.video && (
              <>
                <div className="border-t-2 border-black my-8"></div>
                <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Project Video</h2>
                <div className="relative w-full h-64 md:h-96 bg-black rounded overflow-hidden">
                  <video
                    src={project.video}
                    controls
                    className="w-full h-full object-contain"
                    poster={project.image}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            )}

            <div className="border-t-2 border-black my-8"></div>

            <div className="text-center">
              <button
                onClick={onClose}
                className="bg-[#D4AF37] text-white px-8 py-3 rounded font-semibold hover:bg-black transition-colors"
              >
                Back to Projects Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer bg-gray-100"
      style={{ aspectRatio: '3/4' }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EPCC%3C/text%3E%3C/svg%3E';
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col items-center justify-center">
        <h3 className="text-[#D4AF37] text-xl md:text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center mb-4">
          {project.title}
        </h3>
        <button className="bg-[#D4AF37] text-white px-6 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold hover:bg-white hover:text-[#D4AF37]">
          View Project
        </button>
      </div>
    </div>
  );
};

// Filter Bar Component
const FilterBar = ({ activeFilters, onFilterChange }) => {
  const toggleFilter = (filter) => {
    if (filter === 'All') {
      onFilterChange([]);
    } else if (activeFilters.includes(filter)) {
      onFilterChange(activeFilters.filter((f) => f !== filter));
    } else {
      onFilterChange([...activeFilters, filter]);
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-12 pb-2">
      {filterCategories.map((category) => (
        <button
          key={category}
          onClick={() => toggleFilter(category)}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 min-h-[44px] text-sm sm:text-base whitespace-nowrap ${
            category === 'All'
              ? activeFilters.length === 0
                ? 'bg-[#D4AF37] text-black'
                : 'bg-white border-2 border-[#D4AF37] text-black hover:bg-[#D4AF37] hover:text-white'
              : activeFilters.includes(category)
              ? 'bg-[#D4AF37] text-black'
              : 'bg-white border-2 border-[#D4AF37] text-black hover:bg-[#D4AF37] hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
      {activeFilters.length > 0 && (
        <button
          onClick={() => onFilterChange([])}
          className="px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold bg-black text-white hover:bg-[#D4AF37] transition-all duration-300 min-h-[44px] text-sm sm:text-base"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

// Main Project Component
const Project = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supabaseProjects, setSupabaseProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        console.log('🔄 Loading projects from Supabase...');
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (error) {
          console.error('❌ Error loading projects:', error);
          throw error;
        }
        
        console.log('✅ Projects loaded successfully!');
        console.log('📊 Total Supabase projects:', data?.length || 0);
        console.log('📦 Supabase projects data:', data);
        
        // Transform Supabase data to match local project structure
        const transformedProjects = (data || []).map(project => ({
          id: `supabase-${project.id}`, // Add prefix to avoid ID conflicts
          title: project.title,
          category: project.category || [],
          type: project.type,
          image: project.main_image,
          images: project.images || [project.main_image],
          location: project.location,
          description: project.description,
          status: project.status,
          video: project.video || null
        }));
        
        console.log('📦 Transformed projects:', transformedProjects);
        setSupabaseProjects(transformedProjects);
      } catch (err) {
        console.error('❌ Error in loadProjects:', err);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <ProjectSkeleton />;

  // Combine hardcoded projects with Supabase projects
  const allProjects = [...projects, ...supabaseProjects];
  console.log('📊 Total combined projects:', allProjects.length);
  console.log('📦 Hardcoded projects:', projects.length);
  console.log('📦 Supabase projects:', supabaseProjects.length);

  const designProjects = allProjects.filter(p => p.type === 'design');
  const constructionProjects = allProjects.filter(p => p.type === 'construction');

  console.log('🎨 Design projects:', designProjects.length);
  console.log('🏗️ Construction projects:', constructionProjects.length);

  const currentProjects = activeTab === 'design' ? designProjects : constructionProjects;

  const filteredProjects = activeFilters.length === 0
    ? currentProjects
    : currentProjects.filter((project) =>
        activeFilters.some((filter) => project.category.includes(filter))
      );

  console.log('🔍 Active tab:', activeTab);
  console.log('🔍 Active filters:', activeFilters);
  console.log('🔍 Filtered projects count:', filteredProjects.length);

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">

      {/* ── IMAGE HEADER + TAB SECTION — full bleed ── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-10 pb-0 mb-8 overflow-hidden relative">

        {/* Blurred background image layer */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${headerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)',
            transform: 'scale(1.05)',
          }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Header text */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Inter] text-white mb-4">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold">
            Excellence in Every Structure
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* Joined Tab Navigation */}
        <div className="flex border-t border-white/10 max-w-2xl mx-auto relative z-10">
          <button
            onClick={() => {
              setActiveTab('design');
              setActiveFilters([]);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 font-semibold transition-all duration-300 relative ${
              activeTab === 'design'
                ? 'text-white after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-[#D4AF37]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <img src={buildingConstructionIcon} alt="3D Designs" className="w-6 h-6" />
            <span className="text-sm">3D DESIGNS</span>
            <span className="bg-[#D4AF37] text-black px-2 py-1 rounded-full text-xs font-bold">
              {designProjects.length}
            </span>
          </button>

          {/* Vertical divider between tabs */}
          <div className="w-px bg-white/10 my-3" />

          <button
            onClick={() => {
              setActiveTab('construction');
              setActiveFilters([]);
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 font-semibold transition-all duration-300 relative ${
              activeTab === 'construction'
                ? 'text-white after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:bg-[#D4AF37]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <img src={projectsIcon} alt="Projects" className="w-6 h-6" />
            <span className="text-sm">PROJECTS</span>
            <span className="bg-[#D4AF37] text-black px-2 py-1 rounded-full text-xs font-bold">
              {constructionProjects.length}
            </span>
          </button>
        </div>
      </div>
      {/* ── END HEADER SECTION ── */}

      {/* Rest of page inside constrained container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterBar activeFilters={activeFilters} onFilterChange={setActiveFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => {
            console.log('🎴 Rendering project card:', project.title, '| Image:', project.image ? 'YES' : 'NO');
            return (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-black mb-4">No projects found matching your filters.</p>
            <button
              onClick={() => setActiveFilters([])}
              className="bg-[#D4AF37] text-white px-8 py-3 rounded font-semibold hover:bg-black transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Project;
