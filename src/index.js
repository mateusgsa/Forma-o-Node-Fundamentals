// biblioteca readline

const readline = require("readline");

//criando personagens em objetos.
const players = [
    {
        nome: "Mario", velocidade: 4, manobrabilidade: 3, poder: 3, pontos: 0
    },
    {
        nome: "Peach", velocidade: 3, manobrabilidade: 4, poder: 2, pontos: 0
    },
    {
        nome: "Yoshi", velocidade: 2, manobrabilidade: 4, poder: 3, pontos: 0
    },
    {
        nome: "Bowser", velocidade: 5, manobrabilidade: 2, poder: 5, pontos: 0
    },
    {
        nome: "Luigi", velocidade: 2, manobrabilidade: 4, poder: 4, pontos: 0
    },
    {
        nome: "Donkey Kong", velocidade: 2, manobrabilidade: 2, poder: 5, pontos: 0
    },
];

// Declarando função de rolar dados
async function rollDice() {
    // utilizando calculo matematicos com função random através da biblioteca
    return Math.floor(Math.random() * 6) + 1;
};

// função para dar um bloco
async function getRadonBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
    return result;
}

// função para carregar informações da jogado do dado, essa funação será usada para diminuir a quantidade de
// de caracters do código conehcida como refatoração 
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} `);
}

// fuçnção que executara o jogo (morto da corrida)
async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRadonBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidades
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        // verificação de disputa
        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.velocidade;
            totalTestSkill2 = diceResult2 + character2.velocidade;

            await logRollResult(
                character1.nome,
                "velocidade",
                diceResult1,
                character1.velocidade
            );
            await logRollResult(
                character2.nome,
                "velocidade",
                diceResult2,
                character2.velocidade
            );
        }
        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.manobrabilidade;
            totalTestSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResult(
                character1.nome,
                "manobrabilidade",
                diceResult1,
                character1.manobrabilidade
            );
            await logRollResult(
                character2.nome,
                "manobrabilidade",
                diceResult2,
                character2.manobrabilidade
            );
        }
        if (block === "CONFRONTO") {
            // totalTestSkill1 = diceResult1 + character1.poder;
            // totalTestSkill2 = diceResult2 + character2.poder;

            let powerResult1 = diceResult1 + character1.poder;
            let powerResult2 = diceResult2 + character2.poder;

            console.log(`${character1.nome} confrontou com ${character2.nome}`);

            await logRollResult(
                character1.nome,
                "poder",
                diceResult1,
                character1.poder
            );
            await logRollResult(
                character2.nome,
                "poder",
                diceResult2,
                character2.poder
            );

            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(
                    `${character1.nome} venceu o confronto! ${character2.nome} perdeu 1 ponto.`
                );
                character2.pontos--;
            }

            if (powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(
                    `${character2.nome} venceu o confronto! ${character1.nome} perdeu 1 ponto.`
                );
                character1.pontos--;
            }
            console.log(powerResult2 === powerResult1 ? "Confornto empatado! Nenhum ponto foi perdido" : "");

            // operação que reduz os IF's conhecido como if com operador ternário 
            // character2.pontos -= powerResult1 > powerResult2 && character2.pontos > 0 ? 1 : 0;
            // character1.pontos -= powerResult2 > powerResult1 && character1.pontos > 0 ? 1 : 0;


            // if (powerResult1 > powerResult2) {
            //     if (powerResult2.pontos > 0) {
            //         character2.pontos--;
            //     }
            // }

            // if (powerResult2 > powerResult1) {
            //     if (powerResult1.pontos > 0) {
            //         character1.pontos--;
            //     }
            // }
            // if (powerResult2 === powerResult1) {
            //     console.log("Confronto empatado! Nenhum ponto foi perdido")
            //     }
        }

        // verificando vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;
        }
        else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++;
        }
        console.log("---------------------------------------------")
    };
};

async function declareWinner(character1, character2) {
    console.log("REsultado final");
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`);

    if (character1.pontos > character2.pontos)
        console.log(`\n${character1.nome} venceu a corrida! Parabéns!`);
    else if (character2.pontos > character2.pontos)
        console.log(`\n${character2.nome} venceu a corrida! Parabéns!`);
    else
        console.log("A corrida terminou em empate");
}

// escolhendo o player

async function choosePlayers() {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stout,
    });

    console.log("Escolha dois personagens para disputar:");
    console.log("__________________________________________");
    // forEach enumera os itens de um array
    players.forEach((player, num) => {
        console.log(`${num + 1}. - ${player.nome}`)
    });

    const askQuestion = (query) => new Promise((resolve) => interface.question(query, resolve));
    console.log("__________________________________________");

    let player1, player2;
    while (true){
        player1 = await askQuestion("Escolha o numero do primeiro jogador: ");
        player2 = await askQuestion("Escolha o numero do primeiro jogador: ");

        // convertendo nuemros insereidos em numeros inteiros.
        player1 = parseInt(player1) -1;
        player2 = parseInt(player2) -1;

        if(player1 >= 0 && player1 < players.length && player2 >= 0 && player2 < players.length && player1 !== player2){
            break;
        }
        else{
            console.log("Escolha inválida, tente novamente.");
        }
    };

    interface.close();
    return [players[player1], players[player2]];
}


// Função de entrada
// função auto invocacel, dentro de parentes
// apertando windows + ponto final para inserir emoticons. 
(async function main() {

    console.log("Vamos iniciar nossa corrida.\nSeja bem vindo!");

    const [player1, player2] = await choosePlayers();

    console.log(`🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando ... \n`)

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
