import type { Card } from '../../app/types';
import type { FC, ReactNode } from 'react';

import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useCheckListStore } from '../../store/useCheckList';
import CardItem from '../UI/CardItem/CardItem';

import Flyout from '../flyout/Flyout';

type CardFormProps = {
  cards: Card[];
};

const CardForm: FC<CardFormProps> = ({ cards }): ReactNode => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details') || '';
  const page = searchParams.get('page') || '';

  const { selectedCards, toggleCard } = useCheckListStore((state) => state);

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
                onClickCard={() => navigate(`?page=${page}&details=${card.id}`)}
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
        {detailsId && <Outlet />}
      </div>
      {selectedCards.length > 0 && <Flyout />}
    </>
  );
};

export default CardForm;
