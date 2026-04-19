const Player = require('./Player');

describe('Player Model', () => {
  it('deve inicializar com os valores corretos e permitir edição via getters e setters', () => {
    const dataMock = new Date('2026-04-18');
    const player = new Player('uuid-123', 'KaizenMaster', dataMock);
    
    // Testando Getters
    expect(player.id).toBe('uuid-123');
    expect(player.username).toBe('KaizenMaster');
    expect(player.createdAt).toEqual(dataMock);

    // Testando Setters
    player.username = 'ToyotaEngineer';
    expect(player.username).toBe('ToyotaEngineer');
  });
});
