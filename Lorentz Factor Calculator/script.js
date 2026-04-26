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
        const wholeHTML = document.querySelector('.max-w-2xl');

function init() {
    // Re-query elements after HTML change
    let velocityInput, unitSelect, gammaResult, betaResult, timeDilationResult, lengthResult, speedBar;
    let percentageDisplay, errorMessage, errorText;
    velocityInput = document.getElementById('velocityInput');
    unitSelect = document.getElementById('unitSelect');
    gammaResult = document.getElementById('gammaResult');
    betaResult = document.getElementById('betaResult');
    timeDilationResult = document.getElementById('timeDilationResult');
    lengthResult = document.getElementById('lengthResult');
    speedBar = document.getElementById('speedBar');
    percentageDisplay = document.getElementById('percentageDisplay');
    errorMessage = document.getElementById('errorMessage');
    errorText = document.getElementById('errorText');
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
            if (myanmarRadio.checked) {
                if (beta < 0) {
                    showError("လောရင့်ဇ် ဖက်တာ အတွက် အလျင် တန်ဖိုးသည် အပေါင်း (positive) ဖြစ်ရပါမည်။");
                    beta = Math.abs(beta); // Auto-correct for user friendliness
                } else {
                    hideError();
                }
                if (beta >= 1) {
                    showError("အလျင်သည် အလင်းအလျင် (c) ထက် မကျော်လွန်နိုင်ပါ။ Physics သဘောတရားအရ မဖြစ်နိုင်ပါ။");
                    updateVisuals(1); // Max out bar
                    gammaResult.innerText = "∞"; // Infinity symbol
                    betaResult.innerText = "1.000 c";
                    timeDilationResult.innerText = "∞";
                    lengthResult.innerText = "0.00";
                    return;
                }
            } else {
                if (beta < 0) {
                    showError("Velocity for Lorentz Factor must be positive.");
                    beta = Math.abs(beta); // Auto-correct for user friendliness
                } else {
                    hideError();
                }
                if (beta >= 1) {
                    showError("Velocity for Lorentz Factor cannot exceed the speed of light.");
                    updateVisuals(1); // Max out bar
                    gammaResult.innerText = "∞"; // Infinity symbol
                    betaResult.innerText = "1.000 c";
                    timeDilationResult.innerText = "∞";
                    lengthResult.innerText = "0.00";
                    return;
                }
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
}
const burmeseHTML = `
    <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 leading-relaxed">
                လောရင့်ဇ် ဖက်တာ တွက်ချက်စက်
            </h1>
            <p class="text-slate-400 text-sm">MM Pop Science ၏ အထူးနှိုင်းရသီအိုရီ (Special Relativity) ကိရိယာ</p>
        </div>
        <div class="english-radio check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="englishRadio">
            <label class="form-check-label" for="englishRadio">
                English 
            </label>
            </div>
        <div class="burmese-radio check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="myanmarRadio" checked>
            <label class="form-check-label" for="myanmarRadio">
                Burmese
            </label>
        </div>
        <!-- Main Calculator Card -->
        <div class="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
            
            <!-- Input Section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="md:col-span-2">
                    <label class="block text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">အလျင် (Velocity v)</label>
                    <input type="number" id="velocityInput" placeholder="အလျင် တန်ဖိုးထည့်ပါ..." 
                        class="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors mono-font text-lg"
                        step="any" min="0">
                </div>
                <div>
                    <label class="block text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">ယူနစ် (Unit)</label>
                    <select id="unitSelect" class="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer">
                        <option value="c">c (အလင်းအလျင်)</option>
                        <option value="kms">km/s</option>
                        <option value="miles">miles/s</option>
                    </select>
                </div>
            </div>

            <!-- Error Message Container -->
            <div id="errorMessage" class="hidden bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span id="errorText">အလျင်သည် အလင်းအလျင်ထက် မကျော်လွန်နိုင်ပါ။</span>
            </div>

            <!-- Speed Bar Visual -->
            <div class="mb-8">
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                    <span>0</span>
                    <span>အလင်းအလျင် (c)</span>
                </div>
                <div class="h-4 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
                    <div id="speedBar" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 w-0 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
                    <!-- Markers -->
                    <div class="absolute top-0 bottom-0 left-[50%] w-px bg-slate-600/30"></div>
                    <div class="absolute top-0 bottom-0 left-[90%] w-px bg-slate-600/30"></div>
                    <div class="absolute top-0 bottom-0 left-[99%] w-px bg-red-500/50"></div>
                </div>
                <div class="text-right text-xs text-cyan-400 mt-1 mono-font" id="percentageDisplay">0% c</div>
            </div>

            <!-- Result Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Gamma Result -->
                <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="copyToClipboard('gammaResult')" class="text-slate-400 hover:text-white" title="Copy">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <p class="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">လောရင့်ဇ် ဖက်တာ (&gamma;)</p>
                    <div id="gammaResult" class="text-3xl md:text-4xl font-bold text-white mono-font break-all">1.000</div>
                    <p class="text-slate-500 text-xs mt-2">အချိန်နှင့် အကွာအဝေးအတွက် ပြောင်းလဲမှုနှုန်း</p>
                </div>

                <!-- Beta Result -->
                <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <p class="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">အလျင် (&beta;)</p>
                    <div id="betaResult" class="text-2xl font-bold text-cyan-300 mono-font">0.000 c</div>
                    <p class="text-slate-500 text-xs mt-2">အလင်းအလျင်၏ အပိုင်းကိန်း (Fraction of c)</p>
                </div>
            </div>
        </div>

        <!-- Pop Science Context Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Time Dilation -->
            <div class="glass-panel rounded-xl p-5 border-t-4 border-t-purple-500">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="font-bold text-slate-200 text-sm md:text-base">အချိန် ပွခြင်း (Time Dilation)</h3>
                </div>
                <p class="text-sm text-slate-300 mb-2">
                    အာကာသယာဉ်ပေါ်တွင် <strong class="text-white">၁ စက္ကန့်</strong> ကုန်ဆုံးတိုင်း...
                </p>
                <p class="text-xl font-bold text-purple-300 mono-font mb-1">
                    <span id="timeDilationResult">1.00</span> စက္ကန့်
                </p>
                <p class="text-xs text-slate-500">သည် ရပ်နေသူအတွက် ကုန်ဆုံးသည်။</p>
            </div>

            <!-- Length Contraction -->
            <div class="glass-panel rounded-xl p-5 border-t-4 border-t-emerald-500">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                        <i class="fas fa-ruler-horizontal"></i>
                    </div>
                    <h3 class="font-bold text-slate-200 text-sm md:text-base">အလျား ကျုံ့ခြင်း (Length Contraction)</h3>
                </div>
                <p class="text-sm text-slate-300 mb-2">
                    <strong class="text-white">၁၀၀ မီတာ</strong> ရှိသော အာကာသယာဉ်သည်...
                </p>
                <p class="text-xl font-bold text-emerald-300 mono-font mb-1">
                    <span id="lengthResult">100.00</span> မီတာ
                </p>
                <p class="text-xs text-slate-500">သာ ရှည်တော့မည် (ရပ်နေသူအမြင်)။</p>
            </div>
        </div>
        
        <div class="mt-8 text-center">
            <p class="text-xs text-slate-500">
                c &#8776; 299,792.458 km/s &#8776; 186,282.397 mi/s
            </p>
        </div>
`;
const englishHTML = `
    <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 leading-relaxed">
                Lorentz Factor Calculator
            </h1>
            <p class="text-slate-400 text-sm">MM Pop Science's Special Relativity Tool</p>
        </div>
        <div class="english-radio check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="englishRadio" checked>
            <label class="form-check-label" for="englishRadio">
                English 
            </label>
            </div>
        <div class="burmese-radio check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="myanmarRadio">
            <label class="form-check-label" for="myanmarRadio">
                Burmese
            </label>
        </div>
        <!-- Main Calculator Card -->
        <div class="glass-panel rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
            
            <!-- Input Section -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="md:col-span-2">
                    <label class="block text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">Velocity (v)</label>
                    <input type="number" id="velocityInput" placeholder="Enter velocity value..." 
                        class="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors mono-font text-lg"
                        step="any" min="0">
                </div>
                <div>
                    <label class="block text-slate-400 text-xs uppercase tracking-wider font-bold mb-2">Unit</label>
                    <select id="unitSelect" class="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer">
                        <option value="c">c (Speed of Light)</option>
                        <option value="kms">km/s</option>
                        <option value="miles">miles/s</option>
                    </select>
                </div>
            </div>

            <!-- Error Message Container -->
            <div id="errorMessage" class="hidden bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i>
                <span id="errorText">Velocity cannot exceed the speed of light.</span>
            </div>

            <!-- Speed Bar Visual -->
            <div class="mb-8">
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                    <span>0</span>
                    <span>Speed of Light (c)</span>
                </div>
                <div class="h-4 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
                    <div id="speedBar" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 w-0 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
                    <!-- Markers -->
                    <div class="absolute top-0 bottom-0 left-[50%] w-px bg-slate-600/30"></div>
                    <div class="absolute top-0 bottom-0 left-[90%] w-px bg-slate-600/30"></div>
                    <div class="absolute top-0 bottom-0 left-[99%] w-px bg-red-500/50"></div>
                </div>
                <div class="text-right text-xs text-cyan-400 mt-1 mono-font" id="percentageDisplay">0% c</div>
            </div>

            <!-- Result Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Gamma Result -->
                <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700 relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onclick="copyToClipboard('gammaResult')" class="text-slate-400 hover:text-white" title="Copy">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                    <p class="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Lorentz Factor (&gamma;)</p>
                    <div id="gammaResult" class="text-3xl md:text-4xl font-bold text-white mono-font break-all">1.000</div>
                    <p class="text-slate-500 text-xs mt-2">Change in Time and Distance</p>
                </div>

                <!-- Beta Result -->
                <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                    <p class="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Velocity (&beta;)</p>
                    <div id="betaResult" class="text-2xl font-bold text-cyan-300 mono-font">0.000 c</div>
                    <p class="text-slate-500 text-xs mt-2">Fraction of (c)</p>
                </div>
            </div>
        </div>

        <!-- Pop Science Context Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Time Dilation -->
            <div class="glass-panel rounded-xl p-5 border-t-4 border-t-purple-500">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-purple-500/20 p-2 rounded-lg text-purple-400">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="font-bold text-slate-200 text-sm md:text-base">Time Dilation</h3>
                </div>
                <p class="text-sm text-slate-300 mb-2">
                    In the space ship everytime <strong class="text-white">1 second</strong> passes...
                </p>
                <p class="text-xl font-bold text-purple-300 mono-font mb-1">
                    <span id="timeDilationResult">1.00</span> seconds
                </p>
                <p class="text-xs text-slate-500">is experienced by the stationary observer.</p>
            </div>

            <!-- Length Contraction -->
            <div class="glass-panel rounded-xl p-5 border-t-4 border-t-emerald-500">
                <div class="flex items-center gap-3 mb-3">
                    <div class="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                        <i class="fas fa-ruler-horizontal"></i>
                    </div>
                    <h3 class="font-bold text-slate-200 text-sm md:text-base">Length Contraction</h3>
                </div>
                <p class="text-sm text-slate-300 mb-2">
                    <strong class="text-white">100 meters</strong> long spaceship...
                </p>
                <p class="text-xl font-bold text-emerald-300 mono-font mb-1">
                    <span id="lengthResult">100.00</span> meters
                </p>
                <p class="text-xs text-slate-500">appears to an stationary observer.</p>
            </div>
        </div>
        
        <div class="mt-8 text-center">
            <p class="text-xs text-slate-500">
                c &#8776; 299,792.458 km/s &#8776; 186,282.397 mi/s
            </p>
        </div>
`;

function setupRadioListeners() {
    const englishRadio = document.getElementById('englishRadio');
    const myanmarRadio = document.getElementById('myanmarRadio');
    englishRadio.addEventListener('change', () => {
        if (englishRadio.checked) english();
    });
    myanmarRadio.addEventListener('change', () => {
        if (myanmarRadio.checked) burmese();
    });
}
function english() {
    wholeHTML.innerHTML = englishHTML;
    init();
    setupRadioListeners();
}
function burmese() {
    wholeHTML.innerHTML = burmeseHTML;
    init();
    setupRadioListeners();
}
        
englishRadio.addEventListener('change', () => {
    if (englishRadio.checked) english();
});

myanmarRadio.addEventListener('change', () => {
    if (myanmarRadio.checked) burmese();
});

// inital setup
init();
