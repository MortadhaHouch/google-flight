import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { NavLink } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef<HTMLDivElement|null>(null);
  const featuresRef = useRef<HTMLDivElement|null>(null);
  const testimonialsRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    // Hero Section Animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
      }
    );

    // Features Section Animation
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );

    // Testimonials Section Animation
    gsap.fromTo(
      testimonialsRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="relative py-20" ref={heroRef}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Explore the World with TravelPedia</h1>
          <p className="text-xl text-gray-600 mb-8">Your journey begins here. Find the best flights to your dream destinations.</p>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose TravelPedia?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={featuresRef}>
          <FeatureCard icon="✈️" title="Best Prices" description="We compare prices from hundreds of airlines to ensure you get the best deal." />
          <FeatureCard icon="🌍" title="Global Coverage" description="Search flights to thousands of destinations worldwide." />
          <FeatureCard icon="⏱️" title="Fast & Easy" description="Book your flights in just a few clicks with our intuitive platform." />
        </div>
      </div>
      <div className="bg-gray-100 py-20" ref={testimonialsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="John Doe"
              feedback="TravelPedia made my travel planning so much easier. Highly recommend!"
            />
            <TestimonialCard
              name="Jane Smith"
              feedback="Amazing experience! The best prices and smooth booking process."
            />
            <TestimonialCard
              name="David Lee"
              feedback="Excellent service and great deals. I found my dream destination effortlessly."
            />
          </div>
        </div>
      </div>
      <button>
        <NavLink to="/search">
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
                fill="currentColor"
              />
            </svg>
          </div>
        </NavLink>
      </button>
    </main>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
    <div className="text-blue-600 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ name, feedback }: { name: string; feedback: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <p className="text-gray-600 italic mb-4">"{feedback}"</p>
    <h4 className="text-lg font-semibold text-gray-800">- {name}</h4>
  </div>
);

export default Home;
