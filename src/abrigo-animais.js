import { animal } from "./animal"; 

class AbrigoAnimais {
  #animaisAbrigo = new Map([
    ['Rex', new animal("Rex", "cão", ["RATO", "BOLA"])],
    ['Mimi', new animal("Mimi", "gato", ["BOLA", "LASER"])],
    ['Fofo', new animal("Fofo", "gato", ["BOLA", "RATO", "LASER"])],
    ['Zero', new animal("Zero", "gato", ["RATO", "BOLA"])],
    ['Bola', new animal("Bola", "cão", ["CAIXA", "NOVELO"])],
    ['Bebe', new animal("Bebe", "cão", ["LASER", "RATO", "BOLA"])],
    ['Loco',  new animal("Loco", "jabuti", ["SKATE", "RATO"])]
  ]);

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let brinquedosP1 = brinquedosPessoa1.split(',');
    let brinquedosP2 = brinquedosPessoa2.split(',');
    let animaisSolicitados = new Map(
      ordemAnimais.split(',').map(animal => [animal, 'abrigo'])
    );

    let p1 = [];
    let p2 = [];
    for(const [animal] of animaisSolicitados){
      if(!this.#animaisAbrigo.has(animal)){
        return { erro: 'Animal inválido', lista: null };
      }

      let pet = this.#animaisAbrigo.get(animal);

      if(this.#podeAdotar(brinquedosP1, pet) && !this.#podeAdotar(brinquedosP2, pet)){
        if(pet.nome == 'Loco' && p1.length != 0){
          this.#adotando(pet, p1, 'pessoa 1', animaisSolicitados, brinquedosP1);
        }else if(pet.nome != 'Loco'){
          this.#adotando(pet, p1, 'pessoa 1', animaisSolicitados, brinquedosP1);
        }
      }

      if(!this.#podeAdotar(brinquedosP1, pet) && this.#podeAdotar(brinquedosP2, pet)){
        if(pet.nome == 'Loco' && p2.length != 0){
          this.#adotando(pet, p2, 'pessoa 2', animaisSolicitados, brinquedosP1);
        }else if(pet.nome != 'Loco'){
          this.#adotando(pet, p2, 'pessoa 2', animaisSolicitados, brinquedosP1);
        }
      }
    }

    let resultado = [];
    for(const [animal] of animaisSolicitados){
      resultado.push(`${animal} - ${animaisSolicitados.get(animal)}`);
    }
    resultado.sort();

    console.log(resultado);
    return {erro: null, lista: resultado};
  }

  #podeAdotar(brinquedosPessoa, animal) {
    let brinquedosAnimal = animal.brinquedos;
    let posicoes = [];

    brinquedosAnimal.map(
      brinquedo => posicoes.push(brinquedosPessoa.indexOf(brinquedo))
    );

    if (posicoes.some(posicao => posicao == -1)) {
      return false;
    }

    if(animal.nome == 'Loco'){
      return true;
    }

    for (let i = 0; i < posicoes.length - 1; i++) {
      if (posicoes.at(i) > posicoes.at(i + 1)) {
        return false;
      }
    }

    return true;
  }

  #adotando(pet, pessoa, pessoaNome, animais, brinquedosPessoa){
    let brinquedosPet = pet.brinquedos;
    if(pessoa.length >= 3){
      return;
    }

    if (pet.especie != 'gato') {
      pessoa.push(pet);
      animais.set(pet.nome, pessoaNome);
      return;
    }

    if (pessoa.length == 0) {
      for (const brinquedo of brinquedosPet) {
        let index = brinquedosPessoa.indexOf(brinquedo);
        brinquedosPessoa.splice(index, 1);
      }

      pessoa.push(pet);
      animais.set(pet.nome, pessoaNome);
    } else {
      for (const animal of pessoa) {
        let brinquedosAnimal = animal.brinquedos; 
        for(const brinquedo of brinquedosAnimal){
          if(brinquedosPet.some(brinquedoPet => brinquedoPet == brinquedo)){
            return;
          }
        }
      }

      for (const brinquedo of brinquedosPet) {
        let index = brinquedosPessoa.indexOf(brinquedo);
        brinquedosPessoa.splice(index, 1);
      }

      pessoa.push(pet);
      animais.set(pet.nome, pessoaNome);
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
