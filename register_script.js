const modal = document.getElementById('modal-popup');
const registrationForm = document.querySelector('.registration-form');
const cancelButton = document.getElementById('cancel-btn');
const okButton = document.getElementById('ok-btn');
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const requiredInputs = registrationForm.querySelectorAll('[required]');
    let allValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            allValid = false;
        }
    });
    if (allValid) {
        modal.style.display = 'block';
    } else {
        alert("Please fill in all required fields.");
    }
});
cancelButton.addEventListener('click', function() {
    modal.style.display = 'none';
});
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});