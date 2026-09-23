/**
 * BODYBUILD FITNESS - Interactive Scripts
 * Handles modal controls, smooth navigation, cart updates, and notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const shopModal = document.getElementById('shopModal');
  const detailsModal = document.getElementById('detailsModal');
  const supportModal = document.getElementById('supportModal');
  const toastNotification = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  const cartBadge = document.getElementById('cartBadge');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  let cartCount = 1;

  // Helper: Show Toast Notification
  function showToast(message) {
    if (!toastNotification || !toastText) return;
    toastText.textContent = message;
    toastNotification.classList.add('visible');
    setTimeout(() => {
      toastNotification.classList.remove('visible');
    }, 3500);
  }

  // Helper: Open / Close Modals
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind Close Buttons & Backdrop Clicks
  [shopModal, detailsModal, supportModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.getElementById('closeShopModal')?.addEventListener('click', () => closeModal(shopModal));
  document.getElementById('closeDetailsModal')?.addEventListener('click', () => closeModal(detailsModal));
  document.getElementById('closeSupportModal')?.addEventListener('click', () => closeModal(supportModal));

  // ESC Key listener for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(shopModal);
      closeModal(detailsModal);
      closeModal(supportModal);
    }
  });

  // Modal Triggers: Shop Buttons
  const shopButtons = [
    document.getElementById('heroShopBtn'),
    document.getElementById('headerShopBtn'),
    document.getElementById('productShopNowBtn'),
    document.getElementById('cartTriggerBtn')
  ];

  shopButtons.forEach(btn => {
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(shopModal);
    });
  });

  // Modal Trigger: Cardio Explore Button
  document.getElementById('cardioExploreBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(shopModal);
  });

  // Modal Trigger: Details Button
  document.getElementById('productDetailsBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(detailsModal);
  });

  // Modal Switcher: Details to Shop
  document.getElementById('detailsToShopBtn')?.addEventListener('click', () => {
    closeModal(detailsModal);
    setTimeout(() => openModal(shopModal), 200);
  });

  // Modal Trigger: Support Button
  document.getElementById('getSupportBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(supportModal);
  });

  // Color Pill Selector in Shop Modal
  const colorPills = document.querySelectorAll('.color-pill');
  colorPills.forEach(pill => {
    pill.addEventListener('click', () => {
      colorPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Checkout Action
  document.getElementById('confirmOrderBtn')?.addEventListener('click', () => {
    cartCount += 1;
    if (cartBadge) cartBadge.textContent = cartCount;
    closeModal(shopModal);
    showToast('A1 Elliptical Trainer added to order! Redirecting to secure checkout...');
  });

  // Support Form Submission
  const supportForm = document.getElementById('supportForm');
  supportForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal(supportModal);
    showToast('Thank you! A gym equipment specialist will reach out shortly.');
    supportForm.reset();
  });

  // Mobile Menu Toggle
  mobileMenuToggle?.addEventListener('click', () => {
    mainNav?.classList.toggle('active');
  });

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('active');
    });
  });

  // Scroll Spy for Nav Links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink?.classList.add('active');
      }
    });
  }, { passive: true });
});
