document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HEADER INTERACTION & NAV LINKS ACTIVE STATE
       ========================================================================== */
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Add border / background color on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Highlight nav links on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       3. MENU TABS SWITCHING
       ========================================================================== */
    // Level 1 Menu Tabs (Popular vs Categories)
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active states from Level 1
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active states to Level 1 target
            btn.classList.add('active');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Level 2 Inner Category Tabs
    const catButtons = document.querySelectorAll('.category-tab-btn');
    const catContents = document.querySelectorAll('.category-tab-content');

    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCat = btn.getAttribute('data-cat');
            
            // Remove active states from Level 2
            catButtons.forEach(b => b.classList.remove('active'));
            catContents.forEach(c => c.classList.remove('active'));

            // Add active states to Level 2 target
            btn.classList.add('active');
            const targetContent = document.getElementById(`cat-${targetCat}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       4. INTERACTIVE MENU LIGHTBOX / GALLERY
       ========================================================================== */
    const albumItems = document.querySelectorAll('.album-item');
    const lightbox = document.getElementById('menu-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCaption = document.getElementById('lightbox-caption');

    // Menu image source paths
    const menuImages = [
        'images/menu_1.jpg',
        'images/menu_2.jpg',
        'images/menu_3.jpg',
        'images/menu_4.jpg',
        'images/menu_5.jpg',
        'images/menu_6.jpg'
    ];

    let currentImgIndex = 0;

    const openLightbox = (index) => {
        currentImgIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop body scrolling
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
    };

    const nextImage = () => {
        currentImgIndex = (currentImgIndex + 1) % menuImages.length;
        updateLightboxImage();
    };

    const prevImage = () => {
        currentImgIndex = (currentImgIndex - 1 + menuImages.length) % menuImages.length;
        updateLightboxImage();
    };

    const updateLightboxImage = () => {
        lightboxImg.src = menuImages[currentImgIndex];
        lightboxCaption.textContent = `Страница ${currentImgIndex + 1} из ${menuImages.length}`;
    };

    // Attach click events to album previews
    albumItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'), 10);
            openLightbox(index);
        });
    });

    // Control buttons events
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Close when clicking overlay (outside the image container)
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    // Keyboard support (Esc to close, Left/Right for gallery navigation)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    /* ==========================================================================
       5. CHATBOT PREVIEW SIMULATION (MICRO-ANIMATION)
       ========================================================================== */
    const chatMessagesContainer = document.querySelector('.chat-messages');
    const messagesData = [
        { text: "Здравствуйте! Кафе «Катрин», меня зовут Анастасия. Чем могу помочь? 😊", type: "received" },
        { text: "Здравствуйте! Хочу забронировать столик на субботу, 18:00. На 4 человека.", type: "sent" },
        { text: "Конечно! У нас есть отличные столики в зале и уютные беседки на летней веранде. Где бы вы предпочли? 🍽️", type: "received" },
        { text: "Давайте беседку на веранде.", type: "sent" },
        { text: "Хорошо! Записала на субботу в 18:00, беседка на 4 человека. Укажите, пожалуйста, ваш контактный телефон.", type: "received" },
        { text: "+7 (949) 008-33-46", type: "sent" },
        { text: "Отлично, бронь подтверждена! Ждем вас в гости! ✨", type: "received" }
    ];

    let currentMessageStep = 0;

    const runChatbotSimulation = () => {
        if (!chatMessagesContainer) return;
        
        chatMessagesContainer.innerHTML = '';
        currentMessageStep = 0;

        const showNextMessage = () => {
            if (currentMessageStep >= messagesData.length) {
                // Restart simulation after a pause
                setTimeout(runChatbotSimulation, 5000);
                return;
            }

            const currentMsg = messagesData[currentMessageStep];
            const msgElement = document.createElement('div');
            msgElement.className = `message ${currentMsg.type}`;
            msgElement.style.opacity = 0;
            msgElement.style.transform = 'translateY(10px)';
            msgElement.style.transition = 'all 0.3s ease';
            msgElement.textContent = currentMsg.text;

            chatMessagesContainer.appendChild(msgElement);
            
            // Trigger animation frame
            requestAnimationFrame(() => {
                msgElement.style.opacity = 1;
                msgElement.style.transform = 'translateY(0)';
            });

            // Auto-scroll phone container to bottom
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

            currentMessageStep++;
            
            // Delay next message based on type (longer delay for typing feeling)
            const delay = currentMsg.type === 'received' ? 2500 : 1500;
            setTimeout(showNextMessage, delay);
        };

        // Start chain
        setTimeout(showNextMessage, 1000);
    };

    // Initialize simulation
    runChatbotSimulation();

});
