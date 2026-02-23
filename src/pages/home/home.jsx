import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Handshake, Lightbulb, Smile, Ruler, Building2, HardHat, Wrench, Briefcase, Star } from 'lucide-react';
import heroImage from '../../assets/constructions/construction (1).jpeg';
import certImage from '../../assets/certification/certificate.png';
import ceoImage from '../../assets/profile-images/profile1.jpeg';
import project1 from '../../assets/designs/design-5bedroom-duplex.jpeg';
import project2 from '../../assets/designs/design-7units-flat.jpeg';
import project3 from '../../assets/designs/building-5bedroom.jpeg';
import project4 from '../../assets/constructions/building-2bedroom-bungalow.jpeg';
import project5 from '../../assets/constructions/construction-7units-flat2.jpeg';
import project6 from '../../assets/constructions/construction (10).jpeg';

const ProjectCard = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsSliding(false);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const current = projects[currentIndex];

  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 relative">
        <img
          src={current.image}
          alt={current.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 absolute inset-0 ${
            isSliding ? 'animate-slideOut' : 'animate-slideIn'
          }`}
          loading="lazy"
        />
      </div>
      <h3 className="text-black text-xl font-semibold mb-2">{current.title}</h3>
      <p className="text-black text-sm">{current.description}</p>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const projectSets = [
    [
      {
        image: project1,
        title: '5 Bedroom Duplex Design',
        description: 'Modern luxury duplex with contemporary design elements'
      },
      {
        image: project4,
        title: '2 Bedroom Bungalow Construction',
        description: 'Completed construction of elegant 2 bedroom bungalow'
      }
    ],
    [
      {
        image: project2,
        title: '7 Units Apartment Design',
        description: 'Multi-unit residential complex with efficient space planning'
      },
      {
        image: project5,
        title: '7 Units Flat Construction',
        description: 'Ongoing construction of modern apartment complex'
      }
    ],
    [
      {
        image: project3,
        title: '5 Bedroom Residence Design',
        description: 'Elegant family home with spacious living areas'
      },
      {
        image: project6,
        title: 'Residential Construction',
        description: 'Quality construction bringing designs to life'
      }
    ]
  ];
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img 
          src={heroImage} 
          alt="PCC Construction Project" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 max-w-4xl">
            Building Excellence, Designing Dreams
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-2xl">
            Professional Architecture & Construction Services in Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button onClick={() => navigate('/contact')} className="bg-[#FFD700] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded hover:bg-white hover:text-[#FFD700] transition-all duration-300 min-h-[44px]">
              Request Consultation
            </button>
            <button onClick={() => navigate('/project')} className="border-2 border-[#FFD700] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded hover:bg-[#FFD700] hover:text-white transition-all duration-300 min-h-[44px]">
              View Our Projects
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center">
            About PCC
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8 sm:mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div>
              <p className="text-black text-base sm:text-lg leading-relaxed mb-6">
                Pad Construction Consult and Services (PCC) is a registered architecture and construction firm in Nigeria, dedicated to delivering exceptional building solutions that exceed client expectations.
              </p>
              <p className="text-black text-base sm:text-lg leading-relaxed">
                With over 10 years of experience and 50+ completed projects, we combine innovative design with quality construction to bring your vision to life.
              </p>
            </div>
            <div>
              <img 
                src={certImage} 
                alt="PCC Registration Certificate" 
                className="w-full h-auto rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#FFD700] transition-all duration-300">
              <Award className="text-[#FFD700] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-black text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-black text-sm">Delivering superior quality in every project</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#FFD700] transition-all duration-300">
              <Handshake className="text-[#FFD700] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-black text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-black text-sm">Honest and transparent in all dealings</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#FFD700] transition-all duration-300">
              <Lightbulb className="text-[#FFD700] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-black text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-black text-sm">Creative solutions for modern challenges</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg hover:border-[#FFD700] transition-all duration-300">
              <Smile className="text-[#FFD700] w-12 h-12 mx-auto mb-4" />
              <h3 className="text-black text-xl font-semibold mb-2">Client Satisfaction</h3>
              <p className="text-black text-sm">Your success is our priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8F8F8] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8 sm:mb-12"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 group">
              <Ruler className="text-[#FFD700] w-14 h-14 mb-4" />
              <h3 className="text-black group-hover:text-white text-xl sm:text-2xl font-semibold mb-3">Architectural Design</h3>
              <p className="text-black group-hover:text-white text-sm sm:text-base">
                Innovative and functional designs tailored to your needs and budget.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 group">
              <Building2 className="text-[#FFD700] w-14 h-14 mb-4" />
              <h3 className="text-black group-hover:text-white text-xl sm:text-2xl font-semibold mb-3">Building Construction</h3>
              <p className="text-black group-hover:text-white text-sm sm:text-base">
                Quality construction services from foundation to finishing.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 group">
              <HardHat className="text-[#FFD700] w-14 h-14 mb-4" />
              <h3 className="text-black group-hover:text-white text-xl sm:text-2xl font-semibold mb-3">Project Supervision</h3>
              <p className="text-black group-hover:text-white text-sm sm:text-base">
                Expert oversight ensuring projects meet standards and timelines.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 group">
              <Wrench className="text-[#FFD700] w-14 h-14 mb-4" />
              <h3 className="text-black group-hover:text-white text-xl sm:text-2xl font-semibold mb-3">Renovation Services</h3>
              <p className="text-black group-hover:text-white text-sm sm:text-base">
                Transform existing spaces with modern upgrades and improvements.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300 group">
              <Briefcase className="text-[#FFD700] w-14 h-14 mb-4" />
              <h3 className="text-black group-hover:text-white text-xl sm:text-2xl font-semibold mb-3">Construction Consultancy</h3>
              <p className="text-black group-hover:text-white text-sm sm:text-base">
                Professional advice and guidance for all construction needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Project Highlights
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-black text-base sm:text-lg text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
            Explore some of our exceptional projects that showcase our commitment to quality, innovation, and client satisfaction.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {projectSets.map((projects, index) => (
              <ProjectCard key={index} projects={projects} />
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => navigate('/project')} className="border-2 border-[#FFD700] text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded hover:bg-[#FFD700] hover:text-black transition-all duration-300 min-h-[44px]">
              View Full Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="bg-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Meet Our CEO
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8 sm:mb-12"></div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div className="order-2 md:order-1">
              <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">Preslyn Ayere</h3>
              <p className="text-[#FFD700] text-lg sm:text-xl mb-6">CEO & Lead Architect</p>
              <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
                With over a decade of experience in architecture and construction, Preslyn Ayere leads PCC with a vision of transforming Nigeria's built environment through innovative design and quality construction.
              </p>
              <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
                His commitment to excellence and client satisfaction has positioned PCC as a trusted name in the industry.
              </p>
              <blockquote className="text-[#FFD700] text-lg sm:text-xl italic border-l-4 border-[#FFD700] pl-4">
                "We don't just build structures; we create spaces where dreams come alive and memories are made."
              </blockquote>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src={ceoImage} 
                alt="Preslyn Ayere - CEO of PCC" 
                className="w-full h-auto rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 border border-[#FFD700] rounded-lg">
              <div className="text-[#FFD700] text-4xl sm:text-5xl font-bold mb-2">10+</div>
              <p className="text-white text-base sm:text-lg">Years Experience</p>
            </div>
            <div className="text-center p-6 border border-[#FFD700] rounded-lg">
              <div className="text-[#FFD700] text-4xl sm:text-5xl font-bold mb-2">50+</div>
              <p className="text-white text-base sm:text-lg">Completed Projects</p>
            </div>
            <div className="text-center p-6 border border-[#FFD700] rounded-lg">
              <div className="text-[#FFD700] text-4xl sm:text-5xl font-bold mb-2">100%</div>
              <p className="text-white text-base sm:text-lg">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#F8F8F8] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-center">
            Client Testimonials
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-8 sm:mb-12"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <div className="flex gap-1 mb-4">
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
              </div>
              <p className="text-black text-sm sm:text-base mb-4 italic">
                "PCC delivered beyond our expectations. The attention to detail and professionalism was outstanding."
              </p>
              <p className="text-black font-semibold">- Mr. Johnson O.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <div className="flex gap-1 mb-4">
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
              </div>
              <p className="text-black text-sm sm:text-base mb-4 italic">
                "From design to completion, PCC made our dream home a reality. Highly recommended!"
              </p>
              <p className="text-black font-semibold">- Mrs. Adeyemi T.</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <div className="flex gap-1 mb-4">
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
                <Star className="text-[#FFD700] w-6 h-6 fill-[#FFD700]" />
              </div>
              <p className="text-black text-sm sm:text-base mb-4 italic">
                "Excellent service, quality work, and timely delivery. PCC is the best in the business."
              </p>
              <p className="text-black font-semibold">- Chief Okonkwo P.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-black text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
            Let's bring your vision to life. Contact us today for a free consultation and discover how PCC can transform your space.
          </p>
          <button onClick={() => navigate('/contact')} className="bg-[#FFD700] text-black px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded hover:bg-black hover:text-[#FFD700] transition-all duration-300 min-h-[44px]">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
