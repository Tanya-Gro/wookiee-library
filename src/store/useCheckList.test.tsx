import type { Card } from '../app/types';

import { useCheckListStore } from './useCheckList';
import { mockCard } from '../test-utils/mocks/cards';

describe('useCheckListStore', () => {
  const card: Card = mockCard[0];

  it('initial state is empty', () => {
    expect(useCheckListStore.getState().selectedCards).toEqual([]);
  });

  it('adds a card on toggleCard', () => {
    useCheckListStore.getState().toggleCard(card);
    expect(useCheckListStore.getState().selectedCards).toContainEqual(card);
  });

  it('removes a card on toggleCard if already selected', () => {
    useCheckListStore.getState().toggleCard(card);
    expect(useCheckListStore.getState().selectedCards).not.toContainEqual(card);
  });

  it('clears all selectedCards on deleteCards', () => {
    useCheckListStore.getState().toggleCard(card);
    expect(useCheckListStore.getState().selectedCards.length).toBe(1);

    useCheckListStore.getState().deleteCards();
    expect(useCheckListStore.getState().selectedCards).toEqual([]);
  });
});
