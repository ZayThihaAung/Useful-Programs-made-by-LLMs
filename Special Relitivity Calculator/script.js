        const C_KMS = 299792.458;

        const velCInput = document.getElementById('velC');
        const velRange = document.getElementById('velRange');
        const velKmInput = document.getElementById('velKm');
        const obsTimeInput = document.getElementById('obsTime');
        const restLenInput = document.getElementById('restLen');

        const resLorentz = document.getElementById('resLorentz');
        const resTravelerTime = document.getElementById('resTravelerTime');
        const resObservedLength = document.getElementById('resObservedLength');
        const gammaWarning = document.getElementById('gammaWarning');
        const vizContracted = document.getElementById('vizContracted');
        const valL0 = document.getElementById('valL0');
        const valL = document.getElementById('valL');
        const wholeHTML = document.querySelector('.mx-auto');

function initBuild() {
    function calculate() {
            let v_c = parseFloat(velCInput.value);
            if (v_c >= 1) v_c = 0.9999999999;
            if (v_c < 0) v_c = 0;

            const T_obs = parseFloat(obsTimeInput.value) || 0;
            const L0 = parseFloat(restLenInput.value) || 0;

            const gamma = 1 / Math.sqrt(1 - Math.pow(v_c, 2));
            const t_traveller = T_obs / gamma;
            const L_contracted = L0 / gamma;

            resLorentz.textContent = gamma.toFixed(4);
            resTravelerTime.textContent = t_traveller.toFixed(4);
            resObservedLength.textContent = L_contracted.toFixed(4);
            
            valL0.textContent = L0.toFixed(2);
            valL.textContent = L_contracted.toFixed(2);
            if (myanmarRadio.checked) {
                if (gamma > 10) {
                    gammaWarning.textContent = "အလွန်မြန်သောအလျင်! ခရီးသွားသူသည် အသက်ပင် မကြီးတော့ပါ။";
                    gammaWarning.className = "text-xs mt-2 text-rose-400";
                } else if (gamma > 1.05) {
                    gammaWarning.textContent = "နှိုင်းရသီအိုရီ သက်ရောက်မှုများကို သိသိသာသာ မြင်တွေ့ရသည်။";
                    gammaWarning.className = "text-xs mt-2 text-amber-400";
                } else {
                    gammaWarning.textContent = "အလျင်နည်းလွန်းသဖြင့် အပြောင်းအလဲ မရှိသလောက်ပင်။";
                    gammaWarning.className = "text-xs mt-2 text-slate-400";
                }
            } else {
                if (gamma > 10) {
                    gammaWarning.textContent = "Extremely high velocity! The traveler would barely age.";
                    gammaWarning.className = "text-xs mt-2 text-rose-400";
                } else if (gamma > 1.05) {
                    gammaWarning.textContent = "Noticeable relativistic effects are observed.";
                    gammaWarning.className = "text-xs mt-2 text-amber-400";
                } else {
                    gammaWarning.textContent = "Velocity too low for significant effects.";
                    gammaWarning.className = "text-xs mt-2 text-slate-400";
                }
            }

            const visualPct = (1 / gamma) * 100;
            vizContracted.style.width = visualPct + '%';
        }

        let velCInput, velRange, velKmInput, obsTimeInput, restLenInput;
        let resLorentz, resTravelerTime, resObservedLength, gammaWarning, vizContracted, valL0, valL;
        velCInput = document.getElementById('velC');
        velRange = document.getElementById('velRange');
        velKmInput = document.getElementById('velKm');
        obsTimeInput = document.getElementById('obsTime');
        restLenInput = document.getElementById('restLen');
        resLorentz = document.getElementById('resLorentz');
        resTravelerTime = document.getElementById('resTravelerTime');
        resObservedLength = document.getElementById('resObservedLength');
        gammaWarning = document.getElementById('gammaWarning');
        vizContracted = document.getElementById('vizContracted');
        valL0 = document.getElementById('valL0');
        valL = document.getElementById('valL');

        velCInput.addEventListener('input', (e) => {
            const val = e.target.value;
            velRange.value = val;
            velKmInput.value = (val * C_KMS).toFixed(2);
            calculate();
        });

        velRange.addEventListener('input', (e) => {
            const val = e.target.value;
            velCInput.value = val;
            velKmInput.value = (val * C_KMS).toFixed(2);
            calculate();
        });

        velKmInput.addEventListener('input', (e) => {
            const val = e.target.value;
            const v_c = val / C_KMS;
            velCInput.value = v_c.toFixed(6);
            velRange.value = v_c;
            calculate();
        });

        [obsTimeInput, restLenInput].forEach(el => {
            el.addEventListener('input', calculate);
        });

        velKmInput.value = (parseFloat(velCInput.value) * C_KMS).toFixed(2);
        calculate();
}

