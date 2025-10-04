document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const messageInput = document.getElementById('message');
            
            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const messageSuccess = document.getElementById('messageSuccess');
            
            const passwordStrength = document.getElementById('passwordStrength');
            const togglePassword = document.getElementById('togglePassword');
            const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
            
            // Toggle password visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🔒';
            });
            
            toggleConfirmPassword.addEventListener('click', function() {
                const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                confirmPasswordInput.setAttribute('type', type);
                this.textContent = type === 'password' ? '👁️' : '🔒';
            });
            
            // Real-time validation
            nameInput.addEventListener('blur', validateName);
            emailInput.addEventListener('blur', validateEmail);
            passwordInput.addEventListener('input', validatePassword);
            confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
            messageInput.addEventListener('blur', validateMessage);
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isNameValid = validateName();
                const isEmailValid = validateEmail();
                const isPasswordValid = validatePassword();
                const isConfirmPasswordValid = validateConfirmPassword();
                
                if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
                    // In a real application, you would submit the form data to a server here
                    alert('Form submitted successfully!');
                    form.reset();
                    passwordStrength.style.width = '0%';
                    passwordStrength.style.backgroundColor = '#e1e1e1';
                } else {
                    alert('Please fix the errors before submitting.');
                }
            });
            
            // Validation functions
            function validateName() {
                const name = nameInput.value.trim();
                
                if (name === '') {
                    showError(nameInput, nameError, 'Please enter your full name');
                    return false;
                } else if (name.length < 2) {
                    showError(nameInput, nameError, 'Name must be at least 2 characters');
                    return false;
                } else {
                    showSuccess(nameInput, nameError);
                    return true;
                }
            }
            
            function validateEmail() {
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email === '') {
                    showError(emailInput, emailError, 'Please enter your email address');
                    return false;
                } else if (!emailRegex.test(email)) {
                    showError(emailInput, emailError, 'Please enter a valid email address');
                    return false;
                } else {
                    showSuccess(emailInput, emailError);
                    return true;
                }
            }
            
            function validatePassword() {
                const password = passwordInput.value;
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumbers = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
                
                // Calculate password strength
                let strength = 0;
                if (password.length >= 8) strength += 25;
                if (hasUpperCase) strength += 25;
                if (hasLowerCase) strength += 25;
                if (hasNumbers) strength += 12.5;
                if (hasSpecialChar) strength += 12.5;
                
                // Update strength meter
                passwordStrength.style.width = `${strength}%`;
                
                if (strength < 50) {
                    passwordStrength.style.backgroundColor = '#e74c3c';
                } else if (strength < 75) {
                    passwordStrength.style.backgroundColor = '#f39c12';
                } else {
                    passwordStrength.style.backgroundColor = '#2ecc71';
                }
                
                if (password === '') {
                    showError(passwordInput, passwordError, 'Please create a password');
                    return false;
                } else if (password.length < 8) {
                    showError(passwordInput, passwordError, 'Password must be at least 8 characters');
                    return false;
                } else if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
                    showError(passwordInput, passwordError, 'Password must include uppercase, lowercase, number, and special character');
                    return false;
                } else {
                    showSuccess(passwordInput, passwordError);
                    return true;
                }
            }
            
            function validateConfirmPassword() {
                const confirmPassword = confirmPasswordInput.value;
                const password = passwordInput.value;
                
                if (confirmPassword === '') {
                    showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
                    return false;
                } else if (confirmPassword !== password) {
                    showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
                    return false;
                } else {
                    showSuccess(confirmPasswordInput, confirmPasswordError);
                    return true;
                }
            }
            
            function validateMessage() {
                const message = messageInput.value.trim();
                
                if (message !== '') {
                    messageSuccess.style.display = 'block';
                } else {
                    messageSuccess.style.display = 'none';
                }
            }
            
            // Helper functions
            function showError(input, errorElement, message) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                input.classList.add('invalid');
                input.classList.remove('valid');
            }
            
            function showSuccess(input, errorElement) {
                errorElement.style.display = 'none';
                input.classList.add('valid');
                input.classList.remove('invalid');
            }
        });