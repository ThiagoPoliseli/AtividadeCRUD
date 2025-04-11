"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Personagem_1 = require("./Personagem");
const Types_1 = require("./Types");
const ItemMagico_1 = require("./ItemMagico");
const readline_1 = require("readline");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
const gerenciadorPersonagem = new Personagem_1.GerenciadorPersonagem();
const gerenciadorItemMagico = new ItemMagico_1.GerenciadorItemMagico();
function perguntar(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}
function menu() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const opcao = yield perguntar("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    yield cadastrarPersonagem();
                    break;
                case "2":
                    yield cadastrarItemMagico();
                    break;
                case "3":
                    console.log("Personagens:", gerenciadorPersonagem.listarPersonagens());
                    break;
                case "4":
                    const idPersonagem = yield perguntar("Digite o ID do personagem: ");
                    const personagem = gerenciadorPersonagem.buscarPersonagemPorId(idPersonagem);
                    console.log("Personagem:", personagem || "Não encontrado");
                    break;
                case "5":
                    const idAtualizar = yield perguntar("Digite o ID do personagem: ");
                    const novoNome = yield perguntar("Digite o novo nome aventureiro: ");
                    try {
                        gerenciadorPersonagem.atualizarNomeAventureiro(idAtualizar, novoNome);
                        console.log("Nome atualizado com sucesso!");
                    }
                    catch (e) {
                        console.error("Erro:", e.message);
                    }
                    break;
                case "6":
                    const idRemover = yield perguntar("Digite o ID do personagem a remover: ");
                    try {
                        gerenciadorPersonagem.removerPersonagem(idRemover);
                        console.log("Personagem removido com sucesso!");
                    }
                    catch (e) {
                        console.error("Erro:", e.message);
                    }
                    break;
                case "7":
                    console.log("Itens Mágicos:", gerenciadorItemMagico.listarItensMagicos());
                    break;
                case "8":
                    const idItem = yield perguntar("Digite o ID do item mágico: ");
                    const item = gerenciadorItemMagico.buscarItemMagicoPorId(idItem);
                    console.log("Item:", item || "Não encontrado");
                    break;
                case "9":
                    const idPersAdd = yield perguntar("Digite o ID do personagem: ");
                    const idItemAdd = yield perguntar("Digite o ID do item mágico: ");
                    const itemAdd = gerenciadorItemMagico.buscarItemMagicoPorId(idItemAdd);
                    if (itemAdd) {
                        try {
                            gerenciadorPersonagem.adicionarItemMagicoAoPersonagem(idPersAdd, itemAdd);
                            console.log("Item adicionado com sucesso!");
                        }
                        catch (e) {
                            console.error("Erro:", e.message);
                        }
                    }
                    else {
                        console.log("Item não encontrado.");
                    }
                    break;
                case "10":
                    const idPersItens = yield perguntar("Digite o ID do personagem: ");
                    console.log("Itens:", gerenciadorPersonagem.listarItensMagicosPorPersonagem(idPersItens));
                    break;
                case "11":
                    const idPersRem = yield perguntar("Digite o ID do personagem: ");
                    const idItemRem = yield perguntar("Digite o ID do item a remover: ");
                    try {
                        gerenciadorPersonagem.removerItemMagicoDoPersonagem(idPersRem, idItemRem);
                        console.log("Item removido com sucesso!");
                    }
                    catch (e) {
                        console.error("Erro:", e.message);
                    }
                    break;
                case "12":
                    const idPersAmuleto = yield perguntar("Digite o ID do personagem: ");
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
    });
}
function cadastrarPersonagem() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = yield perguntar("Digite o ID do personagem: ");
        const nome = yield perguntar("Digite o nome do personagem: ");
        const nomeAventureiro = yield perguntar("Digite o nome aventureiro: ");
        const classeStr = yield perguntar("Digite a classe (Guerreiro, Mago, Arqueiro, Ladino, Bardo): ");
        const level = parseInt(yield perguntar("Digite o level: "));
        const forcaBase = parseInt(yield perguntar("Digite a força base (0-10): "));
        const defesaBase = parseInt(yield perguntar("Digite a defesa base (0-10): "));
        const classe = Types_1.Classe[classeStr];
        if (!classe) {
            console.log("Classe inválida!");
            return;
        }
        try {
            gerenciadorPersonagem.cadastrarPersonagem(id, nome, nomeAventureiro, classe, level, forcaBase, defesaBase);
            console.log("Personagem cadastrado com sucesso!");
        }
        catch (e) {
            console.error("Erro:", e.message);
        }
    });
}
function cadastrarItemMagico() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = yield perguntar("Digite o ID do item: ");
        const nome = yield perguntar("Digite o nome do item: ");
        const tipoStr = yield perguntar("Digite o tipo (Arma, Armadura, Amuleto): ");
        const forcaStr = yield perguntar("Digite a força (0-10): ");
        const defesaStr = yield perguntar("Digite a defesa (0-10): ");
        const tipo = ItemMagico_1.TipoItem[tipoStr];
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
        }
        catch (e) {
            console.error("Erro:", e.message);
        }
    });
}
menu();
