import type { Details } from '../../app/types';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import { isFetchError } from '../../helpers/isFetchError';
import Button from '../UI/button/Button';
import Loader from '../UI/loader/Loader';
import getDetails from '../../api/getDetails';
import styles from './CardDetails.module.css';

function CardDetails(): ReactNode {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details') || '';
  const page = searchParams.get('page') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [cardDescription, setCardDescription] = useState<Details | null>(null);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      setIsLoading(true);
      const data = await getDetails(detailsId);
      if (!isFetchError(data)) {
        setCardDescription(data);
      }
      setIsLoading(false);
    };
    fetchDetails();
  }, [detailsId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!cardDescription) {
    return (
      <div className={styles.card_details}>
        <p className={styles.info}>Description not found 😭</p>
        <Button onClick={() => navigate(`?page=${page}`)}>Close</Button>
      </div>
    );
  }

  return (
    <div className={styles.card_details}>
      <h2>Details:</h2>
      <div className="wrapper column left">
        <p className={styles.details_item}>
          <strong>Name:</strong> {cardDescription.name}
        </p>
        <p className={styles.details_item}>
          <strong>Height:</strong> {cardDescription.height} m
        </p>
        <p className={styles.details_item}>
          <strong>Mass:</strong> {cardDescription.mass} kg
        </p>
        <p className={styles.details_item}>
          <strong>Gender:</strong> {cardDescription.gender}
        </p>
        <p className={styles.details_item}>
          <strong>Species:</strong> {cardDescription.species}
        </p>
        <p className={styles.details_item}>
          <strong>Skin Color:</strong> {cardDescription.skinColor}
        </p>
        <p className={styles.details_item}>
          <strong>Eye Color:</strong> {cardDescription.eyeColor}
        </p>
        {cardDescription.hairColor && (
          <p className={styles.details_item}>
            <strong>Hair Color:</strong> {cardDescription.hairColor}
          </p>
        )}
        <p className={styles.details_item}>
          <strong>Homeworld:</strong> {cardDescription.homeworld}
        </p>

        <p className={styles.details_item}>
          <strong>Born:</strong> {cardDescription.born} BBY
          {cardDescription.bornLocation &&
            `, (${cardDescription.bornLocation})`}
        </p>

        {(cardDescription.died || cardDescription.died === 0) && (
          <p className={styles.details_item}>
            <strong>Died:</strong> {cardDescription.died} BBY
            {cardDescription.diedLocation &&
              `, (${cardDescription.diedLocation})`}
          </p>
        )}

        {cardDescription.dateCreated && (
          <p className={styles.details_item}>
            <strong>Date Created:</strong> {cardDescription.dateCreated}
          </p>
        )}
        {cardDescription.dateDestroyed && (
          <p className={styles.details_item}>
            <strong>Date Destroyed:</strong> {cardDescription.dateDestroyed}{' '}
            {cardDescription.destroyedLocation &&
              `(${cardDescription.destroyedLocation})`}
          </p>
        )}

        {cardDescription.creator && (
          <p className={styles.details_item}>
            <strong>Creator:</strong> {cardDescription.creator}
          </p>
        )}
        {cardDescription.manufacturer && (
          <p className={styles.details_item}>
            <strong>Manufacturer:</strong> {cardDescription.manufacturer}
          </p>
        )}
        {cardDescription.model && (
          <p className={styles.details_item}>
            <strong>Model:</strong> {cardDescription.model}
          </p>
        )}
        {cardDescription.productLine && (
          <p className={styles.details_item}>
            <strong>Product Line:</strong> {cardDescription.productLine}
          </p>
        )}
        {cardDescription.class && (
          <p className={styles.details_item}>
            <strong>Class:</strong> {cardDescription.class}
          </p>
        )}
        {cardDescription.cybernetics && (
          <p className={styles.details_item}>
            <strong>Cybernetics:</strong> {cardDescription.cybernetics}
          </p>
        )}

        {cardDescription.sensorColor && (
          <p className={styles.details_item}>
            <strong>Sensor Color:</strong> {cardDescription.sensorColor}
          </p>
        )}
        {cardDescription.platingColor && (
          <p className={styles.details_item}>
            <strong>Plating Color:</strong> {cardDescription.platingColor}
          </p>
        )}

        {cardDescription.equipment && (
          <p className={styles.details_item}>
            <strong>Equipment:</strong>{' '}
            {Array.isArray(cardDescription.equipment)
              ? cardDescription.equipment.join(', ')
              : cardDescription.equipment}
          </p>
        )}

        {cardDescription.masters && (
          <p className={styles.details_item}>
            <strong>Masters:</strong>{' '}
            {Array.isArray(cardDescription.masters)
              ? cardDescription.masters.join(', ')
              : cardDescription.masters}
          </p>
        )}

        {cardDescription.apprentices?.length && (
          <p className={styles.details_item}>
            <strong>Apprentices:</strong>{' '}
            {cardDescription.apprentices.join(', ')}
          </p>
        )}

        {cardDescription.affiliations.length > 0 && (
          <p className={styles.details_item}>
            <strong>Affiliations:</strong>{' '}
            {cardDescription.affiliations.join(', ')}
          </p>
        )}
        {cardDescription.formerAffiliations.length > 0 && (
          <p className={styles.details_item}>
            <strong>Former Affiliations:</strong>{' '}
            {cardDescription.formerAffiliations.join(', ')}
          </p>
        )}

        <a
          href={cardDescription.wiki}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          More on Wookieepedia
        </a>
      </div>
      <Button onClick={() => navigate(`?page=${page}`)}>Close</Button>
    </div>
  );
}

export default CardDetails;
