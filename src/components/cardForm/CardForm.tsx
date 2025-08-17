'use client';

import type { Card } from '../../app/types';

import { useCheckListStore } from '../../store/useCheckList';
import { useRouter, useSearchParams } from 'next/navigation';

import Flyout from '../flyout/Flyout';
import CardItem from '../cardItem/CardItem';
import CardDetails from '../CardDetails/CardDetails';

type CardFormProps = {
  cards: Card[];
};

const CardForm: React.FC<CardFormProps> = ({ cards }: CardFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const detailsId = searchParams?.get('details') || '';

  const { selectedCards, toggleCard } = useCheckListStore((state) => state);

  const handleClickCard = (cardId: string): void => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set('details', cardId);
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <hr />
      <div className="wrapper grow">
        <div className="card-list wrapper" data-testid="card-form">
          {cards.length ? (
            cards.map((card) => (
              <CardItem
                card={card}
                key={card.id}
                onClickCard={() => handleClickCard(card.id)}
                onToggleCheckbox={(event) => {
                  event.stopPropagation();
                  toggleCard(card);
                }}
                isChecked={selectedCards.some(
                  (existingCard) => existingCard.id === card.id
                )}
              />
            ))
          ) : (
            <p className="info-message">Nothing found 😭</p>
          )}
        </div>
        {detailsId && <CardDetails />}
      </div>
      {selectedCards.length > 0 && <Flyout />}
    </>
  );
};

export default CardForm;
