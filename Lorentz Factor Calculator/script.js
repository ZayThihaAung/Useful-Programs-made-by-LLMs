// Constants
        const C_KMS = 299792.458;
        const C_MILES = 186282.397;

        // Elements
        const velocityInput = document.getElementById('velocityInput');
        const unitSelect = document.getElementById('unitSelect');
        const gammaResult = document.getElementById('gammaResult');
        const betaResult = document.getElementById('betaResult');
        const timeDilationResult = document.getElementById('timeDilationResult');
        const lengthResult = document.getElementById('lengthResult');
        const speedBar = document.getElementById('speedBar');
        const percentageDisplay = document.getElementById('percentageDisplay');
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');

        // Main Calculation Function
        function calculateLorentz() {
            const inputVal = parseFloat(velocityInput.value);
            const unit = unitSelect.value;

            // Clear visuals if empty
            if (isNaN(inputVal)) {
                resetDisplay();
                return;
            }

            // 1. Calculate Beta (v/c)
            let beta = 0;
            if (unit === 'c') {
                beta = inputVal;
            } else if (unit === 'kms') {
                beta = inputVal / C_KMS;
            } else if (unit === 'miles') {
                beta = inputVal / C_MILES;
            }

            // 2. Validation
            if (beta < 0) {
                // Burmese Error: Velocity should be positive
                showError("လောရင့်ဇ် ဖက်တာ အတွက် အလျင် တန်ဖိုးသည် အပေါင်း (positive) ဖြစ်ရပါမည်။");
                beta = Math.abs(beta); // Auto-correct for user friendliness
            } else {
                hideError();
            }

            if (beta >= 1) {
                // Burmese Error: Cannot exceed light speed
                showError("အလျင်သည် အလင်းအလျင် (c) ထက် မကျော်လွန်နိုင်ပါ။ Physics သဘောတရားအရ မဖြစ်နိုင်ပါ။");
                updateVisuals(1); // Max out bar
                gammaResult.innerText = "∞"; // Infinity symbol
                betaResult.innerText = "1.000 c";
                timeDilationResult.innerText = "∞";
                lengthResult.innerText = "0.00";
                return;
            }

            // 3. Calculate Gamma
            // Formula: 1 / sqrt(1 - beta^2)
            const gamma = 1 / Math.sqrt(1 - (beta * beta));

            // 4. Update UI
            updateUI(gamma, beta);
        }

        function updateUI(gamma, beta) {
            // Determine decimal places based on magnitude
            let gammaDisplay;
            if (gamma > 10000) {
                gammaDisplay = gamma.toExponential(4);
            } else if (gamma < 1.0001 && gamma > 1) {
                gammaDisplay = gamma.toFixed(9);
            } else {
                gammaDisplay = gamma.toFixed(5);
            }

            // Update Text
            gammaResult.innerText = gammaDisplay;
            betaResult.innerText = beta.toFixed(6) + " c";
            
            // Update Context cards
            // Time: 1 sec * gamma
            let timeVal = gamma; 
            timeDilationResult.innerText = formatLargeNumber(timeVal);

            // Length: 100m / gamma
            let lenVal = 100 / gamma;
            lengthResult.innerText = formatLargeNumber(lenVal);

            // Update Visual Bar
            updateVisuals(beta);
            
            // Add animation class
            triggerAnimation();
        }

        function updateVisuals(beta) {
            const percent = Math.min(beta * 100, 100);
            speedBar.style.width = `${percent}%`;
            
            // Change color based on speed
            if (beta > 0.99) {
                speedBar.classList.remove('from-blue-500', 'via-cyan-400', 'to-purple-500');
                speedBar.classList.add('bg-red-500');
                speedBar.style.background = '#ef4444'; // Tailwind red-500
                speedBar.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.8)';
            } else {
                speedBar.style.background = ''; // Reset to gradient
                speedBar.style.boxShadow = '';
            }

            percentageDisplay.innerText = `${percent.toFixed(4)}% c`;
        }

        function formatLargeNumber(num) {
            if (num > 10000 || (num < 0.001 && num > 0)) {
                return num.toExponential(3);
            }
            return num.toFixed(2);
        }

        function resetDisplay() {
            gammaResult.innerText = "1.000";
            betaResult.innerText = "0.000 c";
            timeDilationResult.innerText = "1.00";
            lengthResult.innerText = "100.00";
            speedBar.style.width = "0%";
            percentageDisplay.innerText = "0% c";
            hideError();
        }

        function showError(msg) {
            errorMessage.classList.remove('hidden');
            errorText.innerText = msg;
        }

        function hideError() {
            errorMessage.classList.add('hidden');
        }

        function triggerAnimation() {
            const elements = [gammaResult, betaResult, timeDilationResult, lengthResult];
            elements.forEach(el => {
                el.classList.remove('value-update');
                void el.offsetWidth; // Trigger reflow
                el.classList.add('value-update');
            });
        }

        // Clipboard utility
        function copyToClipboard(elementId) {
            const text = document.getElementById(elementId).innerText;
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            
            // Visual feedback
            const btn = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"] i`);
            const originalClass = btn.className;
            btn.className = "fas fa-check text-green-400";
            setTimeout(() => {
                btn.className = originalClass;
            }, 1000);
        }

        // Event Listeners
        velocityInput.addEventListener('input', calculateLorentz);
        unitSelect.addEventListener('change', calculateLorentz);
        
        // Initial call
        calculateLorentz();