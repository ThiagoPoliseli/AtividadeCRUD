export enum Classe {
Guerreiro = "Guerreiro",
Mago = "Mago",
Arqueiro = "Arqueiro",
Ladino = "Ladino",
Bardo = "Bardo",
}

export enum TipoItem {
Arma = "Arma",
Armadura = "Armadura",
Amuleto = "Amuleto",
}

export interface Personagem {
id: string;
nome: string;
nomeAventureiro: string;
classe: Classe;
level: number;
itensMagicos: ItemMagico[];
forcaBase: number;
defesaBase: number;
getForcaTotal(): number;
getDefesaTotal(): number;
}

export interface ItemMagico {
id: string;
nome: string;
tipo: TipoItem;
forca: number;
defesa: number;
}