document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a aplicação
    initApp();
    
    // Configura o formulário de novo caso
    document.getElementById('formCaso').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            showLoader('Salvando caso...');
            const response = await fetch('/casos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                fecharModalCaso();
                loadCasos();
                e.target.reset();
                showNotification('Caso registrado com sucesso!', 'success');
            } else {
                const error = await response.json();
                showNotification(`Erro: ${error.message}`, 'error');
            }
        } catch (error) {
            console.error('Erro ao criar caso:', error);
            showNotification('Erro ao criar caso. Verifique o console para mais detalhes.', 'error');
        } finally {
            hideLoader();
        }
    });
    
    // Configura o formulário de novo agente
    document.getElementById('formAgente').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            showLoader('Salvando agente...');
            const response = await fetch('/agentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                fecharModalAgente();
                loadAgentes();
                e.target.reset();
                showNotification('Agente registrado com sucesso!', 'success');
            } else {
                const error = await response.json();
                showNotification(`Erro: ${error.message}`, 'error');
            }
        } catch (error) {
            console.error('Erro ao criar agente:', error);
            showNotification('Erro ao criar agente. Verifique o console para mais detalhes.', 'error');
        } finally {
            hideLoader();
        }
    });
    
    // Configura os eventos de filtro
    document.getElementById('filtroStatus').addEventListener('change', loadCasos);
    document.getElementById('filtroCargo').addEventListener('change', loadAgentes);
    document.getElementById('buscaCasos').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarCasos();
    });
});

// Inicializa a aplicação
function initApp() {
    loadAgentes();
    loadCasos();
    
    // Cria o elemento de loader se não existir
    if (!document.getElementById('global-loader')) {
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
        loader.innerHTML = `
            <div class="bg-white p-5 rounded-lg shadow-lg flex items-center">
                <div class="loader mr-3"></div>
                <span id="loader-message">Carregando...</span>
            </div>
        `;
        document.body.appendChild(loader);
    }
}

// Funções para abrir/fechar modais
function abrirModalCaso() {
    populateAgentesDropdown();
    document.getElementById('modalCaso').classList.remove('hidden');
    document.getElementById('modalCaso').classList.add('flex');
    document.getElementById('modalCaso').classList.add('animate-fadeIn');
}

