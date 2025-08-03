import type { Card } from '../app/types';
import type { FC, ReactNode } from 'react';

import CardItem from './UI/CardItem/CardItem';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useCheckListStore } from '../store/useCheckList';
import Button from './UI/button/Button';

type CardFormProps = {
  cards: Card[];
};

const CardForm: FC<CardFormProps> = ({ cards }): ReactNode => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details') || '';
  const page = searchParams.get('page') || '';

  const selectedCardIds = useCheckListStore((state) => state.selectedIds);
  const toggleCheckedCard = useCheckListStore((state) => state.toggleId);
  const deleteCheckedCard = useCheckListStore((state) => state.deleteIds);
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
                  toggleCheckedCard(card.id);
                }}
                isChecked={selectedCardIds.includes(card.id)}
              />
            ))
          ) : (
            <p className="info-message">Nothing found 😭</p>
          )}
        </div>
        {detailsId && <Outlet />}
      </div>
      {selectedCardIds.length > 0 ? (
        <>
          <hr />
          <div className="wrapper">
            <span className="info-message">
              Selected {selectedCardIds.length} cards
            </span>
            <Button onClick={() => deleteCheckedCard()}>Unselect All</Button>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default CardForm;