const EnglishHtml = `
        <div class="form-check check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="englishRadio" checked>
            <label class="form-check-label" for="englishRadio">
                English 
            </label>
            </div>
        <div class="form-check check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="myanmarRadio">
            <label class="form-check-label" for="myanmarRadio">
                Burmese
            </label>
        </div>
        <!-- Header -->
        <header class="mb-10 text-center">
            <h1 class="text-4xl font-bold tracking-tight mb-2">Special Relativity - Space and Time</h1>
            <p class="text-slate-400">Specially made for MM Pop Science | Study the change of Length and Time</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <section class="glass-card p-6 shadow-xl">
                <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Observer's Reference Frame (Earth Frame)
                </h2>
                
                <div class="space-y-6">
                    <!-- Velocity -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">Traveller's velocity (v)</label>
                        <div class="flex gap-4 mb-2">
                            <input type="number" id="velC" step="0.0001" min="0" max="0.999999" value="0.8" 
                                class="input-field w-1/2 p-3 rounded-lg text-white" placeholder="Speed of Light (c)">
                            <input type="number" id="velKm" step="1" min="0" max="299792" 
                                class="input-field w-1/2 p-3 rounded-lg text-white" placeholder="km/s">
                        </div>
                        <input type="range" id="velRange" min="0" max="0.9999" step="0.0001" value="0.8" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <!-- Observer Time -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">Observer's time interval (ΔT)</label>
                        <input type="number" id="obsTime" value="10" 
                            class="input-field w-full p-3 rounded-lg text-white">
                        <p class="text-[11px] text-slate-500 mt-1">The total time elapsed on Earth. (Total Year and Hour)</p>
                    </div>

                    <!-- Resting Length -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">Initial length (L₀)</label>
                        <input type="number" id="restLen" value="100" 
                            class="input-field w-full p-3 rounded-lg text-white">
                        <p class="text-[11px] text-slate-500 mt-1">The length of the object at rest. (Length when not moving)</p>
                    </div>
                </div>
            </section>

            <!-- Results Section -->
            <section class="space-y-6">
                <div class="glass-card p-6 shadow-xl border-sky-500/30">
                    <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        Observer's Measured Results
                    </h2>

                    <div class="space-y-8">
                        <!-- Lorentz Factor -->
                        <div class="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20">
                            <div class="text-sm text-sky-300 uppercase tracking-wider font-bold mb-1">Lorentz Factor</div>
                            <div id="resLorentz" class="text-4xl font-mono result-highlight">1.6667</div>
                            <div id="gammaWarning" class="text-xs mt-2 text-slate-400">Time and Space are obviously changing</div>
                        </div>

                        <!-- Traveler's Time -->
                        <div class="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <div class="text-sm text-slate-400">The time experienced by the traveller</div>
                                <div id="resTravelerTime" class="text-2xl font-semibold text-emerald-400">6.0000</div>
                                <p class="text-[11px] text-slate-500">The traveller's hour will be slower.</p>
                            </div>
                            <div class="text-right">
                                <div class="text-xs text-slate-500"></div>
                            </div>
                        </div>

                        <!-- Observed Length -->
                        <div class="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <div class="text-sm text-slate-400">Shrinkness measured by the observer</div>
                                <div id="resObservedLength" class="text-2xl font-semibold text-rose-400">60.0000</div>
                                <p class="text-[11px] text-slate-500">The moving object will appear shorter.</p>
                            </div>
                            <div class="text-right">
                                <div class="text-xs text-slate-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comparison Visualization -->
                <div class="glass-card p-6">
                    <h3 class="text-sm font-semibold text-slate-400 mb-4 uppercase">Length Comparison</h3>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-[11px] mb-1">
                                <span>Initial Length (L₀)</span>
                                <span id="valL0">100</span>
                            </div>
                            <div class="h-4 bg-slate-700 rounded-full w-full opacity-50"></div>
                        </div>
                        <div>
                            <div class="flex justify-between text-[11px] mb-1">
                                <span>Contracted Length (L)</span>
                                <span id="valL" class="text-rose-400">60.00</span>
                            </div>
                            <div id="vizContracted" class="h-4 bg-rose-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]" style="width: 60%"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <footer class="mt-12 text-center text-slate-500 text-sm">
            <p>Speed of light (c) = 299,792.458 km/s</p>
        </footer>
`; 

