import React, { useState, useRef } from 'react';
import { X, MapPin } from 'lucide-react';

// Import images
import design2bed from '../../assets/constructions/building-2bedroom-bungalow.jpeg';
import design2bed2 from '../../assets/constructions/building-2bedroom-bungalow1.jpeg';
import design3bed from '../../assets/designs/3bedroom-bungalow-design.jpeg';
import design3bed2 from '../../assets/designs/3bedroom1.jpeg';
import design3bed3 from '../../assets/designs/3bedroom2.jpeg';
import design3bed4 from '../../assets/designs/3bedroom-bungalow-with-1bedroom-apartment.jpeg';
import design4bed from '../../assets/designs/building-4bedroom.jpeg';
import design4bed2 from '../../assets/designs/4bedroom1.jpeg';
import design4bed3 from '../../assets/designs/4bedroom2.jpeg';
import design5bed from '../../assets/designs/building-5bedroom.jpeg';
import design5bed2 from '../../assets/designs/building-5bedroom1.jpeg';
import designDuplex from '../../assets/designs/design-5bedroom-duplex.jpeg';
import design7units from '../../assets/designs/design-7units-flat.jpeg';
import construction7units from '../../assets/constructions/construction-7units-flat.jpeg';
import construction7units2 from '../../assets/constructions/construction-7units-flat1.jpeg';
import hostel1 from '../../assets/designs/senate-hostel (1).jpeg';
import hostel2 from '../../assets/designs/senate-hostel (2).jpeg';
import hostel3 from '../../assets/designs/senate-hostel (3).jpeg';
import mall1 from '../../assets/designs/Shopping-mall (1).jpeg';
import mall2 from '../../assets/designs/Shopping-mall (2).jpeg';
import mall3 from '../../assets/designs/Shopping-mall (3).jpeg';
import mall4 from '../../assets/designs/Shopping-mall (4).jpeg';
import construction1 from '../../assets/constructions/construction (1).jpeg';
import construction2 from '../../assets/constructions/construction (2).jpeg';
import construction3 from '../../assets/constructions/construction (3).jpeg';
import construction4 from '../../assets/constructions/construction (4).jpeg';
import construction5 from '../../assets/constructions/construction (5).jpeg';
import construction6 from '../../assets/constructions/construction (6).jpeg';
import videoSrc from '../../assets/constructions/construction-video.mp4';

