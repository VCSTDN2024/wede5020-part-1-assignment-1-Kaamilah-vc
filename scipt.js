

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // Tab Switching for Product Categories
  // -------------------------------
  const tabButtons = document.querySelectorAll('.tab-button');
  const categories = document.querySelectorAll('.product-category');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs and categories
      tabButtons.forEach(btn => btn.classList.remove('active'));
      categories.forEach(cat => cat.classList.remove('active'));

      // Activate selected tab and its category
      button.classList.add('active');
      const target = document.getElementById(button.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // -------------------------------
  // Search Filter (Scoped to Active Category)
  // -------------------------------
 const searchInput = document.getElementById('searchBar');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const allCards = document.querySelectorAll('.product-card');

    allCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      const match = title.includes(filter) || description.includes(filter);
      card.style.display = match ? 'block' : 'none';

      });
    });
  }

  // -------------------------------
  // Fancybox Lightbox for Product Images
  // -------------------------------
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind("[data-fancybox]", {});
  }

  // -------------------------------
  // Enquiry Form Validation + AJAX
  // -------------------------------
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = enquiryForm.name.value.trim();
      const email = enquiryForm.email.value.trim();
      const type = enquiryForm.type.value;
      const subject = enquiryForm.subject.value.trim();
      const message = enquiryForm.message.value.trim();

      // Basic validation checks
      if (name.length < 2) valid = false;
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) valid = false;
      if (!type) valid = false;
      if (subject.length < 5) valid = false;
      if (message.length < 10 || message.length > 500) valid = false;

      if (!valid) {
        alert('Please fill all fields correctly.');
        return;
      }

      // Friendly feedback based on enquiry type
      let response = '';
      if (type === 'product') response = 'Products available, estimated cost: 150–250 ZAR.';
      else if (type === 'volunteer') response = 'Volunteer spots open, we’ll contact you.';
      else if (type === 'sponsor') response = 'Sponsorship details sent via email.';
      alert(response);

      // AJAX submission
      fetch(enquiryForm.action, {
        method: 'POST',
        body: new FormData(enquiryForm),
        headers: { Accept: 'application/json' }
      }).then(res => {
        if (res.ok) alert('Enquiry sent successfully!');
        else alert('Something went wrong. Please try again.');
      }).catch(err => alert('Error: ' + err));
    });
  }

  // -------------------------------
  // Contact Form Validation + AJAX
  // -------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const type = contactForm.type.value;
      const message = contactForm.message.value.trim();

      if (name.length < 2) valid = false;
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) valid = false;
      if (!type) valid = false;
      if (message.length < 10 || message.length > 500) valid = false;

      if (!valid) {
        alert('Please complete all fields correctly.');
        return;
      }

      // AJAX submission
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      }).then(res => {
        if (res.ok) alert('Message sent successfully!');
        else alert('Something went wrong. Please try again.');
      }).catch(err => alert('Error: ' + err));
    });
  }

  // -------------------------------
  // Leaflet Map Integration (Pretoria)
  // -------------------------------
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = L.map('map').setView([-25.7479, 28.2293], 13); // Pretoria coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([-25.7479, 28.2293])
      .addTo(map)
      .bindPopup('MozaGlow Distribution Center');
  }
});
