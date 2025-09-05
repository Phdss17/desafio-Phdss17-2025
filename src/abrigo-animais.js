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

    for(const [animal] of animaisSolicitados){
      if(!this.#animaisAbrigo.has(animal)){
        return { erro: 'Animal inválido', lista: null };
      }
    }

    for (const [animal] of animaisSolicitados){
      let brinquedosAnimal = this.#animaisAbrigo.get(animal).brinquedos;
      if(this.#podeAdotar(brinquedosP1, brinquedosAnimal) && !this.#podeAdotar(brinquedosP2, brinquedosAnimal)){
        animaisSolicitados[animal] = 'pessoa 1';
      }
      if(!this.#podeAdotar(brinquedosP1, brinquedosAnimal) && this.#podeAdotar(brinquedosP2, brinquedosAnimal)){
        animaisSolicitados[animal] = 'pessoa 2';
      }
    }

    let resultado = [];
    for(const [animal] of animaisSolicitados){
      resultado.push(`${animal} - ${animaisSolicitados.get(animal)}`);
    }
    resultado.sort();

    return { erro: null, lista : resultado};
  }

  #podeAdotar(brinquedosPessoa, brinquedosAnimal){
      let posicoes = [];

      brinquedosAnimal.map(
        brinquedo => posicoes.push(brinquedosPessoa.indexOf(brinquedo))
      );

      if(posicoes.some(posicao => posicao == -1)){
        return false;
      }

      for(let i = 0; i < posicoes.length-1; i++){
        if(posicoes.at(i) > posicoes.at(i+1)){
          return false;
        }
      }
      
      return true;
  }

}

export { AbrigoAnimais as AbrigoAnimais };
