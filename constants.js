export const DB_REF = "copom_data/global_v1";
export const PASSWORD = "subtop";
export const STORAGE_KEY_V3 = "quick_msg_data_v3"; // Local backup
export const STORAGE_KEY_THEME = "copom_theme_local"; // Local settings
export const STORAGE_KEY_VIEW = "copom_view_mode"; // Local view preference
export const STORAGE_KEY_PAGE_VIEWS = "copom_page_views"; // Page view counter
export const STORAGE_KEY_DARK_MODE = "copom_dark_mode"; // Dark mode preference

export const DEFAULT_COLORS = {
    pageBg: "#f4f4f4",
    bg: "#ffffff",
    text: "#333333",
    active: "#2ecc71"
};

export const DEFAULT_ITEMS = [
    { id: '1', label: 'Motivo de Não Disponível (Agent-MICC)', message: 'Lembre-se de alterar seu status quando se ausentar para pausas ou ao terminar o cadastro de ocorrência.' },
    { id: '2', label: 'Posatende', message: 'Informe ao supervisor que o contato foi encerrado e você está finalizando a ocorrência no sistema.' },
    { id: '3', label: 'Comunicação com Supervisão', message: 'Ao informar à supervisão, sempre comece com o número do talão e, em seguida, o contexto da ocorrência.' },
    { id: '4', label: 'Receber Ligação', message: 'Quando receber uma ligação, preencha as informações necessárias no sistema.' },
    { id: '5', label: 'Verificação de Número', message: 'Verifique se o número da ligação é válido e não é um número espelho.' },
    { id: '6', label: 'Informar Supervisão', message: 'Informe a supervisão sobre ocorrências importantes e insira as informações corretas no sistema.' },
    { id: '7', label: 'Ocorrência de Trote', message: 'Em caso de trote, registre todas as informações no histórico e informe ao solicitante.' },
    { id: '8', label: 'Transferência de Ligação', message: 'Se uma ligação for transferida, verifique se o número do solicitante está correto e adicione-o ao sistema.' },
    { id: '9', label: 'Retorno de Ligação', message: 'Retorne ligações que necessitam de dados adicionais ou para confirmar informações.' },
    { id: '10', label: 'Solicitação de Apoio', message: 'Em casos críticos, solicite apoio imediatamente utilizando os meios disponíveis.' },
    { id: '11', label: 'Relatar Ocorrência Crítica', message: 'Em caso de ocorrências graves, reporte à supervisão imediatamente.' },
    { id: '12', label: 'Aviso de Mudança de Escala', message: 'Informe se houver mudanças nas escalas de atendimento, como folgas ou novos turnos.' },
    { id: '13', label: 'Cancelamento de Ocorrência', message: 'Se a ocorrência for cancelada, registre corretamente a alteração no sistema.' },
    { id: '14', label: 'Atualização de Status', message: 'Atualize seu status quando necessário, especialmente em períodos de pausa ou quando estiver concluindo um atendimento.' },
    { id: '15', label: 'Ocorrência de Vazamento de Dados', message: 'Informe imediatamente sobre qualquer possível vazamento de dados ou falha de segurança.' },
    { id: '16', label: 'Interrupção de Atendimento', message: 'Se houver necessidade de interromper o atendimento, informe o solicitante sobre o motivo e a solução.' },
    { id: '17', label: 'Solicitação de Auxílio', message: 'Caso precise de auxílio, entre em contato com o supervisor ou responsável imediatamente.' },
    { id: '18', label: 'Suspensão Temporária', message: 'Caso haja necessidade de suspensão temporária do atendimento, informe aos responsáveis e registre a mudança.' },
    { id: '19', label: 'Erro de Registro', message: 'Se houver erro no registro de ocorrência, corrija-o o mais rápido possível e comunique aos superiores.' },
    { id: '20', label: 'Encerramento de Atendimento', message: 'Ao encerrar um atendimento, confirme que todas as informações foram registradas corretamente.' },
    { id: '21', label: 'Pedido de Desbloqueio', message: 'Registre o pedido de desbloqueio de acesso ao sistema, se solicitado.' },
    { id: '22', label: 'Falha de Sistema', message: 'Em caso de falha no sistema, registre a ocorrência e entre em contato com a equipe técnica.' },
    { id: '23', label: 'Aviso de Manutenção', message: 'Informe ao cliente sobre a manutenção programada e como ela pode afetar o atendimento.' },
    { id: '24', label: 'Novo Procedimento', message: 'Informe sobre qualquer novo procedimento a ser seguido durante o atendimento.' },
    { id: '25', label: 'Ajuste de Escala', message: 'Se ocorrer algum ajuste na escala de atendimento, faça a atualização no sistema.' },
    { id: '26', label: 'Verificação de Pendência', message: 'Verifique e resolva quaisquer pendências antes de finalizar o atendimento.' },
    { id: '27', label: 'Atendimento de Urgência', message: 'Em casos urgentes, priorize o atendimento e registre todos os detalhes de forma clara.' },
    { id: '28', label: 'Alerta de Segurança', message: 'Caso detecte alguma falha de segurança, informe imediatamente à supervisão.' },
    { id: '29', label: 'Acompanhamento de Chamado', message: 'Realize o acompanhamento dos chamados em aberto e atualize o status conforme necessário.' },
    { id: '30', label: 'Escala de Revezamento', message: 'Em situações de revezamento de equipe, informe aos responsáveis sobre os horários e turnos.' },
    { id: '31', label: 'Problema de Comunicação', message: 'Se houver qualquer problema de comunicação, resolva com a maior brevidade possível.' },
    { id: '32', label: 'Relatório de Desempenho', message: 'Prepare relatórios de desempenho e envio para a supervisão.' },
    { id: '33', label: 'Alteração de Regras', message: 'Informe sobre qualquer alteração nas regras ou procedimentos internos.' },
    { id: '34', label: 'Atualização de Sistema', message: 'Caso haja atualização no sistema, registre as mudanças e informe aos envolvidos.' },
    { id: '35', label: 'Resposta a Solicitação', message: 'Se houver alguma solicitação, responda dentro do prazo e conforme as regras estabelecidas.' },
    { id: '36', label: 'Verificação de Informações', message: 'Antes de finalizar qualquer atendimento, verifique as informações fornecidas.' },
    { id: '37', label: 'Correção de Dados', message: 'Caso haja necessidade de corrigir algum dado, faça isso o mais rápido possível.' },
    { id: '38', label: 'Revisão de Chamado', message: 'Revise os chamados para garantir que todos os dados foram inseridos corretamente.' },
    { id: '39', label: 'Gestão de Equipe', message: 'Realize a gestão e o monitoramento da equipe de atendimento.' },
    { id: '40', label: 'Encerramento de Escala', message: 'Realize o encerramento da sua escala de atendimento conforme a programação.' }
];

// Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAU65_k8Oa1XuoQVncMI06DPzFjOWR1kTA",
  authDomain: "aguilera-92c41.firebaseapp.com",
  databaseURL: "https://aguilera-92c41-default-rtdb.firebaseio.com",
  projectId: "aguilera-92c41",
  storageBucket: "aguilera-92c41.firebasestorage.app",
  messagingSenderId: "860409156098",
  appId: "1:860409156098:web:7f209ba10e99466fabcd1b"
};