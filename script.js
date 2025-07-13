// Dados dos animais para adoção
const pets = [
    {
        id: 1,
        name: "Zeus",
        age: "2 anos",
        description: "Um cachorro carinhoso e brincalhão, adora crianças e outros pets. Já castrado e vacinado.",
        image: "cachorro1.jpeg",
        whatsapp: "5511999999999"
    },
    {
        id: 2,
        name: "Luna",
        age: "1 ano",
        description: "Gatinha dócil e independente, perfeita para apartamento. Muito carinhosa e adora carinho.",
        image: "gato1.jpg",
        whatsapp: "5511888888888"
    },
    {
        id: 3,
        name: "Max",
        age: "3 anos",
        description: "Cachorro de porte médio, muito leal e protetor. Ideal para famílias com casa e quintal.",
        image: "cachorro2.jpg",
        whatsapp: "5511777777777"
    },
    {
        id: 4,
        name: "Mimi",
        age: "6 meses",
        description: "Gatinha filhote muito brincalhona, adora brinquedos e é muito sociável com outros gatos.",
        image: "gato2.jpg",
        whatsapp: "5511666666666"
    },
    {
        id: 5,
        name: "Buddy",
        age: "4 anos",
        description: "Cachorro calmo e obediente, perfeito para pessoas mais velhas. Muito companheiro.",
        image: "cachorro3.jpg",
        whatsapp: "5511555555555"
    },
    {
        id: 6,
        name: "Whiskers",
        age: "2 anos",
        description: "Gato muito inteligente e curioso, adora explorar e brincar. Castrado e vacinado.",
        image: "gato3.png",
        whatsapp: "5511444444444"
    },
    {
        id: 7,
        name: "Bella",
        age: "1 ano e 6 meses",
        description: "Cadela muito doce e amorosa, adora passear e brincar no parque. Ótima com crianças.",
        image: "cachorro4.jpg",
        whatsapp: "5511333333333"
    },
    {
        id: 8,
        name: "Shadow",
        age: "3 anos",
        description: "Gato preto elegante e misterioso, muito carinhoso quando conhece bem a pessoa.",
        image: "gato4.jpg",
        whatsapp: "5511222222222"
    }
];

// Estado da aplicação
let currentPetIndex = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

// Elementos DOM
const cardStack = document.getElementById('cardStack');
const likeBtn = document.getElementById('likeBtn');
const rejectBtn = document.getElementById('rejectBtn');
const matchModal = document.getElementById('matchModal');
const matchPetInfo = document.getElementById('matchPetInfo');
const whatsappBtn = document.getElementById('whatsappBtn');
const continueBtn = document.getElementById('continueBtn');
const noMoreCards = document.getElementById('noMoreCards');
const restartBtn = document.getElementById('restartBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadNextPets();
    setupEventListeners();
});

// Carregar próximos pets
function loadNextPets() {
    // Limpar cards existentes
    cardStack.innerHTML = '';
    
    // Carregar até 3 cards por vez para melhor performance
    for (let i = 0; i < 3 && (currentPetIndex + i) < pets.length; i++) {
        const petIndex = currentPetIndex + i;
        const card = createPetCard(pets[petIndex], i);
        cardStack.appendChild(card);
    }
    
    if (currentPetIndex >= pets.length) {
        showNoMoreCards();
    }
}

