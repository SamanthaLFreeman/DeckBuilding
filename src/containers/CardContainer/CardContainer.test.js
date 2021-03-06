import React from 'react';
import { shallow } from 'enzyme';
import { CardContainer, mapStateToProps } from './CardContainer';

describe('CardContainer', () => {
  let wrapper;
  const mockGames = [
    {
      name: 'Catan',
      id: 42
    }
  ]
  const mockFavorites = [
    {
      name: 'Takenoko',
      id: 41
    }
  ]
  const mockOwned = [
    {
      name: 'Dead of Winter',
      id: 43
    }
  ]
  const toggleFavoriteMock = jest.fn();
  const toggleOwnedMock = jest.fn();
  const mockState = {
    games: mockGames,
    categories: [{ id: 1, name: 'Zombies' }],
    ownedGames: mockOwned,
    favorites: mockFavorites
  }

  beforeEach(() => {
    wrapper = shallow(<CardContainer 
    games={mockGames}
    favorites={mockFavorites}
    ownedGames={mockOwned}
    toggleFavorite={toggleFavoriteMock}
    toggleOwned={toggleOwnedMock}
    type='games' />)
  });

  it('should match the snapshot with the data passed through with type games', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with the data passed through with type favorites', () => {
    let wrapper = shallow(<CardContainer
      games={mockGames}
      favorites={mockFavorites}
      ownedGames={mockOwned}
      toggleFavorite={toggleFavoriteMock}
      toggleOwned={toggleOwnedMock}
      type='favorites' />)
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with the data passed through with type ownedGames', () => {
    let wrapper = shallow(<CardContainer
      games={mockGames}
      favorites={mockFavorites}
      ownedGames={mockOwned}
      toggleFavorite={toggleFavoriteMock}
      toggleOwned={toggleOwnedMock}
      type='ownedGames' />)
    expect(wrapper).toMatchSnapshot();
  });

  it('mapStateToProps should grab the props it needs', () => {
    const expected = {
      games: mockGames,
      favorites: mockFavorites,
      ownedGames: mockOwned
    }

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps).toEqual(expected);
  });
});