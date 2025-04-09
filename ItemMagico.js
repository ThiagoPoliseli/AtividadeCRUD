"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GerenciadorItemMagico = exports.ItemMagicoImpl = exports.TipoItem = void 0;
const Types_1 = require("./Types");
Object.defineProperty(exports, "TipoItem", { enumerable: true, get: function () { return Types_1.TipoItem; } });
class ItemMagicoImpl {
    constructor(id, nome, tipo, forca, defesa) {
        if (forca < 0 || defesa < 0 || forca > 10 || defesa > 10) {
            throw new Error("Força e Defesa devem estar entre 0 e 10.");
        }
        if (forca === 0 && defesa === 0) {
            throw new Error("Item não pode ter Força e Defesa iguais a 0.");
        }
        if (tipo === Types_1.TipoItem.Arma && defesa !== 0) {
            throw new Error("Arma deve ter Defesa igual a 0.");
        }
        if (tipo === Types_1.TipoItem.Armadura && forca !== 0) {
            throw new Error("Armadura deve ter Força igual a 0.");
        }
        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.forca = forca;
        this.defesa = defesa;
    }
}
exports.ItemMagicoImpl = ItemMagicoImpl;
class GerenciadorItemMagico {
    constructor() {
        this.itens = [];
    }
    cadastrarItemMagico(id, nome, tipo, forca, defesa) {
        const item = new ItemMagicoImpl(id, nome, tipo, forca, defesa);
        this.itens.push(item);
        return item;
    }
    listarItensMagicos() {
        return this.itens;
    }
    buscarItemMagicoPorId(id) {
        return this.itens.find((i) => i.id === id);
    }
}
exports.GerenciadorItemMagico = GerenciadorItemMagico;
