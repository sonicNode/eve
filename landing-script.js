document.addEventListener('DOMContentLoaded', () => {
    const landingButton = document.querySelector('.landing-button');

    if (landingButton) {
        landingButton.addEventListener('click', function(e) {
            // 1. Prevent immediate navigation
            e.preventDefault(); 
            
            // 2. Get target URL
            const targetUrl = this.getAttribute('href');

            // 3. Create the overlay container
            const overlay = document.createElement('div');
            overlay.classList.add('transition-overlay');
            overlay.classList.add('active');
            document.body.appendChild(overlay);

            // 4. Create the Ripple (Green Wave)
            const ripple = document.createElement('div');
            ripple.classList.add('transition-ripple');
            overlay.appendChild(ripple);

            // 5. Position the wave start at button center
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            ripple.style.left = `${centerX}px`;
            ripple.style.top = `${centerY}px`;
            
            // Set initial small size
            ripple.style.width = '10px';
            ripple.style.height = '10px';

            // 6. Trigger Animation
            requestAnimationFrame(() => {
                // Scale huge to fill screen
                const maxDim = Math.max(window.innerWidth, window.innerHeight);
                const scaleSize = (maxDim / 5); // Multiplier ensures coverage
                
                ripple.style.transform = `translate(-50%, -50%) scale(${scaleSize})`; 
                ripple.style.opacity = '1';
            });

            // 7. Redirect after animation (800ms)
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 800);
        });
    }
});