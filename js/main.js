document.addEventListener('DOMContentLoaded', function() {
    // Elementos da UI
    const loadingIndicator = document.getElementById('loading-indicator');
    const instructionText = document.getElementById('instruction-text');
    const dialogElements = [
        document.getElementById('dialog1'),
        document.getElementById('dialog2'),
        document.getElementById('dialog3'),
        document.getElementById('dialog4')
    ];
    const achievementBox = document.getElementById('achievement-box');
    const restartContainer = document.getElementById('restart-container');
    const restartButton = document.getElementById('restart-button');
    const thoughtBubble = document.getElementById('thought-bubble');
    const scene = document.querySelector('a-scene');
    
    // Textos dos diálogos
    const dialogTexts = [
        "Uau, finalmente consigo ver minhas costas!",
        "A realidade... tão intensa... Mas será real?",
        "Enfim, estou livre.",
        "Valeu pela ajuda!"
    ];
    
    // Textos dos pensamentos após a conquista
    const thoughtTexts = [
        "Você ainda por aqui?",
        "Sério, muito obrigado!",
        "Sabe, não sei o que faço com tamanha liberdade...",
        "Ei, pode recomeçar o jogo no botão abaixo."
    ];
    
    // Variáveis de controle
    let dialogTimeouts = [];
    let achievementTimeout;
    let restartTimeout;
    let pinkyModel = null;
    let isModelVisible = false;
    let thoughtInterval = null;
    
    // Função para mostrar o modelo 3D
    function showPinkyModel() {
        if (isModelVisible) return;
        
        // Esconder o texto de instrução após o primeiro toque
        instructionText.style.display = 'none';
        
        // Criar o modelo do Pinky
        pinkyModel = createPinkyModel();
        scene.appendChild(pinkyModel);
        isModelVisible = true;
        
        // Iniciar sequência de diálogos
        startDialogSequence();
    }
    
    // Função para reiniciar a experiência
    function restartExperience() {
        // Limpar todos os timeouts e intervalos
        dialogTimeouts.forEach(timeout => clearTimeout(timeout));
        clearTimeout(achievementTimeout);
        clearTimeout(restartTimeout);
        if (thoughtInterval) {
            clearInterval(thoughtInterval);
            thoughtInterval = null;
        }
        
        // Esconder todos os elementos de UI
        dialogElements.forEach(dialog => dialog.style.display = 'none');
        achievementBox.style.display = 'none';
        restartContainer.style.display = 'none';
        thoughtBubble.style.display = 'none';
        
        // Remover o modelo atual se existir
        if (pinkyModel && pinkyModel.parentNode) {
            pinkyModel.parentNode.removeChild(pinkyModel);
        }
        
        // Resetar variáveis de controle
        pinkyModel = null;
        isModelVisible = false;
        dialogTimeouts = [];
        
        // Redirecionar para o site "corre"
        window.location.href = "https://afugadepinky.netlify.app/";
    }
    
    // Função para iniciar a sequência de diálogos
    function startDialogSequence() {
        // Limpar timeouts anteriores
        dialogTimeouts.forEach(timeout => clearTimeout(timeout));
        dialogTimeouts = [];
        dialogElements.forEach(dialog => dialog.style.display = 'none');
        clearTimeout(achievementTimeout);
        clearTimeout(restartTimeout);
        achievementBox.style.display = 'none';
        restartContainer.style.display = 'none';
        thoughtBubble.style.display = 'none';
        
        // Configurar e mostrar os diálogos em sequência
        let cumulativeDelay = 0;
        dialogTexts.forEach((text, index) => {
            dialogElements[index].innerText = text;
            const timeout = setTimeout(() => {
                // Esconder o diálogo anterior se não for o primeiro
                if (index > 0) dialogElements[index - 1].style.display = 'none';
                // Mostrar o diálogo atual
                dialogElements[index].style.display = 'block';
            }, cumulativeDelay);
            dialogTimeouts.push(timeout);
            cumulativeDelay += 3000; // Cada diálogo fica visível por 3 segundos
        });
        
        // Timeout para esconder o último diálogo e mostrar a conquista
        const finalDialogTimeout = setTimeout(() => {
            dialogElements[dialogTexts.length - 1].style.display = 'none';
            achievementBox.style.display = 'block';
            
            // Mostrar o botão de recomeçar após a conquista
            achievementTimeout = setTimeout(() => {
                restartContainer.style.display = 'flex';
                
                // Iniciar a exibição dos pensamentos em nuvem
                startThoughtBubbles();
                
            }, 3000); // Botão de recomeçar aparece 3 segundos após a conquista
            
        }, cumulativeDelay);
        dialogTimeouts.push(finalDialogTimeout);
    }
    
    // Função para iniciar a exibição dos pensamentos em nuvem
    function startThoughtBubbles() {
        // Limpar qualquer intervalo anterior
        if (thoughtInterval) {
            clearInterval(thoughtInterval);
            thoughtInterval = null;
        }
        
        let currentThoughtIndex = 0;
        
        // Mostrar o primeiro pensamento
        showThought(thoughtTexts[currentThoughtIndex]);
        
        // Configurar intervalo para alternar entre os pensamentos
        thoughtInterval = setInterval(() => {
            currentThoughtIndex = (currentThoughtIndex + 1) % thoughtTexts.length;
            showThought(thoughtTexts[currentThoughtIndex]);
        }, 7000); // Aumentar o intervalo para 7 segundos para evitar sobreposição
    }
    
    // Função para mostrar um pensamento na nuvem
    function showThought(text) {
        thoughtBubble.textContent = text;
        thoughtBubble.style.display = 'block';
        thoughtBubble.style.animation = 'fadeInOut 6s forwards';
        
        // Remover a animação após completar para permitir nova animação
        setTimeout(() => {
            thoughtBubble.style.animation = '';
            thoughtBubble.style.display = 'none'; // Esconder completamente entre animações
        }, 6000);
    }
    
    // Evento de clique no botão de recomeçar
    restartButton.addEventListener('click', restartExperience);
    
    // Evento de clique na tela para mostrar o modelo
    document.addEventListener('click', function(event) {
        if (!isModelVisible) {
            showPinkyModel();
        }
    });
    
    // Evento de carregamento da cena
    if (scene.hasLoaded) {
        loadingIndicator.style.display = 'none';
        instructionText.style.display = 'block';
    } else {
        scene.addEventListener('loaded', function() {
            loadingIndicator.style.display = 'none';
            instructionText.style.display = 'block';
        });
    }
});
