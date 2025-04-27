const Inicial = document.getElementById("inicial");
const Quiz = document.getElementById("quiz");
const Resultado = document.getElementById("resultado-pagina");
const Pergunta = document.getElementById("pergunta");
const img = document.getElementById("img");
const nome= document.getElementById("nome");
const descricao = document.getElementById("descricao");

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
    estela: new Personagem("Princesa Estela", "É a herdeira do Reino Flamejante, uma jovem destemida com o poder de controlar e invocar o fogo. Apesar de sua origem nobre, ela se recusa a viver apenas nos salões do castelo e prefere enfrentar seus próprios desafios no campo de batalha.", "img/princesa.jpg"),
    shin: new Personagem("Espada Shin", "É um guerreiro solitário que domina qualquer tipo de espada com perfeição. Treinado desde criança por um mestre misterioso, ele segue sua jornada pessoal para se tornar o maior espadachim do mundo, mesmo que isso signifique viver longe de laços afetivos.", "img/shin.jpg"),
    moglie: new Personagem("Moglie", "É uma exploradora ágil e astuta que cresceu nas florestas místicas de Eldora. Criada entre criaturas mágicas, ela domina o terreno como ninguém e raramente é vista antes de atacar. Sua velocidade e astúcia a tornam uma aliada valiosa (ou uma inimiga perigosa). ", "img/moglie.jpg")
};

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
    Inicial.style.display = "none";
    Resultado.style.display = "none";
    Quiz.style.display = "block";
    perguntaAtual = 0;

    for (let chave in personagens) {
        personagens[chave].pontos = 0;
    }

    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    const alternativas = opcoes[perguntaAtual];

    Pergunta.innerHTML = `<h2>${pergunta}</h2>`;

    alternativas.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.addEventListener("click", () => responder(index));
        Pergunta.appendChild(btn);
    });
}

function responder(indice) {
    if (indice === 0) personagens.estela.pontos++;
    else if (indice === 1) personagens.shin.pontos++;
    else if (indice === 2) personagens.moglie.pontos++;

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    Quiz.style.display = "none";
    Resultado.style.display = "block";

    let vencedor = "estela";
    if (personagens.shin.pontos > personagens[vencedor].pontos) vencedor = "shin";
    if (personagens.moglie.pontos > personagens[vencedor].pontos) vencedor = "moglie";

    const personagem = personagens[vencedor];
    nome.innerText = personagem.nome;
    descricao.innerText = personagem.descricao;
    img.src = personagem.imagem;
}

function reiniciarQuiz() {
    iniciarQuiz();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("iniciar").addEventListener("click", iniciarQuiz);
    document.getElementById("reiniciar").addEventListener("click", reiniciarQuiz);
});