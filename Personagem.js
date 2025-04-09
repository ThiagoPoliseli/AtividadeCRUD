"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerenciadorPersonagem = exports.PersonagemImpl = void 0;
const Types_1 = require("./Types");
class PersonagemImpl {
    constructor(id, nome, nomeAventureiro, classe, level, forcaBase, defesaBase) {
        if (forcaBase + defesaBase !== 10 || forcaBase < 0 || defesaBase < 0) {
            throw new Error("A soma de Força e Defesa deve ser exatamente 10.");
        }
        this.id = id;
        this.nome = nome;
        this.nomeAventureiro = nomeAventureiro;
        this.classe = classe;
        this.level = level;
        this.itensMagicos = [];
        this.forcaBase = forcaBase;
        this.defesaBase = defesaBase;
    }
    getForcaTotal() {
        return this.forcaBase + this.itensMagicos.reduce((sum, item) => sum + item.forca, 0);
    }
    getDefesaTotal() {
        return this.defesaBase + this.itensMagicos.reduce((sum, item) => sum + item.defesa, 0);
    }
}
exports.PersonagemImpl = PersonagemImpl;
class GerenciadorPersonagem {
    constructor() {
        this.personagens = [];
    }
    cadastrarPersonagem(id, nome, nomeAventureiro, classe, level, forcaBase, defesaBase) {
        const personagem = new PersonagemImpl(id, nome, nomeAventureiro, classe, level, forcaBase, defesaBase);
        this.personagens.push(personagem);
        return personagem;
    }
    listarPersonagens() {
        return this.personagens;
    }
    buscarPersonagemPorId(id) {
        return this.personagens.find((p) => p.id === id);
    }
    atualizarNomeAventureiro(id, novoNome) {
        const personagem = this.buscarPersonagemPorId(id);
        if (!personagem)
            throw new Error("Personagem não encontrado.");
        personagem.nomeAventureiro = novoNome;
    }
    removerPersonagem(id) {
        const index = this.personagens.findIndex((p) => p.id === id);
        if (index === -1)
            throw new Error("Personagem não encontrado.");
        this.personagens.splice(index, 1);
    }
    adicionarItemMagicoAoPersonagem(personagemId, item) {
        const personagem = this.buscarPersonagemPorId(personagemId);
        if (!personagem)
            throw new Error("Personagem não encontrado.");
        if (item.tipo === Types_1.TipoItem.Amuleto) {
            const temAmuleto = personagem.itensMagicos.some((i) => i.tipo === Types_1.TipoItem.Amuleto);
            if (temAmuleto)
                throw new Error("Personagem já possui um amuleto.");
        }
        personagem.itensMagicos.push(item);
    }
    listarItensMagicosPorPersonagem(id) {
        const personagem = this.buscarPersonagemPorId(id);
        if (!personagem)
            throw new Error("Personagem não encontrado.");
        return personagem.itensMagicos;
    }
    removerItemMagicoDoPersonagem(personagemId, itemId) {
        const personagem = this.buscarPersonagemPorId(personagemId);
        if (!personagem)
            throw new Error("Personagem não encontrado.");
        const index = personagem.itensMagicos.findIndex((i) => i.id === itemId);
        if (index === -1)
            throw new Error("Item mágico não encontrado.");
        personagem.itensMagicos.splice(index, 1);
    }
    buscarAmuletoDoPersonagem(id) {
        const personagem = this.buscarPersonagemPorId(id);
        if (!personagem)
            throw new Error("Personagem não encontrado.");
        return personagem.itensMagicos.find((i) => i.tipo === Types_1.TipoItem.Amuleto);
    }
}
exports.GerenciadorPersonagem = GerenciadorPersonagem;
