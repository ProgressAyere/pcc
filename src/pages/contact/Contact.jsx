import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [typedText, setTypedText] = useState('');
  const [addressIndex, setAddressIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const addresses = ['Lagos, Nigeria', 'Port-Harcourt, Nigeria', 'Asaba, Nigeria'];
    const currentAddress = addresses[addressIndex];
    
    if (charIndex < currentAddress.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentAddress.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setTypedText('');
        setAddressIndex((addressIndex + 1) % addresses.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, addressIndex]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.projectType) newErrors.projectType = 'Project type is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Thank you! We will contact you soon.');
      setFormData({ fullName: '', phone: '', email: '', projectType: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">Contact Us</h1>
        <p className="text-center text-white mb-12 max-w-2xl mx-auto">
          We are ready to bring your architectural vision to life. Reach out to us for consultations, project inquiries, or any questions about our services.
        </p>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 text-white placeholder-gray-400"
                />
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 text-white placeholder-gray-400"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 text-white placeholder-gray-400"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 text-white placeholder-gray-400"
                >
                  <option value="">Select Project Type</option>
                  <option value="architectural-design">Architectural Design</option>
                  <option value="construction">Construction</option>
                  <option value="supervision">Supervision</option>
                  <option value="renovation">Renovation</option>
                  <option value="consultancy">Consultancy</option>
                </select>
                {errors.projectType && <p className="text-red-600 text-sm mt-1">{errors.projectType}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your project"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 text-white resize-none placeholder-gray-400"
                ></textarea>
                {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-black py-3 font-semibold transition-all duration-300 hover:bg-black hover:text-[#D4AF37]"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Column: Contact Details & Map */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Phone className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <p className="font-semibold text-white">Phone</p>
                  <p className="text-white">+234 818 142 3564</p>
                  <p className='text-white'>+234 805 138 9860</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-white">mpreslyn@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="text-[#D4AF37] mt-1" size={20} />
                <div>
                  <p className="font-semibold text-white">Office Address</p>
                  <p className="text-white min-h-[24px]">{typedText}<span className="animate-pulse">|</span></p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mb-8">
              <p className="font-semibold text-white mb-3">Follow Us</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1BzJsEuAWR/" className="text-[#D4AF37] hover:text-white transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/ph_construction_architect?utm_source=qr&igsh=aTFsc21uemdnNnE3" className="text-[#D4AF37] hover:text-white transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="https://www.tiktok.com/@pad_construction_consult?_r=1&_t=ZS-9423Jr967vh" className="text-[#D4AF37] hover:text-white transition-colors duration-300">
                  <FaTiktok size={24} />
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7276583429447!2d3.3792057!3d6.4281395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMyJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="PCC Office Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-[#D4AF37] text-center py-12">
          <h2 className="text-3xl font-bold text-black">Build with Confidence. Build with PCC.</h2>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+2348181423564"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#D4AF37] text-white p-4 rounded-full shadow-lg hover:bg-black hover:text-[#D4AF37] transition-all duration-300 z-50"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
};

export default Contact;
