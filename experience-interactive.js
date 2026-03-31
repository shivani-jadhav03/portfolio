// Interactive Experience Section
document.addEventListener('DOMContentLoaded', function() {
    // Get all company cards
    const companyCards = document.querySelectorAll('.company-card');
    const experienceDetails = document.querySelectorAll('.experience-detail');
    
    // Add click event listeners to company cards
    companyCards.forEach(card => {
        card.addEventListener('click', function() {
            const companyId = this.getAttribute('data-id');
            const targetDetail = document.getElementById(`${companyId}-detail`);
            
            // Remove active class from all cards and details
            companyCards.forEach(c => c.classList.remove('active'));
            experienceDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked card and corresponding detail
            this.classList.add('active');
            targetDetail.classList.add('active');
            
            // Smooth scroll to the detail section
            setTimeout(() => {
                targetDetail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 100);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all active cards and details
            companyCards.forEach(c => c.classList.remove('active'));
            experienceDetails.forEach(d => d.classList.remove('active'));
        }
    });
    
    // Add hover effect for better UX
    companyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    // Observe company cards for animation
    companyCards.forEach(card => {
        observer.observe(card);
    });
});
