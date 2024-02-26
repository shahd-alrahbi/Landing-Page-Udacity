// Helper function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// Build the navigation menu 
function buildNav() {
   
    const sections = document.querySelectorAll('section');
    const navList = document.getElementById('navbar__list');

    sections.forEach((section, index) => {
        // Create list item and anchor elements
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const sectionName = section.getAttribute('data-nav');
        const sectionNameAttribute = sectionName.replace(/\s/g, '').toLowerCase();

        anchor.innerText = sectionName;
        anchor.setAttribute('href', `#${sectionNameAttribute}`);
        anchor.setAttribute('id', `link_no${index + 1}`);
        listItem.appendChild(anchor);
        navList.appendChild(listItem);

        // Add click event listener for smooth scrolling and section activation
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            scrollEvent(index + 1);
            sectionActivate(index + 1);
            navActivate(index + 1);
        });
    });
}

// Scroll to section on link click
function scrollEvent(index) {
    const section = document.getElementById(`section${index}`);
    const position = section.offsetTop;

    window.scrollTo({
        left: 0,
        top: position,
        behavior: 'smooth'
    });
}

// Activate section on click and deactivate previous one
function sectionActivate(index) {
    const activeClass = 'your-active-class';
    const activeSection = document.querySelector(`.${activeClass}`);
    const newActiveSection = document.getElementById(`section${index}`);

    if (activeSection) {
        activeSection.classList.remove(activeClass);
    }
    newActiveSection.classList.add(activeClass);
}

// Activate clicked navigation menu element
function navActivate(index) {

    const activeNav = document.getElementById(`link_no${index}`);
    const otherNavs = document.querySelectorAll('a');

    otherNavs.forEach(nav => {
        nav.classList.remove('active-nav');
    });
    activeNav.classList.add('active-nav');
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Execute the following when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    buildNav();
});

// Add scroll event listener to highlight active section in the viewport
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (isInViewport(section)) {
            sectionActivate(index + 1);
            navActivate(index + 1);
        }
    });
});
