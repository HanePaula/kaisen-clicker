const LeaderboardEntry = require('./LeaderboardEntry');

describe('LeaderboardEntry Model', () => {
  it('deve inicializar e encapsular propriedades protegidas', () => {
    const entry = new LeaderboardEntry(
      'entry-1', 
      'player-123', 
      5000, 
      95.5
    );
    
    expect(entry.id).toBe('entry-1');
    expect(entry.playerId).toBe('player-123');
    expect(entry.score).toBe(5000);
    expect(entry.efficiency).toBe(95.5);
    expect(entry.updatedAt).toBeInstanceOf(Date);

    // Testando modificadores
    entry.score = 6000;
    entry.efficiency = 98.2;
    
    expect(entry.score).toBe(6000);
    expect(entry.efficiency).toBe(98.2);
  });
});
