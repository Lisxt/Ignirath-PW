const paginaInicial = document.getElementById("pagina-inicial");
const paginaQuiz = document.getElementById("pagina-quiz");
const paginaResultado = document.getElementById("pagina-resultado");
const perguntaContainer = document.getElementById("pergunta-container");
const resultadoTexto = document.getElementById("resultado");
const imgResultado = document.getElementById("img-personagem");
const nomePersonagem = document.getElementById("nome-personagem");
const descricaoPersonagem = document.getElementById("descricao-personagem");

// Classe Personagem
class Personagem {
    constructor(nome, descricao, imagem) {
        this.nome = nome;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos = 0;
    }

    adicionarPontos(valor) {
        this.pontos += valor;
    }
}

const personagens = {
    estela: new Personagem("Princesa Estela", "Herdeira do Reino Flamejante, controla o fogo e lidera com coragem.", "img/princesa.jpg"),
    shin: new Personagem("Espada Shin", "Guerreiro solitário e mestre das lâminas, frio e preciso.", "img/shin.jpg"),
    moglie: new Personagem("Moglie", "Exploradora veloz da selva de Eldora, ágil e astuta.", "img/moglie.jpg")
};

// Perguntas e opções
const perguntas = [
    "Qual dessas qualidades te define melhor?",
    "Qual ambiente você se sente mais confortável?",
    "Em uma batalha, o que você faria?",
    "Qual desses objetos você escolheria para uma missão?",
    "Qual seria seu passatempo ideal?",
    "Como você lida com trabalho em equipe?",
    "O que mais te irrita nas pessoas?",
    "O que você mais valoriza em si mesmo(a)?",
    "Em uma festa, você seria…",
    "Qual desses lemas representa você?"
];

const opcoes = [
    ["Coragem e paixão pelo que faz", "Disciplina e foco em objetivos", "Astúcia e conexão com a natureza"],
    ["Perto de vulcões ou lugares quentes", "Campos abertos para treinar combate", "Florestas densas e trilhas secretas"],
    ["Atacaria com tudo usando seu poder", "Estudaria o inimigo antes de agir", "Procuraria um ponto fraco e atacaria rápido"],
    ["Um anel mágico que canaliza fogo", "Uma espada forjada por mestres antigos", "Um manto de camuflagem natural"],
    ["Meditar próximo ao fogo ou em fontes termais", "Treinar técnicas de combate com armas", "Explorar cavernas e mapear trilhas secretas"],
    ["Lidero naturalmente, mas gosto que sigam minhas ordens", "Prefiro trabalhar sozinho, mas colaboro quando necessário", "Gosto de colaborar, desde que haja liberdade de movimento"],
    ["Falta de iniciativa e coragem", "Falta de disciplina e compromisso", "Falta de senso de adaptação ou conexão com o ambiente"],
    ["Meu espírito de liderança", "Minha habilidade de vencer qualquer desafio", "Minha capacidade de sobreviver e me adaptar"],
    ["O centro das atenções, cheia de energia", "O observador quieto no canto", "A pessoa que entra e sai sem ninguém perceber"],
    ["A chama dentro de mim nunca se apaga.", "Corte preciso, mente afiada.", "Silêncio é poder."]
];

let perguntaAtual = 0;

function iniciarQuiz() {
    paginaInicial.style.display = "none";
    paginaResultado.style.display = "none";
    paginaQuiz.style.display = "block";
    perguntaAtual = 0;

    // Zerar os pontos
    for (let chave in personagens) {
        personagens[chave].pontos = 0;
    }

    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    const alternativas = opcoes[perguntaAtual];

    perguntaContainer.innerHTML = `<h2>${pergunta}</h2>`;

    alternativas.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.addEventListener("click", () => responder(index));
        perguntaContainer.appendChild(btn);
    });
}

function responder(indice) {
    if (indice === 0) personagens.estela.adicionarPontos(10);
    else if (indice === 1) personagens.shin.adicionarPontos(5);
    else if (indice === 2) personagens.moglie.adicionarPontos(1);

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    paginaQuiz.style.display = "none";
    paginaResultado.style.display = "block";

    let vencedor = "estela";
    if (personagens.shin.pontos > personagens[vencedor].pontos) vencedor = "shin";
    if (personagens.moglie.pontos > personagens[vencedor].pontos) vencedor = "moglie";

    const personagem = personagens[vencedor];
    resultadoTexto.innerText = `Você é ${personagem.nome}!`;
    nomePersonagem.innerText = personagem.nome;
    descricaoPersonagem.innerText = personagem.descricao;
    imgResultado.src = personagem.imagem;
}


function reiniciarQuiz() {
    iniciarQuiz();
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-iniciar").addEventListener("click", iniciarQuiz);
    document.getElementById("btn-reiniciar").addEventListener("click", reiniciarQuiz);
});
