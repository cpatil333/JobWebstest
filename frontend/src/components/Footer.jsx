import React from "react";

const Footer = () => {
  return <div>
    {/* <!-- Footer Section --> */}
<footer class="bg-gray-900 text-white py-8">
  <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
    {/* <!-- About Section --> */}
    <div>
      <h3 class="text-lg font-semibold mb-4">About Us</h3>
      <p class="text-sm text-gray-400">
        We connect talented professionals with leading companies. Join us today to start your journey to the perfect job.
      </p>
    </div>

    {/* <!-- Quick Links --> */}
    <div>
      <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
      <ul class="text-sm space-y-2 text-gray-400">
        <li><a href="#" class="hover:text-blue-400">Home</a></li>
        <li><a href="#" class="hover:text-blue-400">Browse Jobs</a></li>
        <li><a href="#" class="hover:text-blue-400">Post a Job</a></li>
        <li><a href="#" class="hover:text-blue-400">Blog</a></li>
        <li><a href="#" class="hover:text-blue-400">Contact Us</a></li>
      </ul>
    </div>

    {/* <!-- Contact Info --> */}
    <div>
      <h3 class="text-lg font-semibold mb-4">Contact</h3>
      <ul class="text-sm space-y-2 text-gray-400">
        <li>Email: <a href="mailto:support@jobportal.com" class="hover:text-blue-400">support@jobportal.com</a></li>
        <li>Phone: <a href="tel:+123456789" class="hover:text-blue-400">+123 456 789</a></li>
        <li>Address: 123 Job Street, City, Country</li>
      </ul>
    </div>

    {/* <!-- Social Media --> */}
    <div>
      <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
      <div class="flex space-x-4">
        <a href="#" class="text-gray-400 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path d="M22 2.5C22 2.22386 21.7761 2 21.5 2C21.2239 2 21 2.22386 21 2.5V6.5C21 6.77614 21.2239 7 21.5 7C21.7761 7 22 6.77614 22 6.5V2.5ZM18 4.5C18 3.67157 17.3284 3 16.5 3C15.6716 3 15 3.67157 15 4.5C15 5.32843 15.6716 6 16.5 6C17.3284 6 18 5.32843 18 4.5ZM12 6.5C12 6.22386 12.2239 6 12.5 6C12.7761 6 13 6.22386 13 6.5V8.5C13 8.77614 12.7761 9 12.5 9C12.2239 9 12 8.77614 12 8.5V6.5ZM6 9.5C6 9.22386 6.22386 9 6.5 9C6.77614 9 7 9.22386 7 9.5V12.5C7 12.7761 6.77614 13 6.5 13C6.22386 13 6 12.7761 6 12.5V9.5ZM12 16.5C12 16.2239 12.2239 16 12.5 16C12.7761 16 13 16.2239 13 16.5V18.5C13 18.7761 12.7761 19 12.5 19C12.2239 19 12 18.7761 12 18.5V16.5ZM12 6.5C11.4477 6.5 11 6.94772 11 7.5V8.5C11 9.05228 11.4477 9.5 12 9.5C12.5523 9.5 13 9.05228 13 8.5V7.5C13 6.94772 12.5523 6.5 12 6.5ZM6 9.5C5.44772 9.5 5 9.94772 5 10.5V12.5C5 13.0523 5.44772 13.5 6 13.5C6.55228 13.5 7 13.0523 7 12.5V10.5C7 9.94772 6.55228 9.5 6 9.5ZM18 4.5C17.4477 4.5 17 4.94772 17 5.5C17 6.05228 17.4477 6.5 18 6.5C18.5523 6.5 19 6.05228 19 5.5C19 4.94772 18.5523 4.5 18 4.5Z"/>
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12s4.478 10 10 10 10-4.478 10-10zm-6-2.5h-3V10c0-.828.672-1.5 1.5-1.5S19 9.172 19 10v1.5zm-4-3h-2V12h2V9.5zm-1 2.5h-1v-3h-2v6h-3v-6h-2v-3h4v3h2v-3h4v3h-2V12z"/>
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-13h-2v5h2V7z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>

  {/* <!-- Footer Bottom Section --> */}
  <div class="mt-8 text-center text-sm text-gray-400">
    <p>&copy; 2025 JobPortal. All Rights Reserved.</p>
  </div>
</footer>

  </div>;
};

export default Footer;