function fecharModalCaso() {
    const modal = document.getElementById('modalCaso');
    modal.classList.add('animate-fadeOut');
    setTimeout(() => {
        modal.classList.remove('animate-fadeOut');
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}

function abrirModalAgente() {
    document.getElementById('modalAgente').classList.remove('hidden');
    document.getElementById('modalAgente').classList.add('flex');
    document.getElementById('modalAgente').classList.add('animate-fadeIn');
}

function fecharModalAgente() {
    const modal = document.getElementById('modalAgente');
    modal.classList.add('animate-fadeOut');
    setTimeout(() => {
        modal.classList.remove('animate-fadeOut');
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300);
}

// Funções para loader
function showLoader(message = 'Carregando...') {
    const loader = document.getElementById('global-loader');
    document.getElementById('loader-message').textContent = message;
    loader.classList.remove('hidden');
}

function hideLoader() {
    const loader = document.getElementById('global-loader');
    loader.classList.add('hidden');
}

// Funções para notificações
function showNotification(message, type = 'info') {
    const notificationArea = document.getElementById('notification-area');
    
    if (!notificationArea) {
        console.error('Área de notificação não encontrada');
        return;
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type} animate-slideIn`;
    
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">${message}</div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    notificationArea.appendChild(notification);
    
    // Adiciona evento para fechar a notificação
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('animate-slideOut');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('animate-slideOut');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
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

// Função para deletar um caso
async function deleteCaso(id) {
    if (!confirm('Tem certeza que deseja excluir este caso?')) return;
    
    try {
        showLoader('Excluindo caso...');
        const response = await fetch(`/casos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadCasos();
            showNotification('Caso excluído com sucesso!', 'success');
        } else {
            const error = await response.json();
            showNotification(`Erro: ${error.message}`, 'error');
        }
    } catch (error) {
        console.error('Erro ao deletar caso:', error);
        showNotification('Erro ao deletar caso. Verifique o console para mais detalhes.', 'error');
    } finally {
        hideLoader();
    }
}

// Função para deletar um agente
async function deleteAgente(id) {
    if (!confirm('Tem certeza que deseja excluir este agente? Isso pode afetar casos associados.')) return;
    
    try {
        showLoader('Excluindo agente...');
        const response = await fetch(`/agentes/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadAgentes();
            loadCasos(); // Recarrega casos pois podem ter sido afetados
            showNotification('Agente excluído com sucesso!', 'success');
        } else {
            const error = await response.json();
            showNotification(`Erro: ${error.message}`, 'error');
        }
    } catch (error) {
        console.error('Erro ao deletar agente:', error);
        showNotification('Erro ao deletar agente. Verifique o console para mais detalhes.', 'error');
    } finally {
        hideLoader();
    }
}

// Funções auxiliares
function formatarData(data) {
    if (!data) return 'N/A';
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

function formatarCargo(cargo) {
    const cargoMap = {
        'investigador': 'Investigador',
        'delegado': 'Delegado',
        'perito': 'Perito',
        'escrivao': 'Escrivão'
    };
    return cargoMap[cargo] || cargo;
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
    const sort = document.getElementById('ordenacaoAgentes')?.value;
    
    let url = '/agentes';
    const params = new URLSearchParams();
    
    if(cargo) params.append('cargo', cargo);
    if(sort) params.append('sort', sort);
    
    if(params.toString()) url += `?${params.toString()}`;
    
    try {
        showLoader('Carregando agentes...');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao carregar agentes: ${response.status}`);
        }
        const agentes = await response.json();
        renderAgentes(agentes);
        return agentes;
    } catch (error) {
        console.error('Erro ao carregar agentes:', error);
        showNotification('Erro ao carregar agentes. Verifique o console para mais detalhes.', 'error');
        return [];
    } finally {
        hideLoader();
    }
}

