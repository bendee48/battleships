import Ship from 'ship';

// Ship Class
describe('Ship Class', () => {
  const battleship = new Ship('battleship', 4);
  const submarine = new Ship('submarine', 3);
  const patrolBoat = new Ship('patrolBoat', 2);

  
  describe('.name', () => {
    it('returns the name of a battleship', () => {
      expect(battleship.name).toBe('battleship');
    })
    
    it('returns the name of a submarine', () => {
      expect(submarine.name).toBe('submarine');
    })
  })
  
  describe('.length', () => {
    it('returns the length of a battleship', () => {
      expect(battleship.length).toBe(4);
    })
    
    it('returns the length of a submarine', () => {
      expect(submarine.length).toBe(3);
    });
    
    it('returns the length of a patrol boat', () => {
      expect(patrolBoat.length).toBe(2);
    });
  });
  
  describe('.hits', () => {
    it('returns number of hits to ship', () => {
      expect(battleship.hits).toBe(0);
    });
  })
  
  describe('Ship.shipInfo()', () => {
    it('returns information on the available ship types', () => {
      expect(Ship.shipInfo()[0][0]).toBe('carrier');
      expect(Ship.shipInfo()[0][1]).toBe(5);
    })
  });

  describe('hit()', () => {
    it('increases the number of hits a ship has suffered by one', () => {
      const ship = new Ship();
      ship.hit();
      expect(ship.hits).toBe(1);
    })

    it('increases the total no. of hits after multiple blows', () => {
      const ship = new Ship();
      for (let i = 0; i < 3; i++) ship.hit();
      expect(ship.hits).toBe(3);
    })
  });

  describe('isSunk()', () => {
    it('returns true if ship has been hit more times than it\'s length', () => {
      const submarine = new Ship('submarine', 3);
      for (let i = 0; i < 3; i++) submarine.hit();
      expect(submarine.isSunk()).toBe(true);
    })

    it('returns false if ship hasn\'t been hit more times than it\'s length', () => {
      const submarine = new Ship('submarine', 3);
      for (let i = 0; i < 2; i++) submarine.hit();
      expect(submarine.isSunk()).toBe(false);
    })
  });

  describe('addCell()', () => {
    it('adds a cell to the list of cells the ship currently occupies', () => {
      const destroyer = new Ship('destroyer', 3);
      const cell = '<div class="cell destroyer taken" data-coordinate="A1" data-ship-name="destroyer"></div>';
      const expected = [cell]
      destroyer.addCell(cell);
      expect(destroyer.cells).toEqual(expect.arrayContaining(expected));
    });

    it('adds two coordinates to the list of cells the ship currently occupies', () => {
      const destroyer = new Ship('destroyer', 3);
      const cell1 = '<div class="cell destroyer" data-coordinate="A1"></div>';
      const cell2 = '<div class="cell destroyer" data-coordinate="B1"></div>';
      const expected = [cell1, cell2]
      destroyer.addCell(cell1);
      destroyer.addCell(cell2);
      expect(destroyer.cells).toEqual(expect.arrayContaining(expected));
    });
  })
});