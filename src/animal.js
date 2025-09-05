class animal{
    #nome;
    #especie;
    #brinquedos = [];
    constructor(nome, especie, brinquedos){
        this.#nome = nome;
        this.#especie = especie;
        this.#brinquedos = brinquedos;
    }

    get nome(){
        return this.#nome;
    }

    get especie(){
        return this.#especie;
    }

    get brinquedos(){
        return this.#brinquedos;
    }
}

export { animal as animal};