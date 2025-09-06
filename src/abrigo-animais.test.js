import { AbrigoAnimais } from "./abrigo-animais";
describe('Abrigo de Animais', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2); 
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');
    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Gatos não dividem brinquedos (começando com gato)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER',
      'RATO,BOLA', 
      'Mimi,Fofo'
    );
  
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Gatos não dividem brinquedos (terminando com gato)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'RATO,BOLA', 
      'Rex,Zero'
    );
  
    expect(resultado.lista[0]).toBe('Rex - pessoa 2');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco só quer companhia (Loco acompanhado)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'SKATE,RATO,BOLA', 
      'Rex,Loco'
    );
  
    expect(resultado.lista[0]).toBe('Loco - pessoa 2');
    expect(resultado.lista[1]).toBe('Rex - pessoa 2');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco só quer companhia (Loco desacompanhado)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'SKATE,RATO,BOLA', 
      'Loco'
    );
  
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Calma, não leve todos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'LASER,SKATE,RATO,BOLA,CAIXA,NOVELO', 
      'Rex,Loco,Bola,Bebe'
    );
  
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Bola - pessoa 2');
    expect(resultado.lista[2]).toBe('Loco - pessoa 2');
    expect(resultado.lista[3]).toBe('Rex - pessoa 2');
    expect(resultado.erro).toBeFalsy();
  });

  test('Trata minusculas nos brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'LaSeR,sKAtE,RAtO,BolA,CAixA,noVelO', 
      'Rex,Loco,Bola,Bebe'
    );
  
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Bola - pessoa 2');
    expect(resultado.lista[2]).toBe('Loco - pessoa 2');
    expect(resultado.lista[3]).toBe('Rex - pessoa 2');
    expect(resultado.erro).toBeFalsy();
  });

  test('Ninguém adota ninguém', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,NOVELO', 
      'NOVELO,CAIXA', 
      'Rex'           
    );
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });

  test('Animal repetido na entrada deve ser ignorado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'LASER,CAIXA', 
      'Rex,Rex'
    );
    expect(resultado.lista).toHaveLength(1);
  });

  test('Então não é de ninguém (os dois podem, então fica no abrigo)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 
      'RATO,bola',
      'Rex'
    );
    expect(resultado.lista[0]).toBe('Rex - abrigo');
  });
});