import React from "react";
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <>
      <Helmet>
        <title>About Us - TaskTrade</title>
      </Helmet>
      <div
        className={`py-10 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="container mx-auto px-6">
          {/* Heading Section */}
          <h1
            className={`text-4xl font-extrabold text-center mb-8 ${
              theme === "dark" ? "text-neon-green" : "text-green-600"
            }`}
          >
            About Task Trade
          </h1>
          <p
            className={`text-lg text-center mb-8 max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            We are Task Trade, your trusted partner for home repair services.
            Our goal is to provide reliable, professional, and affordable
            solutions to all your home repair needs, ensuring comfort and safety
            for you and your family.
          </p>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div
              className={`text-center p-6 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h2
                className={`text-3xl font-semibold mb-4 ${
                  theme === "dark" ? "text-neon-green" : "text-green-600"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Our mission is to make home repairs simple, transparent, and
                affordable. We provide a seamless process, from booking to
                completion, so you can relax and leave the work to our trusted
                professionals.
              </p>
            </div>
            <div
              className={`text-center p-6 rounded-lg shadow-lg ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h2
                className={`text-3xl font-semibold mb-4 ${
                  theme === "dark" ? "text-neon-green" : "text-green-600"
                }`}
              >
                Our Vision
              </h2>
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                We envision a world where every home is well-maintained, where
                repairs are hassle-free, and where customers trust Task Trade to
                get the job done right, every time.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2
              className={`text-3xl font-extrabold mb-6 ${
                theme === "dark" ? "text-neon-green" : "text-green-600"
              }`}
            >
              Meet Our Team
            </h2>
            <div className="flex justify-center gap-8">
              <div
                className={`w-48 p-6 rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                }`}
              >
                <img
                  src="https://i.ibb.co.com/r0B5RQm/istockphoto-1664876848-612x612.jpg"
                  alt="Team Member 1"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  John Doe
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Founder & CEO
                </p>
              </div>
              <div
                className={`w-48 p-6 rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                }`}
              >
                <img
                  src="https://i.ibb.co.com/SwDM3X5/istockphoto-1365223878-612x612.jpg"
                  alt="Team Member 2"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Jane Smith
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Operations Manager
                </p>
              </div>
              <div
                className={`w-48 p-6 rounded-lg shadow-lg ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                }`}
              >
                <img
                  src="https://i.ibb.co.com/hZpS7kr/istockphoto-1364917563-612x612.jpg"
                  alt="Team Member 3"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Alex Johnson
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Lead Technician
                </p>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div
            className={`text-center p-8 rounded-lg shadow-lg mb-16 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <h2
              className={`text-3xl font-extrabold mb-6 ${
                theme === "dark" ? "text-neon-green" : "text-green-600"
              }`}
            >
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div
                className={`bg-gray-100 p-6 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Plumbing
                </h3>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  From fixing leaks to installing new plumbing systems, our
                  experts handle it all.
                </p>
              </div>
              <div
                className={`bg-gray-100 p-6 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Electrical
                </h3>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Our certified electricians are ready to assist with electrical
                  repairs and installations.
                </p>
              </div>
              <div
                className={`bg-gray-100 p-6 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Carpentry
                </h3>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  From custom furniture to home renovations, we offer expert
                  carpentry services.
                </p>
              </div>
              <div
                className={`bg-gray-100 p-6 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Painting
                </h3>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Bring new life to your home with our professional painting
                  services, both interior and exterior.
                </p>
              </div>
              <div
                className={`bg-gray-100 p-6 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Cleaning
                </h3>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Our team provides deep cleaning and maintenance to keep your
                  home spotless.
                </p>
              </div>
              <div
                className={`bg-gray-100 p-6 rounded-lg shadow-md ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-white"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  Renovations
                </h3>
                <p
                  className={`text-gray-700 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Whether you want to update a room or renovate your entire
                  home, we make it happen.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2
              className={`text-3xl font-extrabold mb-6 ${
                theme === "dark" ? "text-neon-green" : "text-green-600"
              }`}
            >
              Get in Touch
            </h2>
            <p
              className={`text-lg mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Ready to get started with your home repair project? Contact us
              today and let Task Trade handle the work!
            </p>
            <a
              href="/contact"
              className={`px-6 py-3 text-lg font-semibold rounded-md hover:bg-green-700 focus:outline-none shadow-md ${
                theme === "dark"
                  ? "bg-neon-green text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
