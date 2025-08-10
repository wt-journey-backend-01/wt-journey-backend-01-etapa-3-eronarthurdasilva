document.addEventListener('DOMContentLoaded', () => {
    loadAgentes();
    loadCasos();
    
    // Configura o formulário de novo caso
    document.getElementById('formCaso').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch('http://localhost:3000/casos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    agente_id: "401bccf5-cf9e-489d-8412-446cd169a0f1" // ID fixo para exemplo
                })
            });
            
            if (response.ok) {
                fecharModalCaso();
                loadCasos();
                e.target.reset();
            } else {
                const error = await response.json();
                alert(`Erro: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro ao criar caso:', error);
            alert('Erro ao criar caso. Verifique o console para mais detalhes.');
        }
    });
});

// Funções para abrir/fechar modal
function abrirModalCaso() {
    document.getElementById('modalCaso').classList.remove('hidden');
}

function fecharModalCaso() {
    document.getElementById('modalCaso').classList.add('hidden');
}

// Carrega a lista de agentes
async function loadAgentes() {
    try {
        const response = await fetch('http://localhost:3000/agentes');
        const agentes = await response.json();
        renderAgentes(agentes);
    } catch (error) {
        console.error('Erro ao carregar agentes:', error);
    }
}

// Carrega a lista de casos
async function loadCasos() {
    try {
        const response = await fetch('http://localhost:3000/casos');
        const casos = await response.json();
        renderCasos(casos);
    } catch (error) {
        console.error('Erro ao carregar casos:', error);
    }
}

// Renderiza a lista de agentes
function renderAgentes(agentes) {
    const container = document.getElementById('agentesList');
    container.innerHTML = agentes.map(agente => `
        <div class="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition">
            <div class="flex items-start space-x-4">
                <div class="flex-1">
                    <h3 class="font-bold text-lg">${agente.nome}</h3>
                    <p class="text-gray-600">${agente.cargo}</p>
                    <p class="text-sm text-gray-500">Desde: ${formatarData(agente.dataDeIncorporacao)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderiza a lista de casos
function renderCasos(casos) {
    const container = document.getElementById('casosList');
    container.innerHTML = casos.map(caso => `
        <div class="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h3 class="font-bold text-lg">${caso.titulo}</h3>
                    <span class="text-xs px-2 py-1 rounded-full ${getStatusClass(caso.status)}">
                        ${formatarStatus(caso.status)}
                    </span>
                    <p class="mt-2 text-gray-700">${caso.descricao}</p>
                </div>
                <button onclick="deleteCaso('${caso.id}')" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// Função para deletar caso
async function deleteCaso(id) {
    if (confirm('Tem certeza que deseja excluir este caso?')) {
        try {
            const response = await fetch(`http://localhost:3000/casos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadCasos();
            } else {
                const error = await response.json();
                alert(`Erro: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro ao deletar caso:', error);
        }
    }
}

// Funções auxiliares
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function formatarStatus(status) {
    const statusMap = {
        'aberto': 'Aberto',
        'solucionado': 'Solucionado',
        'arquivado': 'Arquivado'
    };
    return statusMap[status] || status;
}

function getStatusClass(status) {
    const classMap = {
        'aberto': 'status-aberto',
        'solucionado': 'status-solucionado',
        'arquivado': 'status-arquivado'
    };
    return classMap[status] || '';
}

async function loadAgentesWithFilters() {
    const cargo = document.getElementById('filtroCargo').value;
    const sort = document.getElementById('ordenacaoAgentes').value;
    
    let url = 'http://localhost:3000/agentes';
    const params = new URLSearchParams();
    
    if(cargo) params.append('cargo', cargo);
    if(sort) params.append('sort', sort);
    
    if(params.toString()) url += `?${params.toString()}`;
    
    try {
        const response = await fetch(url);
        const agentes = await response.json();
        renderAgentes(agentes);
    } catch (error) {
        console.error('Erro ao carregar agentes:', error);
    }
}
async function loadAgentes() {
    try {
        const cargo = document.getElementById('filtroCargo').value;
        let url = '/agentes';
        
        if (cargo) {
            url += `?cargo=${encodeURIComponent(cargo)}`;
        }

        const response = await fetch(url);
        const agentes = await response.json();
        renderAgentes(agentes);
        populateAgentesDropdown(agentes); // Preenche o dropdown no modal
    } catch (error) {
        console.error('Erro ao carregar agentes:', error);
    }
}

async function loadCasos() {
    try {
        const status = document.getElementById('filtroStatus').value;
        let url = '/casos';
        
        if (status) {
            url += `?status=${encodeURIComponent(status)}`;
        }

        const response = await fetch(url);
        const casos = await response.json();
        renderCasos(casos);
    } catch (error) {
        console.error('Erro ao carregar casos:', error);
    }
}

function buscarCasos() {
    const termo = document.getElementById('buscaCasos').value;
    if (!termo) return loadCasos();
    
    fetch(`/casos?q=${encodeURIComponent(termo)}`)
        .then(response => response.json())
        .then(renderCasos)
        .catch(console.error);
}

function populateAgentesDropdown(agentes) {
    const select = document.getElementById('selectAgente');
    select.innerHTML = agentes.map(agente => 
        `<option value="${agente.id}">${agente.nome} (${agente.cargo})</option>`
    ).join('');
}

// Atualize a renderização de agentes e casos
function renderAgentes(agentes) {
    const container = document.getElementById('agentesList');
    container.innerHTML = agentes.map(agente => `
        <div class="flex items-start p-4 border-b border-gray-100 hover:bg-gray-50">
            <div class="flex-shrink-0 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                ${agente.nome.charAt(0)}
            </div>
            <div class="ml-4 flex-1">
                <h3 class="font-medium">${agente.nome}</h3>
                <p class="text-sm text-gray-600">${agente.cargo}</p>
                <p class="text-xs text-gray-500 mt-1">
                    <i class="far fa-calendar-alt mr-1"></i>
                    Desde ${new Date(agente.dataDeIncorporacao).toLocaleDateString('pt-BR')}
                </p>
            </div>
        </div>
    `).join('');
}

function renderCasos(casos) {
    const container = document.getElementById('casosList');
    container.innerHTML = casos.map(caso => `
        <div class="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-medium">${caso.titulo}</h3>
                    <span class="status-badge status-${caso.status}">
                        ${formatarStatus(caso.status)}
                    </span>
                    <p class="text-sm text-gray-600 mt-2">${caso.descricao}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editarCaso('${caso.id}')" class="text-blue-500 hover:text-blue-700">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteCaso('${caso.id}')" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="mt-2 text-xs text-gray-500">
                <i class="far fa-user mr-1"></i>
                Agente ID: ${caso.agente_id}
            </div>
        </div>
    `).join('');
}

// Adicione ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadAgentes();
    loadCasos();
    
    document.getElementById('filtroStatus').addEventListener('change', loadCasos);
    document.getElementById('buscaCasos').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarCasos();
    });
    
    // Configuração do formulário permanece a mesma
});
