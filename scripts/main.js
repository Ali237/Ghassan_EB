// Function to load section content
function loadSection(sectionId) {
  const sectionContainer = document.getElementById('section-container');
  
  // Show loading state
  sectionContainer.innerHTML = '<p>Loading...</p>';
  
  // Load the section content
  fetch(`sections/${sectionId}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Section not found');
      }
      return response.text();
    })
    .then(data => {
      sectionContainer.innerHTML = data;
      
      // Initialize any section-specific functionality
      if (sectionId === 'blog') {
        initBlog();
      }
    })
    .catch(error => {
      sectionContainer.innerHTML = `<p>Error loading section: ${error.message}</p>`;
    });
}

// Function to show a section
function showSection(sectionId) {
  loadSection(sectionId);
}

// Blog-specific functionality
function initBlog() {
  // Add filter functionality
  document.querySelectorAll('.blog-filter').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.blog-filter').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      // Here you would typically filter the blog posts
    });
  });
}

// Load the about section by default when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadSection('about');
});