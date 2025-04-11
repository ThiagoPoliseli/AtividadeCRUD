import {  GerenciadorPersonagem } from "./Personagem";
import { Classe } from "./Types"; 
import { GerenciadorItemMagico, TipoItem } from "./ItemMagico"; 
import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const gerenciadorPersonagem = new GerenciadorPersonagem();
const gerenciadorItemMagico = new GerenciadorItemMagico();


function perguntar(pergunta: string): Promise<string> {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}

async function menu() {
    while (true) {
    console.log("\n╔════════════════════════════════════╗");
    console.log("║    Sistema de Gerenciamento de RPG ║");
    console.log("╠════════════════════════════════════╣");
    console.log("║ 1. Cadastrar Personagem            ║");
    console.log("║ 2. Cadastrar Item Mágico           ║");
    console.log("║ 3. Listar Personagens              ║");
    console.log("║ 4. Buscar Personagem por ID        ║");
    console.log("║ 5. Atualizar Nome Aventureiro      ║");
    console.log("║ 6. Remover Personagem              ║");
    console.log("║ 7. Listar Itens Mágicos            ║");
    console.log("║ 8. Buscar Item Mágico por ID       ║");
    console.log("║ 9. Adicionar Item Mágico ao Pers.  ║");
    console.log("║ 10. Listar Itens Mágicos do Pers.  ║");
    console.log("║ 11. Remover Item Mágico do Pers.   ║");
    console.log("║ 12. Buscar Amuleto do Personagem   ║");
    console.log("║ 0. Sair                            ║");
    console.log("╚════════════════════════════════════╝");
    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
    case "1": 
            await cadastrarPersonagem();
        break;
    case "2": 
            await cadastrarItemMagico();
        break;
    case "3": 
            console.log("Personagens:", gerenciadorPersonagem.listarPersonagens());
        break;
    case "4":
            const idPersonagem = await perguntar("Digite o ID do personagem: ");
            const personagem = gerenciadorPersonagem.buscarPersonagemPorId(idPersonagem);
            console.log("Personagem:", personagem || "Não encontrado");
        break;
    case "5":
            const idAtualizar = await perguntar("Digite o ID do personagem: ");
            const novoNome = await perguntar("Digite o novo nome aventureiro: ");
        try {
            gerenciadorPersonagem.atualizarNomeAventureiro(idAtualizar, novoNome);
            console.log("Nome atualizado com sucesso!");
        } catch (e) {
            console.error("Erro:", (e as Error).message);
        }
        break;
    case "6":
            const idRemover = await perguntar("Digite o ID do personagem a remover: ");
        try {
            gerenciadorPersonagem.removerPersonagem(idRemover);
            console.log("Personagem removido com sucesso!");
        } catch (e) {
            console.error("Erro:", (e as Error).message);
        }
        break;
    case "7":
            console.log("Itens Mágicos:", gerenciadorItemMagico.listarItensMagicos());
        break;
    case "8":
            const idItem = await perguntar("Digite o ID do item mágico: ");
            const item = gerenciadorItemMagico.buscarItemMagicoPorId(idItem);
            console.log("Item:", item || "Não encontrado");
        break;
    case "9": 
            const idPersAdd = await perguntar("Digite o ID do personagem: ");
            const idItemAdd = await perguntar("Digite o ID do item mágico: ");
            const itemAdd = gerenciadorItemMagico.buscarItemMagicoPorId(idItemAdd);
        if (itemAdd) {
        try {
            gerenciadorPersonagem.adicionarItemMagicoAoPersonagem(idPersAdd, itemAdd);
            console.log("Item adicionado com sucesso!");
        } catch (e) {
                console.error("Erro:", (e as Error).message);
        }
        } else {
            console.log("Item não encontrado.");
        }
        break;
    case "10":
            const idPersItens = await perguntar("Digite o ID do personagem: ");
            console.log("Itens:", gerenciadorPersonagem.listarItensMagicosPorPersonagem(idPersItens));
        break;
    case "11":
            const idPersRem = await perguntar("Digite o ID do personagem: ");
            const idItemRem = await perguntar("Digite o ID do item a remover: ");
        try {
            gerenciadorPersonagem.removerItemMagicoDoPersonagem(idPersRem, idItemRem);
            console.log("Item removido com sucesso!");
        } catch (e) {
            console.error("Erro:", (e as Error).message);
        }
        break;
    case "12": 
            const idPersAmuleto = await perguntar("Digite o ID do personagem: ");
            const amuleto = gerenciadorPersonagem.buscarAmuletoDoPersonagem(idPersAmuleto);
            console.log("Amuleto:", amuleto || "Nenhum amuleto encontrado");
        break;
    case "0": 
            console.log("Saindo... Volte sempre!");
        rl.close();
        return;
    default:
            console.log("Opção inválida. Tente novamente.");
    }
}
}

async function cadastrarPersonagem() {
    const id = await perguntar("Digite o ID do personagem: ");
    const nome = await perguntar("Digite o nome do personagem: ");
    const nomeAventureiro = await perguntar("Digite o nome aventureiro: ");
    const classeStr = await perguntar("Digite a classe (Guerreiro, Mago, Arqueiro, Ladino, Bardo): ");
    const level = parseInt(await perguntar("Digite o level: "));
    const forcaBase = parseInt(await perguntar("Digite a força base (0-10): "));
    const defesaBase = parseInt(await perguntar("Digite a defesa base (0-10): "));

    const classe = Classe[classeStr as keyof typeof Classe];
    if (!classe) {
        console.log("Classe inválida!");
        return;
    }

    try {
        gerenciadorPersonagem.cadastrarPersonagem(id, nome, nomeAventureiro, classe, level, forcaBase, defesaBase);
        console.log("Personagem cadastrado com sucesso!");
    } catch (e) {
        console.error("Erro:", (e as Error).message);
    }
}

async function cadastrarItemMagico() {
    const id = await perguntar("Digite o ID do item: ");
    const nome = await perguntar("Digite o nome do item: ");
    const tipoStr = await perguntar("Digite o tipo (Arma, Armadura, Amuleto): ");
    const forcaStr = await perguntar("Digite a força (0-10): ");
    const defesaStr = await perguntar("Digite a defesa (0-10): ");

    const tipo = TipoItem[tipoStr as keyof typeof TipoItem];
    if (!tipo) {
        console.log("Tipo inválido! Use apenas: Arma, Armadura ou Amuleto.");
        return;
    }

    const forca = parseInt(forcaStr, 10);
    const defesa = parseInt(defesaStr, 10);

    if (isNaN(forca) || isNaN(defesa)) {
        console.log("Força e Defesa devem ser números válidos entre 0 e 10!");
        return;
    }

    try {
        gerenciadorItemMagico.cadastrarItemMagico(id, nome, tipo, forca, defesa);
        console.log("Item mágico cadastrado com sucesso!");
    } catch (e) {
        console.error("Erro:", (e as Error).message);
    }
}

menu();