// Função para exportar casos em CSV
function exportarCasosCSV() {
    try {
        showLoader('Exportando casos...');
        const casosContainer = document.getElementById('casosList');
        const casos = Array.from(casosContainer.querySelectorAll('.border-b')).map(card => {
            return {
                id: card.dataset.id || 'N/A',
                titulo: card.querySelector('h3').textContent,
                descricao: card.querySelector('p.text-sm').textContent,
                status: card.querySelector('.status-badge').textContent.trim(),
                agente: card.querySelector('.text-xs')?.textContent || 'Não atribuído'
            };
        });
        
        if (casos.length === 0) {
            showNotification('Não há casos para exportar', 'warning');
            hideLoader();
            return;
        }
        
        // Criar cabeçalho CSV
        let csv = 'ID,Título,Descrição,Status,Agente\n';
        
        // Adicionar linhas
        casos.forEach(caso => {
            // Escapar campos com vírgulas ou aspas
            const escapeCsvField = (field) => {
                field = String(field).replace(/"/g, '""');
                if (field.includes(',') || field.includes('"') || field.includes('\n')) {
                    field = `"${field}"`;
                }
                return field;
            };
            
            csv += [
                escapeCsvField(caso.id),
                escapeCsvField(caso.titulo),
                escapeCsvField(caso.descricao),
                escapeCsvField(caso.status),
                escapeCsvField(caso.agente)
            ].join(',') + '\n';
        });
        
        // Criar blob e link para download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `casos_${new Date().toISOString().slice(0,10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Casos exportados com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao exportar casos:', error);
        showNotification('Erro ao exportar casos. Verifique o console para mais detalhes.', 'error');
    } finally {
        hideLoader();
    }
}

// Função para imprimir lista de casos
function imprimirCasos() {
    try {
        showLoader('Preparando impressão...');
        const casosContainer = document.getElementById('casosList');
        const casos = Array.from(casosContainer.querySelectorAll('.border-b'));
        
        if (casos.length === 0) {
            showNotification('Não há casos para imprimir', 'warning');
            hideLoader();
            return;
        }
        
        // Criar uma nova janela para impressão
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Lista de Casos - Sistema Policial</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #1a3b5d; text-align: center; }
                    .data-impressao { text-align: right; font-size: 12px; margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #1a3b5d; color: white; }
                    tr:nth-child(even) { background-color: #f2f2f2; }
                    .status-aberto { color: green; }
                    .status-solucionado { color: blue; }
                    .status-arquivado { color: gray; }
                    @media print {
                        .no-print { display: none; }
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                <h1>Lista de Casos - Sistema Policial</h1>
                <div class="data-impressao">Data de impressão: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}</div>
                <button class="no-print" onclick="window.print();setTimeout(() => window.close(), 500);">Imprimir</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Agente</th>
                        </tr>
                    </thead>
                    <tbody>
        `);
        
        casos.forEach(card => {
            const id = card.dataset.id || 'N/A';
            const titulo = card.querySelector('h3').textContent;
            const descricao = card.querySelector('p.text-sm').textContent;
            const statusEl = card.querySelector('.status-badge');
            const status = statusEl.textContent.trim();
            const statusClass = statusEl.classList[1].replace('status-', '');
            const agente = card.querySelector('.text-xs')?.textContent || 'Não atribuído';
            
            printWindow.document.write(`
                <tr>
                    <td>${id}</td>
                    <td>${titulo}</td>
                    <td>${descricao}</td>
                    <td class="status-${statusClass}">${status}</td>
                    <td>${agente}</td>
                </tr>
            `);
        });
        
        printWindow.document.write(`
                    </tbody>
                </table>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        setTimeout(() => {
            printWindow.focus();
            hideLoader();
        }, 1000);
        
    } catch (error) {
        console.error('Erro ao preparar impressão:', error);
        showNotification('Erro ao preparar impressão. Verifique o console para mais detalhes.', 'error');
        hideLoader();
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

// Função para buscar casos
async function buscarCasos() {
    try {
        showLoader('Buscando casos...');
        const termo = document.getElementById('buscaCasos').value;
        if (!termo) {
            loadCasos();
            return;
        }
        
        const response = await fetch(`/casos/busca?termo=${encodeURIComponent(termo)}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar casos: ${response.status}`);
        }
        const casos = await response.json();
        renderCasos(casos);
        
        if (casos.length === 0) {
            showNotification(`Nenhum caso encontrado para "${termo}"`, 'info');
        } else {
            showNotification(`${casos.length} caso(s) encontrado(s)`, 'success');
        }
    } catch (error) {
        console.error('Erro ao buscar casos:', error);
        showNotification('Erro ao buscar casos. Verifique o console para mais detalhes.', 'error');
    } finally {
        hideLoader();
    }
}

// Função para popular o dropdown de agentes
async function populateAgentesDropdown() {
    try {
        const agentes = await loadAgentesWithFilters();
        const select = document.getElementById('selectAgente');
        if (!select) {
            console.error('Elemento selectAgente não encontrado');
            return;
        }
        select.innerHTML = '<option value="">Selecione um agente</option>';
        
        agentes.forEach(agente => {
            const option = document.createElement('option');
            option.value = agente.id;
            option.textContent = `${agente.nome} (${formatarCargo(agente.cargo)})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao popular dropdown de agentes:', error);
        showNotification('Erro ao carregar lista de agentes', 'error');
    }
}

// Atualize a renderização de agentes e casos
// Função para renderizar agentes
function renderAgentes(agentes) {
    const container = document.getElementById('agentesList');
    container.innerHTML = '';
    
    if (agentes.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-user-slash text-gray-400 text-4xl mb-3"></i>
                <p class="text-gray-500">Nenhum agente encontrado.</p>
            </div>
        `;
        return;
    }
    
    agentes.forEach(agente => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300';
        card.dataset.id = agente.id;
        
        const cargoFormatado = formatarCargo(agente.cargo);
        const dataFormatada = formatarData(agente.data_incorporacao);
        
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-lg font-semibold flex items-center">
                        <i class="fas fa-user-tie mr-2 text-blue-700"></i>
                        ${agente.nome}
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">
                        <span class="font-medium">Cargo:</span> ${cargoFormatado}
                    </p>
                    <p class="text-sm text-gray-600">
                        <span class="font-medium">Incorporação:</span> ${dataFormatada}
                    </p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="deleteAgente('${agente.id}')" class="text-red-500 hover:text-red-700 p-1" title="Excluir agente">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Atualiza o contador de agentes
    const contador = document.getElementById('contador-agentes');
    if (contador) {
        contador.textContent = agentes.length;
    }
}

// Função para renderizar casos
function renderCasos(casos) {
    const container = document.getElementById('casosList');
    container.innerHTML = '';
    
    if (casos.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-folder-open text-gray-400 text-4xl mb-3"></i>
                <p class="text-gray-500">Nenhum caso encontrado.</p>
                <button onclick="abrirModalCaso()" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                    <i class="fas fa-plus mr-2"></i>Criar Novo Caso
                </button>
            </div>
        `;
        return;
    }
    
    casos.forEach(caso => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300 border-b';
        card.dataset.id = caso.id;
        
        const statusFormatado = formatarStatus(caso.status);
        const statusClass = getStatusClass(caso.status);
        const dataFormatada = formatarData(caso.data_criacao);
        
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-lg font-semibold flex items-center">
                        <i class="fas fa-folder mr-2 text-yellow-600"></i>
                        ${caso.titulo}
                    </h3>
                    <p class="text-sm text-gray-600 mt-1">${caso.descricao}</p>
                </div>
                <span class="status-badge ${statusClass} px-2 py-1 text-xs rounded-full">${statusFormatado}</span>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div>
                    <p class="text-xs text-gray-500">
                        <i class="fas fa-user-shield mr-1"></i>
                        ${caso.agente?.nome || 'Não atribuído'}
                    </p>
                    <p class="text-xs text-gray-500">
                        <i class="far fa-calendar-alt mr-1"></i>
                        ${dataFormatada}
                    </p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="deleteCaso('${caso.id}')" class="text-red-500 hover:text-red-700 p-1" title="Excluir caso">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Atualiza o contador de casos
    const contador = document.getElementById('contador-casos');
    if (contador) {
        contador.textContent = casos.length;
    }
}

// Adicione event listeners para os botões de exportar e imprimir
document.addEventListener('DOMContentLoaded', () => {
    // Botão de exportar casos
    const btnExportarCasos = document.getElementById('btn-exportar-casos');
    if (btnExportarCasos) {
        btnExportarCasos.addEventListener('click', exportarCasosCSV);
    }
    
    // Botão de imprimir lista
    const btnImprimirLista = document.getElementById('btn-imprimir-lista');
    if (btnImprimirLista) {
        btnImprimirLista.addEventListener('click', imprimirCasos);
    }
    
    // Botão de novo agente
    const btnNovoAgente = document.getElementById('btn-novo-agente');
    if (btnNovoAgente) {
        btnNovoAgente.addEventListener('click', abrirModalAgente);
    }
});

// Adicione funções para atualizar contadores
function atualizarContadores() {
    // Atualiza o contador de casos
    const casosList = document.getElementById('casosList');
    const contadorCasos = document.getElementById('contador-casos');
    if (casosList && contadorCasos) {
        const numCasos = casosList.querySelectorAll('.border-b').length;
        contadorCasos.textContent = numCasos;
    }
    
    // Atualiza o contador de agentes
    const agentesList = document.getElementById('agentesList');
    const contadorAgentes = document.getElementById('contador-agentes');
    if (agentesList && contadorAgentes) {
        const numAgentes = agentesList.querySelectorAll('.bg-white').length;
        contadorAgentes.textContent = numAgentes;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadAgentes();
    loadCasos();
    
    document.getElementById('filtroStatus').addEventListener('change', loadCasos);
    document.getElementById('buscaCasos').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarCasos();
    });
    
    // Configuração do formulário permanece a mesma
});
