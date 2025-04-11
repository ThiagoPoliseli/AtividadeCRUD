import { ItemMagico, TipoItem } from "./Types";
export { TipoItem }


export class ItemMagicoImpl implements ItemMagico {
id: string;
nome: string;
tipo: TipoItem;
forca: number;
defesa: number;

constructor(id: string, nome: string, tipo: TipoItem, forca: number, defesa: number) {
    if (forca < 0 || defesa < 0 || forca > 10 || defesa > 10) {
    throw new Error("Força e Defesa devem estar entre 0 e 10.");
    }
    if (forca === 0 && defesa === 0) {
    throw new Error("Item não pode ter Força e Defesa iguais a 0.");
    }
    if (tipo === TipoItem.Arma && defesa !== 0) {
    throw new Error("Arma deve ter Defesa igual a 0.");
    }
    if (tipo === TipoItem.Armadura && forca !== 0) {
    throw new Error("Armadura deve ter Força igual a 0.");
    }
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.forca = forca;
    this.defesa = defesa;
}
}

export class GerenciadorItemMagico {
private itens: ItemMagico[] = [];

cadastrarItemMagico(id: string, nome: string, tipo: TipoItem, forca: number, defesa: number): ItemMagico {
    const item = new ItemMagicoImpl(id, nome, tipo, forca, defesa);
    this.itens.push(item);
    return item;
    }

    listarItensMagicos(): ItemMagico[] {
    return this.itens;
    }

    buscarItemMagicoPorId(id: string): ItemMagico | undefined {
    return this.itens.find((i) => i.id === id);
}
}