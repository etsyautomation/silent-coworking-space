/**
 * Silent Coworking Space
 * Client-side script file (app.js)
 */

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------
  // 1. Mobile Menu Toggle
  // -----------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileToggle && navMenu) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });


  // -----------------------------------------
  // 2. Sticky Header Scroll Effect
  // -----------------------------------------
  const header = document.getElementById('header');

  const handleHeaderScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  // Run on load and scroll
  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();


  // -----------------------------------------
  // 3. Scrollspy (Active Section Highlighting)
  // -----------------------------------------
  const sections = document.querySelectorAll('section');

  const highlightNavOnScroll = () => {
    let scrollPosition = window.scrollY + 120; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);


  // -----------------------------------------
  // 4. Select Plan Button Interaction
  // -----------------------------------------
  const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
  const messageTextarea = document.getElementById('message');
  const fullNameInput = document.getElementById('fullName');

  selectPlanBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-plan');
      
      if (messageTextarea) {
        if (planName === 'Long-Term Plan') {
          messageTextarea.value = `Hello Silent Coworking Space! I would like to get custom pricing for a team/group or long-term plan. Please share more details.`;
        } else {
          messageTextarea.value = `Hello Silent Coworking Space! I am interested in booking a free visit and signing up for the "${planName}". Please let me know the availability.`;
        }
      }

      // Smooth scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Focus name input after small delay (to allow scroll animation to settle)
        setTimeout(() => {
          if (fullNameInput) {
            fullNameInput.focus();
          }
        }, 800);
      }
    });
  });


  // -----------------------------------------
  // 5. Contact Form Validation & WhatsApp Redirect
  // -----------------------------------------
  const enquiryForm = document.getElementById('enquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default submit

      // Reset feedback styling
      if (formFeedback) {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback hidden';
      }

      // Gather input data
      const fullName = document.getElementById('fullName').value.trim();
      const phoneNumber = document.getElementById('phoneNumber').value.trim();
      const emailAddress = document.getElementById('emailAddress').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic front-end validation
      if (!fullName) {
        showFeedback('Please enter your full name.', 'error');
        return;
      }

      // 10 digit phone verification
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        showFeedback('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      if (!message) {
        showFeedback('Please write a short message or query.', 'error');
        return;
      }

      // Show redirecting loading state
      showFeedback('Preparing your enquiry. Redirecting you to WhatsApp...', 'success');

      // Create WhatsApp Text Format
      const whatsappNumber = '917863807008'; // Country code (91 for India) + Phone (7863807008)
      const emailField = emailAddress ? emailAddress : 'Not Provided';
      
      let textContent = `Hello Silent Coworking Space! 🤫\n`;
      textContent += `New website enquiry received:\n\n`;
      textContent += `👤 *Name:* ${fullName}\n`;
      textContent += `📞 *Phone:* ${phoneNumber}\n`;
      textContent += `✉️ *Email:* ${emailField}\n\n`;
      textContent += `💬 *Query:* ${message}`;

      // URL encode text content
      const encodedText = encodeURIComponent(textContent);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      // Open in a new tab after 1.5 seconds so user sees feedback message
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form after sending
        enquiryForm.reset();
        showFeedback('Enquiry sent! The message has been loaded into WhatsApp.', 'success');
      }, 1500);
    });
  }

  // Helper function for showing visual form validation feedbacks
  function showFeedback(message, type) {
    if (formFeedback) {
      formFeedback.textContent = message;
      formFeedback.className = `form-feedback ${type}`;
    }
  }

});
