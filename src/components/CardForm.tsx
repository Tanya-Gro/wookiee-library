import type { Card } from '../app/types';
import type { FC, ReactNode } from 'react';

import CardItem from './UI/CardItem/CardItem';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';

type CardFormProps = {
  cards: Card[];
};

const CardForm: FC<CardFormProps> = ({ cards }): ReactNode => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details') || '';
  const page = searchParams.get('page') || '';

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
                onClick={() => navigate(`?page=${page}&details=${card.id}`)}
              />
            ))
          ) : (
            <p className="info-message">Nothing found 😭</p>
          )}
        </div>

        {detailsId && <Outlet />}
      </div>
    </>
  );
};

export default CardForm;
