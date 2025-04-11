import { Classe, Personagem, ItemMagico, TipoItem } from "./Types";

export class PersonagemImpl implements Personagem {
    id: string;
    nome: string;
    nomeAventureiro: string;
    classe: Classe;
    level: number;
    itensMagicos: ItemMagico[];
    forcaBase: number;
    defesaBase: number;

    constructor(
        id: string,
        nome: string,
        nomeAventureiro: string,
        classe: Classe,
        level: number,
        forcaBase: number,
        defesaBase: number
    ) {
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

    getForcaTotal(): number {
        return this.forcaBase + this.itensMagicos.reduce((sum, item) => sum + item.forca, 0);
    } 
    getDefesaTotal(): number {
        return this.defesaBase + this.itensMagicos.reduce((sum, item) => sum + item.defesa, 0);
    }
}

export class GerenciadorPersonagem {
    private personagens: Personagem[] = [];

    cadastrarPersonagem(
        id: string,
        nome: string,
        nomeAventureiro: string,
        classe: Classe,
        level: number,
        forcaBase: number,
        defesaBase: number
    ): Personagem {
    const personagem = new PersonagemImpl(id, nome, nomeAventureiro, classe, level, forcaBase, defesaBase);
        this.personagens.push(personagem);
        return personagem;
    }

    listarPersonagens(): Personagem[] {
        return this.personagens;
    }

    buscarPersonagemPorId(id: string): Personagem | undefined {
        return this.personagens.find((p) => p.id === id);
    }

    atualizarNomeAventureiro(id: string, novoNome: string): void {
        const personagem = this.buscarPersonagemPorId(id);
        if (!personagem) throw new Error("Personagem não encontrado.");
        personagem.nomeAventureiro = novoNome;
    }

    removerPersonagem(id: string): void {
    const index = this.personagens.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Personagem não encontrado.");
    this.personagens.splice(index, 1);
    }

    adicionarItemMagicoAoPersonagem(personagemId: string, item: ItemMagico): void {
        const personagem = this.buscarPersonagemPorId(personagemId);
        if (!personagem) throw new Error("Personagem não encontrado.");
        if (item.tipo === TipoItem.Amuleto) {
        const temAmuleto = personagem.itensMagicos.some((i) => i.tipo === TipoItem.Amuleto);
        if (temAmuleto) throw new Error("Personagem já possui um amuleto.");
    }
    personagem.itensMagicos.push(item);
    }

    listarItensMagicosPorPersonagem(id: string): ItemMagico[] {
        const personagem = this.buscarPersonagemPorId(id);
        if (!personagem) throw new Error("Personagem não encontrado.");
        return personagem.itensMagicos;
    }

    removerItemMagicoDoPersonagem(personagemId: string, itemId: string): void {
        const personagem = this.buscarPersonagemPorId(personagemId);
        if (!personagem) throw new Error("Personagem não encontrado.");
        const index = personagem.itensMagicos.findIndex((i) => i.id === itemId);
        if (index === -1) throw new Error("Item mágico não encontrado.");
        personagem.itensMagicos.splice(index, 1);
    }

    buscarAmuletoDoPersonagem(id: string): ItemMagico | undefined {
        const personagem = this.buscarPersonagemPorId(id);
        if (!personagem) throw new Error("Personagem não encontrado.");
        return personagem.itensMagicos.find((i) => i.tipo === TipoItem.Amuleto);
    }
}