// Project data
const projects = [
  {
    id: 1,
    title: '2 Bedroom Bungalow',
    category: ['2 Bedroom', 'Completed'],
    image: design2bed,
    beforeImage: design2bed,
    afterImage: design2bed2,
    location: 'Lagos, Nigeria',
    description: 'A beautifully designed 2-bedroom bungalow featuring modern architecture and efficient space utilization. This project showcases our commitment to quality construction and attention to detail.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 2,
    title: '3 Bedroom Bungalow Design',
    category: ['3 Bedroom'],
    image: design3bed,
    beforeImage: design3bed,
    afterImage: design3bed2,
    location: 'Port Harcourt, Nigeria',
    description: 'Contemporary 3-bedroom bungalow with spacious living areas and modern amenities. Designed for comfort and functionality.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 3,
    title: '3 Bedroom with Apartment',
    category: ['3 Bedroom'],
    image: design3bed4,
    beforeImage: design3bed4,
    afterImage: design3bed3,
    location: 'Abuja, Nigeria',
    description: '3-bedroom bungalow with additional 1-bedroom apartment. Perfect for extended families or rental income opportunities.',
    video: null,
    status: 'Completed'
  },
  {
    id: 4,
    title: '4 Bedroom Residence',
    category: ['4 Bedroom'],
    image: design4bed,
    beforeImage: design4bed,
    afterImage: design4bed2,
    location: 'Lagos, Nigeria',
    description: 'Elegant 4-bedroom residence with contemporary design elements and premium finishes throughout.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 5,
    title: '4 Bedroom Luxury Home',
    category: ['4 Bedroom', 'Completed'],
    image: design4bed3,
    beforeImage: design4bed3,
    afterImage: construction1,
    location: 'Asaba, Nigeria',
    description: 'Luxury 4-bedroom home featuring high-end finishes, spacious rooms, and modern architectural design.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 6,
    title: '5 Bedroom Duplex',
    category: ['Duplex', 'Completed'],
    image: designDuplex,
    beforeImage: designDuplex,
    afterImage: design5bed,
    location: 'Lagos, Nigeria',
    description: 'Stunning 5-bedroom duplex with contemporary design, featuring spacious living areas and premium amenities.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 7,
    title: '5 Bedroom Estate Home',
    category: ['Duplex'],
    image: design5bed2,
    beforeImage: design5bed2,
    afterImage: construction2,
    location: 'Port Harcourt, Nigeria',
    description: 'Premium 5-bedroom estate home with modern architecture and luxurious interior spaces.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 8,
    title: '7 Units Apartment Complex',
    category: ['7 Bedroom', 'Completed'],
    image: design7units,
    beforeImage: design7units,
    afterImage: construction7units,
    location: 'Lagos, Nigeria',
    description: 'Multi-unit residential complex featuring 7 modern apartments with efficient space planning and contemporary design.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 9,
    title: '7 Units Flat Construction',
    category: ['7 Bedroom'],
    image: construction7units2,
    beforeImage: construction7units2,
    afterImage: construction3,
    location: 'Abuja, Nigeria',
    description: 'Ongoing construction of 7-unit apartment building with modern amenities and quality finishes.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 10,
    title: 'Senate Hostel Complex',
    category: ['Hostel', 'Completed'],
    image: hostel1,
    beforeImage: hostel1,
    afterImage: hostel2,
    location: 'Enugu, Nigeria',
    description: 'Modern student hostel complex with multiple rooms, common areas, and security features. Designed for comfort and functionality.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 11,
    title: 'University Hostel',
    category: ['Hostel'],
    image: hostel3,
    beforeImage: hostel3,
    afterImage: construction4,
    location: 'Lagos, Nigeria',
    description: 'Contemporary university hostel with modern facilities and comfortable living spaces for students.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 12,
    title: 'Premium Shopping Mall',
    category: ['Shopping Mall', 'Completed'],
    image: mall1,
    beforeImage: mall1,
    afterImage: mall2,
    location: 'Lagos, Nigeria',
    description: 'State-of-the-art shopping mall with modern retail spaces, parking facilities, and contemporary architecture.',
    video: videoSrc,
    status: 'Completed'
  },
  {
    id: 13,
    title: 'Commercial Shopping Center',
    category: ['Shopping Mall'],
    image: mall3,
    beforeImage: mall3,
    afterImage: mall4,
    location: 'Port Harcourt, Nigeria',
    description: 'Large-scale commercial shopping center featuring multiple retail units and modern amenities.',
    video: null,
    status: 'In Progress'
  },
  {
    id: 14,
    title: 'Residential Construction',
    category: ['Completed'],
    image: construction5,
    beforeImage: construction5,
    afterImage: construction6,
    location: 'Asaba, Nigeria',
    description: 'Quality residential construction showcasing our expertise in building durable and beautiful homes.',
    video: videoSrc,
    status: 'Completed'
  }
];

// Filter categories
const filterCategories = [
  '2 Bedroom',
  '3 Bedroom',
  '4 Bedroom',
  'Duplex',
  '7 Bedroom',
  'Shopping Mall',
  'Hostel',
  'Completed'
];

// Before/After Slider Component
const BeforeAfterSlider = ({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 md:h-[500px] overflow-hidden cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <img src={afterImage} alt={`${title} - After`} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt={`${title} - Before`} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-white"></div>
            <div className="w-0.5 h-4 bg-white"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-sm rounded">Before</div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-sm rounded">After</div>
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

            <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">Before & After</h2>
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
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
                Back to Portfolio
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
    if (activeFilters.includes(filter)) {
      onFilterChange(activeFilters.filter((f) => f !== filter));
    } else {
      onFilterChange([...activeFilters, filter]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {filterCategories.map((category) => (
        <button
          key={category}
          onClick={() => toggleFilter(category)}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold transition-all duration-300 min-h-[44px] text-sm sm:text-base ${
            activeFilters.includes(category)
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
  const [activeFilters, setActiveFilters] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilters.length === 0
    ? projects
    : projects.filter((project) =>
        activeFilters.some((filter) => project.category.includes(filter))
      );

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold">
            Excellence in Every Structure
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <FilterBar activeFilters={activeFilters} onFilterChange={setActiveFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
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
