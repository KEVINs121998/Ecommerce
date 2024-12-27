import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* About Us Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-800">About Us</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            We are a dedicated e-commerce platform committed to providing a seamless shopping experience. Our team works tirelessly to source the best products from trusted suppliers, ensuring that every item on our platform meets high standards of quality and affordability.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-800">Our Story</h3>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Founded with the goal of making shopping easy and enjoyable, we began as a small startup in the heart of the city. Our founders were inspired by the need for a reliable and affordable online shopping experience. Since then, we have grown into a trusted destination for millions of customers worldwide.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-800">Our Mission</h3>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Our mission is to empower customers by providing them with a diverse selection of high-quality products at competitive prices. We believe in the power of customer satisfaction, and we strive to exceed expectations in every order we fulfill. Our team is committed to providing the best customer service and an exceptional shopping experience.
          </p>
        </section>

        {/* Our Values Section */}
        <section className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-800">Our Values</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-800">Customer First</h4>
              <p className="text-lg text-gray-600 mt-2">
                We prioritize our customers above all else. Our success is built on providing top-notch customer service and ensuring customer satisfaction with every order.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-800">Integrity</h4>
              <p className="text-lg text-gray-600 mt-2">
                We conduct our business with honesty and transparency. Our products are carefully curated, and we offer clear and accurate information to our customers.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-800">Innovation</h4>
              <p className="text-lg text-gray-600 mt-2">
                We are always looking for new ways to enhance the shopping experience. Our platform is constantly evolving with the latest technology to provide a user-friendly and efficient experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-800">Meet Our Team</h3>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Our team is composed of passionate and skilled individuals who are dedicated to bringing the best shopping experience to our customers. From product sourcing to customer support, every team member plays a vital role in delivering excellence.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-500 text-white text-center py-8 mt-12">
          <h3 className="text-3xl font-semibold">Join Us on Our Journey</h3>
          <p className="text-lg mt-4">
            We are constantly growing and evolving. Stay tuned for new product offerings, special deals, and more exciting updates from our store.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
