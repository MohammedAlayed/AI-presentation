document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const graphicElement = document.querySelector(".graphic-element");
    const contentSections = document.querySelectorAll(".content-section");
    const imageSections = document.querySelectorAll(".image-section");
    
    // Track rotation count and current section
    let rotationCount180 = 0; // Track 180-degree rotations
    let currentSectionIndex = 0;
    
    // Total height for scroll calculation
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    // Calculate total rotation needed for all slides (11 slides * 180 degrees per slide)
    const totalRotationDegrees = (contentSections.length) * 180; 
    
    // Function to update rotation and content
    function updateOnScroll() {
        const scrollPosition = window.scrollY;
        // Ensure totalHeight is not zero to avoid division by zero
        const scrollFraction = totalHeight > 0 ? scrollPosition / totalHeight : 0;
        
        // Calculate raw rotation angle based on total degrees needed
        const rawRotation = scrollFraction * totalRotationDegrees;
        
        // Update only the graphic element rotation around its centered dot point (no translation needed)
        graphicElement.style.transform = `rotate(${rawRotation}deg)`;
        
        // Determine the current 180-degree rotation count
        const currentRotationCount180 = Math.floor(rawRotation / 180);

        // Check if a 180-degree threshold has been crossed
        if (currentRotationCount180 !== rotationCount180) {
            rotationCount180 = currentRotationCount180;
            
            // Calculate which section to show (cycle through sections 0 to 10)
            // Ensure index stays within bounds [0, 10]
            currentSectionIndex = Math.max(0, Math.min(rotationCount180, contentSections.length - 1));
            
            // Update active sections
            updateActiveSections();
        } else if (scrollPosition === 0) {
            // Handle edge case: Reset to first slide when scrolled to top
            currentSectionIndex = 0;
            rotationCount180 = 0;
            updateActiveSections();
        }
    }
    
    // Function to update active sections
    function updateActiveSections() {
        // Update content sections
        contentSections.forEach((section, index) => {
            if (index === currentSectionIndex) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
        
        // Update image sections
        imageSections.forEach((section, index) => {
            if (index === currentSectionIndex) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }
    
    // Initial update
    updateActiveSections();
    
    // Add scroll event listener
    window.addEventListener("scroll", updateOnScroll);
});