// Criar card do pet
function createPetCard(pet, zIndex) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.style.zIndex = 10 - zIndex;
    card.dataset.petId = pet.id;
    
    card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+'">
        <div class="pet-info">
            <h3 class="pet-name">${pet.name}</h3>
            <p class="pet-age">${pet.age}</p>
            <p class="pet-description">${pet.description}</p>
        </div>
    `;
    
    // Adicionar event listeners para touch/mouse
    setupCardEvents(card);
    
    return card;
}

// Configurar eventos do card
function setupCardEvents(card) {
    // Mouse events
    card.addEventListener('mousedown', handleStart);
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseup', handleEnd);
    card.addEventListener('mouseleave', handleEnd);
    
    // Touch events
    card.addEventListener('touchstart', handleStart, { passive: false });
    card.addEventListener('touchmove', handleMove, { passive: false });
    card.addEventListener('touchend', handleEnd);
}

// Configurar event listeners gerais
function setupEventListeners() {
    likeBtn.addEventListener('click', () => handleSwipe('right'));
    rejectBtn.addEventListener('click', () => handleSwipe('left'));
    continueBtn.addEventListener('click', closeMatchModal);
    restartBtn.addEventListener('click', restartApp);
    
    // Fechar modal clicando fora
    matchModal.addEventListener('click', (e) => {
        if (e.target === matchModal) {
            closeMatchModal();
        }
    });
}

// Manipular início do toque/clique
function handleStart(e) {
    if (e.target.closest('.pet-card') !== e.currentTarget) return;
    
    isDragging = true;
    const card = e.currentTarget;
    card.classList.add('dragging');
    
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    
    startX = clientX;
    startY = clientY;
    currentX = clientX;
    currentY = clientY;
    
    if (e.type === 'touchstart') {
        e.preventDefault();
    }
}

// Manipular movimento
function handleMove(e) {
    if (!isDragging) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    
    currentX = clientX;
    currentY = clientY;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const rotation = deltaX * 0.1;
    
    const card = e.currentTarget;
    card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
    
    // Feedback visual baseado na direção
    const opacity = Math.min(Math.abs(deltaX) / 100, 1);
    if (deltaX > 50) {
        card.style.boxShadow = `0 10px 30px rgba(78, 205, 196, ${opacity * 0.5})`;
    } else if (deltaX < -50) {
        card.style.boxShadow = `0 10px 30px rgba(255, 107, 107, ${opacity * 0.5})`;
    } else {
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    }
    
    if (e.type === 'touchmove') {
        e.preventDefault();
    }
}

// Manipular fim do toque/clique
function handleEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    const card = e.currentTarget;
    card.classList.remove('dragging');
    
    const deltaX = currentX - startX;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
        const direction = deltaX > 0 ? 'right' : 'left';
        swipeCard(card, direction);
    } else {
        // Retornar à posição original
        card.style.transform = '';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    }
}

// Manipular swipe programático (botões)
function handleSwipe(direction) {
    const topCard = cardStack.querySelector('.pet-card');
    if (topCard) {
        swipeCard(topCard, direction);
    }
}

// Executar swipe do card
function swipeCard(card, direction) {
    const petId = parseInt(card.dataset.petId);
    const pet = pets.find(p => p.id === petId);
    
    // Animação de saída
    card.classList.add(`card-swipe-${direction}`);
    
    // Se foi swipe para direita (like), mostrar modal de match
    if (direction === 'right' && pet) {
        setTimeout(() => showMatchModal(pet), 300);
    }
    
    // Remover card após animação
    setTimeout(() => {
        card.remove();
        currentPetIndex++;
        
        // Carregar próximo pet se necessário
        if (cardStack.children.length < 2 && currentPetIndex < pets.length) {
            const nextPetIndex = currentPetIndex + cardStack.children.length;
            if (nextPetIndex < pets.length) {
                const newCard = createPetCard(pets[nextPetIndex], cardStack.children.length);
                cardStack.appendChild(newCard);
            }
        }
        
        // Verificar se acabaram os pets
        if (cardStack.children.length === 0) {
            if (currentPetIndex >= pets.length) {
                showNoMoreCards();
            }
        }
    }, 500);
}

// Mostrar modal de match
function showMatchModal(pet) {
    matchPetInfo.innerHTML = `
        <div class="match-pet-name">${pet.name}</div>
        <div class="match-pet-age">${pet.age}</div>
    `;
    
    const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse em adotar o ${pet.name}. Podemos conversar?`);
    whatsappBtn.href = `https://wa.me/${pet.whatsapp}?text=${whatsappMessage}`;
    
    matchModal.classList.add('show');
}

// Fechar modal de match
function closeMatchModal() {
    matchModal.classList.remove('show');
}

// Mostrar tela de "sem mais cards"
function showNoMoreCards() {
    noMoreCards.classList.add('show');
}

// Reiniciar aplicação
function restartApp() {
    currentPetIndex = 0;
    noMoreCards.classList.remove('show');
    loadNextPets();
}

// Prevenir comportamentos padrão em dispositivos móveis
document.addEventListener('touchmove', function(e) {
    if (isDragging) {
        e.preventDefault();
    }
}, { passive: false });

// Adicionar suporte a teclado para acessibilidade
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        handleSwipe('left');
    } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
    }
});