const MyanmarHtml = `
        <div class="form-check check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="englishRadio">
            <label class="form-check-label" for="englishRadio">
                English 
            </label>
            </div>
        <div class="form-check check-radio">
            <input class="form-check-input" type="radio" name="radioDefault" id="myanmarRadio" checked>
            <label class="form-check-label" for="myanmarRadio">
                Burmese
            </label>
        </div>
        <!-- Header -->
        <header class="mb-10 text-center">
            <h1 class="text-4xl font-bold tracking-tight mb-2">နှိုင်းရသီအိုရီ- အချိန်နှင့် အာကာသ</h1>
            <p class="text-slate-400">MM Pop Science အတွက် အထူးပြုလုပ်ထားသည် | အချိန်နှင့် အလျားပြောင်းလဲမှုကို လေ့လာခြင်း</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Input Section -->
            <section class="glass-card p-6 shadow-xl">
                <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    လေ့လာသူ၏ မူလဘောင် (Earth Frame)
                </h2>
                
                <div class="space-y-6">
                    <!-- Velocity -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">ခရီးသွားသူ၏ အလျင် (v)</label>
                        <div class="flex gap-4 mb-2">
                            <input type="number" id="velC" step="0.0001" min="0" max="0.999999" value="0.8" 
                                class="input-field w-1/2 p-3 rounded-lg text-white" placeholder="အလင်းအလျင် (c)">
                            <input type="number" id="velKm" step="1" min="0" max="299792" 
                                class="input-field w-1/2 p-3 rounded-lg text-white" placeholder="km/s">
                        </div>
                        <input type="range" id="velRange" min="0" max="0.9999" step="0.0001" value="0.8" class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer">
                    </div>

                    <!-- Observer Time -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">လေ့လာသူ၏ အချိန်ကုန်ဆုံးမှု (ΔT)</label>
                        <input type="number" id="obsTime" value="10" 
                            class="input-field w-full p-3 rounded-lg text-white">
                        <p class="text-[11px] text-slate-500 mt-1">ကမ္ဘာပေါ်တွင် ကုန်ဆုံးသွားသည့် နှစ်/နာရီ စုစုပေါင်း။</p>
                    </div>

                    <!-- Resting Length -->
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-2">အရာဝတ္ထု၏ မူလအလျား (L₀)</label>
                        <input type="number" id="restLen" value="100" 
                            class="input-field w-full p-3 rounded-lg text-white">
                        <p class="text-[11px] text-slate-500 mt-1">အရာဝတ္ထု (သို့) အာကာသယာဉ် ရပ်တန့်နေစဉ် ရှိသည့်အလျား။</p>
                    </div>
                </div>
            </section>

            <!-- Results Section -->
            <section class="space-y-6">
                <div class="glass-card p-6 shadow-xl border-sky-500/30">
                    <h2 class="text-xl font-semibold mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        လေ့လာသူမှ တွေ့ရှိရသည့် ရလဒ်
                    </h2>

                    <div class="space-y-8">
                        <!-- Lorentz Factor -->
                        <div class="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20">
                            <div class="text-sm text-sky-300 uppercase tracking-wider font-bold mb-1">လောရန့်ဇ် ကိန်းညွှန်း (Lorentz Factor)</div>
                            <div id="resLorentz" class="text-4xl font-mono result-highlight">1.6667</div>
                            <div id="gammaWarning" class="text-xs mt-2 text-slate-400">အချိန်နှင့် အာကာသ သိသိသာသာ ပြောင်းလဲနေသည်။</div>
                        </div>

                        <!-- Traveler's Time -->
                        <div class="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <div class="text-sm text-slate-400">ခရီးသွားသူ တွေ့ကြုံရသည့် အချိန်</div>
                                <div id="resTravelerTime" class="text-2xl font-semibold text-emerald-400">6.0000</div>
                                <p class="text-[11px] text-slate-500">လေ့လာသူအတွက် ခရီးသွားသူ၏ နာရီသည် ပိုနှေးနေမည်။</p>
                            </div>
                            <div class="text-right">
                                <div class="text-xs text-slate-500"></div>
                            </div>
                        </div>

                        <!-- Observed Length -->
                        <div class="flex justify-between items-center p-4 border-b border-white/5">
                            <div>
                                <div class="text-sm text-slate-400">လေ့လာသူ တွေ့ရသည့် အလျားကျုံ့မှု</div>
                                <div id="resObservedLength" class="text-2xl font-semibold text-rose-400">60.0000</div>
                                <p class="text-[11px] text-slate-500">ရွေ့လျားနေသော အရာဝတ္ထုသည် ပိုတိုနေမည်။</p>
                            </div>
                            <div class="text-right">
                                <div class="text-xs text-slate-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Comparison Visualization -->
                <div class="glass-card p-6">
                    <h3 class="text-sm font-semibold text-slate-400 mb-4 uppercase">အလျား နှိုင်းယှဉ်ချက်</h3>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-[11px] mb-1">
                                <span>မူလအလျား (L₀)</span>
                                <span id="valL0">100</span>
                            </div>
                            <div class="h-4 bg-slate-700 rounded-full w-full opacity-50"></div>
                        </div>
                        <div>
                            <div class="flex justify-between text-[11px] mb-1">
                                <span>လက်တွေ့တွေ့ရသည့်အလျား (L)</span>
                                <span id="valL" class="text-rose-400">60.00</span>
                            </div>
                            <div id="vizContracted" class="h-4 bg-rose-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]" style="width: 60%"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <footer class="mt-12 text-center text-slate-500 text-sm">
            <p>တွက်ချက်မှုဆိုင်ရာ အခြေခံ အလင်းအလျင် c = 299,792.458 km/s</p>
        </footer>
`;
// For Language Toggle
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
    wholeHTML.innerHTML = EnglishHtml;
    initBuild();
    setupRadioListeners();
}
function burmese() {
    wholeHTML.innerHTML = MyanmarHtml;
    initBuild();
    setupRadioListeners();
}

initBuild();

englishRadio.addEventListener('change', () => {
    if (englishRadio.checked) english();
});

myanmarRadio.addEventListener('change', () => {
    if (myanmarRadio.checked) burmese();
});
