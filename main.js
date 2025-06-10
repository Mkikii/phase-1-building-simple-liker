// Add hidden class to error modal (already done in HTML)

document.addEventListener('DOMContentLoaded', () => {
  const hearts = document.querySelectorAll('.like-glyph');
  const errorModal = document.getElementById('modal');
  
  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('activated-heart')) {
        // If heart is already liked, unlike it
        heart.classList.remove('activated-heart');
        heart.textContent = '♡';
      } else {
        // If heart is not liked, attempt to like it
        mimicServerCall()
          .then(() => {
            // On success
            heart.classList.add('activated-heart');
            heart.textContent = '♥';
          })
          .catch(error => {
            // On failure
            errorModal.classList.remove('hidden');
            const modalMessage = document.getElementById('modal-message');
            modalMessage.textContent = error;
            
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});