document.addEventListener('DOMContentLoaded', () => {
  
  // Header Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Active Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up, .img-reveal, .text-reveal').forEach(el => {
    observer.observe(el);
  });

  // Counters Animation
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-target'));
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counterInterval = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          const currentCount = Math.round(countTo * (1 - Math.pow(1 - progress, 3))); // easeOutCubic
          
          if (target.innerHTML !== currentCount + "+") {
            target.innerHTML = currentCount + "+";
          }

          if (frame === totalFrames) {
            clearInterval(counterInterval);
            target.innerHTML = countTo + "+";
          }
        }, frameDuration);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Portfolio Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400); // match transition
          }
        });
      });
    });
  }

  // Floating Label Input State
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(input => {
    // Initial check
    if (input.value) input.classList.add('has-value');
    
    // Check on input
    input.addEventListener('input', () => {
      if (input.value) input.classList.add('has-value');
      else input.classList.remove('has-value');
    });

    // Check on change (for selects)
    input.addEventListener('change', () => {
      if (input.value) input.classList.add('has-value');
      else input.classList.remove('has-value');
    });
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const service = document.getElementById('service').value;

      if (!name || !email || !service) {
        formMessage.textContent = 'Please fill out all required fields.';
        formMessage.className = 'form-message error';
        return;
      }

      // Simulate sending
      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'SENDING...';
      btn.disabled = true;

      setTimeout(() => {
        formMessage.textContent = 'Thank you for your inquiry. Our team will contact you shortly.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

});
/* ---- Portfolio Lightbox ---- */
(function () {
  var cards = document.querySelectorAll('.portfolio-item[data-gallery]');
  if (!cards.length) return;
  var lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = '<img class="lightbox-img" alt="Project image">' +
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous">&#8592;</button>' +
    '<button class="lightbox-next" aria-label="Next">&#8594;</button>' +
    '<div class="lightbox-counter"></div>';
  document.body.appendChild(lb);
  var imgEl = lb.querySelector('.lightbox-img');
  var counter = lb.querySelector('.lightbox-counter');
  var imgs = [], idx = 0;
  function show(i) {
    idx = (i + imgs.length) % imgs.length;
    imgEl.src = imgs[idx];
    counter.textContent = (idx + 1) + ' / ' + imgs.length;
  }
  function open(list) {
    imgs = list;
    lb.classList.toggle('single', imgs.length < 2);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    show(0);
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
  }
  cards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      open(card.getAttribute('data-gallery').split(','));
    });
  });
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lightbox-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
