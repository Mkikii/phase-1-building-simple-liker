document.addEventListener('DOMContentLoaded', () => {
  // Get all heart elements
  const hearts = document.querySelectorAll('.like-glyph');
  const errorModal = document.getElementById('modal');
  
  // Add click event to each heart
  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('activated-heart')) {
        // If already liked, unlike it
        heart.classList.remove('activated-heart');
        heart.textContent = '♡';
      } else {
        // Attempt to like
        mimicServerCall()
          .then(() => {
            // On success
            heart.classList.add('activated-heart');
            heart.textContent = '♥';
          })
          .catch(error => {
            // On failure
            errorModal.classList.remove('hidden');
            document.getElementById('modal-message').textContent = error;
            
            // Hide modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});