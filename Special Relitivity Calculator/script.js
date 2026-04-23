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

            const visualPct = (1 / gamma) * 100;
            vizContracted.style.width = visualPct + '%';
        }

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