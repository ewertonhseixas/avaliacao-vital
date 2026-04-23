const app = {
    state: {
        athlete: '',
        date: '',
        measures: {}
    },

    // Reference values from Perry & Burnfield (2010)
    references: {
        trunk_anterior: { min: 7, max: 10, calc: (v) => v - 90, label: 'Tronco Anterior' },
        hip_flexion: { min: 30, max: 30, calc: (v) => v - 180, label: 'Flexão Quadril' }, // Static reference of 30?
        hip_extension: { min: 20, max: 20, calc: (v) => v - 90, label: 'Extensão Quadril' },
        knee_flexion: { min: 40, max: 40, calc: (v) => v - 180, label: 'Flexão Joelho' },
        knee_extension: { min: -10, max: -10, calc: (v) => v - 180, label: 'Extensão Joelho' },
        trunk_lateral_post: { min: 5, max: 5, calc: (v) => v - 90, label: 'Tronco Lateral (POST)' },
        pelvis_drop_post: { min: 5, max: 5, calc: (v) => v - 90, label: 'Queda da Pelve (POST)' },
        knee_valgus_post: { min: -5, max: 5, calc: (v) => v - 90, label: 'Valgo do Joelho (POST)' },
        trunk_lateral_sd: { min: 5, max: 5, calc: (v) => v - 90, label: 'Tronco Lateral (SD)' },
        pelvis_drop_sd: { min: 5, max: 5, calc: (v) => v - 90, label: 'Queda da Pelve (SD)' },
        knee_valgus_sd: { min: -5, max: 5, calc: (v) => v - 90, label: 'Valgo do Joelho (SD)' }
    },

    startAssessment: function () {
        const nameInput = document.getElementById('athlete-name');
        const dateInput = document.getElementById('exam-date');

        if (!nameInput.value || !dateInput.value) {
            alert('Por favor, preencha o nome do atleta e a data.');
            return;
        }

        this.state.athlete = nameInput.value;
        this.state.date = dateInput.value;

        document.getElementById('registration').classList.add('hidden');
        document.getElementById('nav-container').classList.remove('hidden');
        document.getElementById('assessment-main').classList.remove('hidden');
    },

    switchTab: function (tabId) {
        // Update Nav UI
        document.querySelectorAll('.btn-nav').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`nav-${tabId}`).classList.add('active');

        // Update Content UI
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
        document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    },

    generateReport: function () {
        const inputs = document.querySelectorAll('input[data-measure]');
        let hasData = false;

        // Clear previous measures to avoid staleness if re-generating
        this.state.measures = {};

        inputs.forEach(input => {
            if (input.value !== '') {
                const measureKey = input.getAttribute('data-measure');
                const rawValue = parseFloat(input.value);
                const ref = this.references[measureKey];

                if (ref) {
                    const finalValue = ref.calc(rawValue);
                    this.state.measures[measureKey] = {
                        raw: rawValue,
                        final: finalValue,
                        label: ref.label,
                        min: ref.min,
                        max: ref.max
                    };
                    hasData = true;
                }
            }
        });

        if (!hasData) {
            alert('Por favor, insira pelo menos um valor para gerar o relatório.');
            return;
        }

        this.renderReport();
    },

    renderReport: function () {
        // Hide fixed elements during report
        document.getElementById('nav-container').classList.add('hidden');
        document.getElementById('assessment-main').classList.add('hidden');
        document.querySelector('.fixed-bottom').classList.add('hidden');

        document.getElementById('report-view').classList.remove('hidden');

        document.getElementById('report-athlete').textContent = this.state.athlete.toUpperCase();
        document.getElementById('report-date').textContent = `Data: ${new Date(this.state.date).toLocaleDateString('pt-BR')}`;

        const resultsContainer = document.getElementById('report-results');
        resultsContainer.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'result-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Medida</th>
                    <th>Referência</th>
                    <th>Resultado</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');

        for (const key in this.state.measures) {
            const data = this.state.measures[key];

            // Reference logic with tolerance
            const tolerance = 2;
            const isOk = (data.min === data.max)
                ? (Math.abs(data.final - data.min) <= tolerance)
                : (data.final >= data.min && data.final <= data.max);

            const statusClass = isOk ? 'status-green' : 'status-red';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.label}</td>
                <td>${data.min === data.max ? data.min + '°' : data.min + '° a ' + data.max + '°'}</td>
                <td>${data.final.toFixed(1)}°</td>
                <td><span class="status-indicator ${statusClass}"></span> ${isOk ? 'Dentro' : 'Fora'}</td>
            `;
            tbody.appendChild(row);
        }

        resultsContainer.appendChild(table);
    },

    copyTable: function () {
        const table = document.querySelector('.result-table');
        if (!table) return;

        const wrapper = document.createElement('div');
        wrapper.style.fontFamily = 'Arial, sans-serif';
        wrapper.style.fontSize = '12pt';
        wrapper.style.color = '#000000';
        wrapper.style.backgroundColor = '#ffffff';

        const header = document.createElement('h3');
        header.textContent = `Avaliação Biomecânica - ${this.state.athlete.toUpperCase()}`;
        header.style.marginBottom = '5px';
        header.style.fontSize = '14pt';
        
        const dateP = document.createElement('p');
        if (this.state.date) {
            const [year, month, day] = this.state.date.split('-');
            dateP.textContent = `Data: ${day}/${month}/${year}`;
        } else {
            dateP.textContent = `Data: --/--/----`;
        }
        dateP.style.marginTop = '0';
        dateP.style.marginBottom = '15px';

        const clone = table.cloneNode(true);
        clone.style.borderCollapse = 'collapse';
        clone.style.width = '100%';
        clone.style.maxWidth = '600px';

        const ths = clone.querySelectorAll('th');
        ths.forEach(th => {
            th.style.border = '1px solid #dddddd';
            th.style.padding = '8px';
            th.style.backgroundColor = '#f2f2f2';
            th.style.fontWeight = 'bold';
            th.style.textAlign = 'left';
            th.style.color = '#000000';
            th.style.fontSize = '12pt';
        });

        const tds = clone.querySelectorAll('td');
        tds.forEach(td => {
            td.style.border = '1px solid #dddddd';
            td.style.padding = '8px';
            td.style.textAlign = 'left';
            td.style.color = '#000000';
            td.style.fontSize = '12pt';
        });

        const indicators = clone.querySelectorAll('.status-indicator');
        indicators.forEach(ind => ind.remove());

        wrapper.appendChild(header);
        wrapper.appendChild(dateP);
        wrapper.appendChild(clone);

        wrapper.style.position = 'absolute';
        wrapper.style.left = '-9999px';
        document.body.appendChild(wrapper);

        const range = document.createRange();
        range.selectNode(wrapper);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        try {
            document.execCommand('copy');
            this.showToast('Tabela copiada com sucesso! Cole no seu documento (Ctrl+V).');
        } catch (err) {
            console.error('Erro ao copiar', err);
            this.showToast('Erro ao copiar a tabela.');
        }

        sel.removeAllRanges();
        document.body.removeChild(wrapper);
    },

    showToast: function(message) {
        let toast = document.getElementById('toast-container');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-container';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        
        toast.classList.remove('hidden');
        
        // Trigger reflow for animation
        void toast.offsetWidth;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 3000);
    },

    reset: function () {
        this.state = {
            athlete: '',
            date: '',
            measures: {}
        };
        document.getElementById('report-view').classList.add('hidden');
        document.getElementById('registration').classList.remove('hidden');
        document.querySelector('.fixed-bottom').classList.remove('hidden');

        // Clear inputs
        document.querySelectorAll('input').forEach(input => input.value = '');
    }
};
