import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Effective Date:</strong> February 10, 2025
      </p>
      <p className="mb-4">
        Welcome to <strong>Sherlife</strong>. Your privacy is important to us, and this Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, which includes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Confession Board</strong>: An anonymous space for sharing thoughts and experiences.</li>
        <li><strong>Marketplace</strong>: A platform for buying, selling, or trading goods and services.</li>
        <li><strong>Events</strong>: Listings and management of events related to the Sheridan community.</li>
        <li><strong>Resources</strong>: Access to various Sheridan-related materials and information.</li>
      </ul>
      <p className="mb-4">By using our services, you agree to the terms of this Privacy Policy.</p>
      
      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-2"><strong>1.1 Personal Information</strong></p>
      <p className="mb-4">When you register or verify your account through us, we may collect:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Full name</li>
        <li>Email address</li>
        <li>Student ID (if applicable)</li>
        <li>Contact information (phone number, address)</li>
      </ul>

      <p className="mb-2"><strong>1.2 Non-Personal Information</strong></p>
      <ul className="list-disc list-inside mb-4">
        <li>Device information (IP address, browser type, operating system)</li>
        <li>Usage data (pages visited, time spent on the platform, click patterns)</li>
        <li>Anonymous confessions or posts (without linking to your identity)</li>
      </ul>

      <p className="mb-2"><strong>1.3 Payment Information</strong></p>
      <p className="mb-4">For transactions in the Marketplace, we collect payment details through secure third-party processors. We do not store your credit card information.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Verify your identity for platform access</li>
        <li>Provide and manage our services (Confession Board, Marketplace, Events, Resources)</li>
        <li>Facilitate transactions in the Marketplace</li>
        <li>Communicate with you about updates, events, or resources</li>
        <li>Improve our platform’s functionality and user experience</li>
        <li>Ensure community safety and compliance with our policies</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">We do not sell or rent your personal information. However, we may share your information in the following cases:</p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>With Service Providers</strong>: Third-party vendors assisting in platform operations (e.g., payment processors, hosting services).</li>
        <li><strong>For Legal Reasons</strong>: If required by law or to protect our rights, safety, or property.</li>
        <li><strong>With Consent</strong>: When you provide explicit consent for sharing information (e.g., participating in public events).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Choices and Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Access and Update</strong>: You can access and update your personal information in your account settings.</li>
        <li><strong>Opt-Out</strong>: You can opt-out of receiving non-essential communications from us.</li>
        <li><strong>Delete Account</strong>: You may request account deletion by contacting us at <a href="mailto:sinagamb@sheridancollege.ca" className="text-blue-500 hover:underline">sinagamb@sheridancollege.ca</a>.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact Us</h2>
      <p className="mb-4">
        If you have questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <p className="mb-2">Sherlife</p>
      <p className="mb-2">Email: <a href="mailto:sinagamb@sheridancollege.ca" className="text-blue-500 hover:underline">sinagamb@sheridancollege.ca</a></p>
      <p>Phone: <a href="tel:+16474463762" className="text-blue-500 hover:underline">+1 647-446-3762</a></p>

      <p className="mt-6">By using our platform, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy.</p>
    </div>
  );
};

export default PrivacyPolicy;