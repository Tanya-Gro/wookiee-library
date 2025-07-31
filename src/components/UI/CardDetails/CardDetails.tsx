import type { Details } from '../../../app/types';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import { isFetchError } from '../../../helpers/isFetchError';
import getDetails from '../../../api/getDetails';
import styles from './CardDetails.module.css';
import Loader from '../loader/Loader';
import Button from '../button/Button';

function CardDetails(): ReactNode {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const detailsId = searchParams.get('details') || '';
  const page = searchParams.get('page') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardDescription, setCardDescription] = useState<Details | null>(null);

  useEffect(() => {
    const fetchDetails = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await getDetails(detailsId);
        if (!isFetchError(data)) {
          setCardDescription(data);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(String(error));
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [detailsId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!cardDescription) {
    return <p className="info-message">{errorMessage} 😭</p>;
  }

  return (
    <div className={styles.card_details}>
      <h2>Details:</h2>
      <div className="wrapper column left">
        <p>
          <strong>Name:</strong> {cardDescription.name}
        </p>
        <p>
          <strong>Height:</strong> {cardDescription.height} m
        </p>
        <p>
          <strong>Mass:</strong> {cardDescription.mass} kg
        </p>
        <p>
          <strong>Gender:</strong> {cardDescription.gender}
        </p>
        <p>
          <strong>Species:</strong> {cardDescription.species}
        </p>
        <p>
          <strong>Skin Color:</strong> {cardDescription.skinColor}
        </p>
        <p>
          <strong>Eye Color:</strong> {cardDescription.eyeColor}
        </p>
        {cardDescription.hairColor && (
          <p>
            <strong>Hair Color:</strong> {cardDescription.hairColor}
          </p>
        )}
        <p>
          <strong>Homeworld:</strong> {cardDescription.homeworld}
        </p>

        <p>
          <strong>Born:</strong> {cardDescription.born} BBY
          {cardDescription.bornLocation &&
            `, (${cardDescription.bornLocation})`}
        </p>

        {(cardDescription.died || cardDescription.died === 0) && (
          <p>
            <strong>Died:</strong> {cardDescription.died} BBY
            {cardDescription.diedLocation &&
              `, (${cardDescription.diedLocation})`}
          </p>
        )}

        {cardDescription.dateCreated && (
          <p>
            <strong>Date Created:</strong> {cardDescription.dateCreated}
          </p>
        )}
        {cardDescription.dateDestroyed && (
          <p>
            <strong>Date Destroyed:</strong> {cardDescription.dateDestroyed}{' '}
            {cardDescription.destroyedLocation &&
              `(${cardDescription.destroyedLocation})`}
          </p>
        )}

        {cardDescription.creator && (
          <p>
            <strong>Creator:</strong> {cardDescription.creator}
          </p>
        )}
        {cardDescription.manufacturer && (
          <p>
            <strong>Manufacturer:</strong> {cardDescription.manufacturer}
          </p>
        )}
        {cardDescription.model && (
          <p>
            <strong>Model:</strong> {cardDescription.model}
          </p>
        )}
        {cardDescription.productLine && (
          <p>
            <strong>Product Line:</strong> {cardDescription.productLine}
          </p>
        )}
        {cardDescription.class && (
          <p>
            <strong>Class:</strong> {cardDescription.class}
          </p>
        )}
        {cardDescription.cybernetics && (
          <p>
            <strong>Cybernetics:</strong> {cardDescription.cybernetics}
          </p>
        )}

        {cardDescription.sensorColor && (
          <p>
            <strong>Sensor Color:</strong> {cardDescription.sensorColor}
          </p>
        )}
        {cardDescription.platingColor && (
          <p>
            <strong>Plating Color:</strong> {cardDescription.platingColor}
          </p>
        )}

        {cardDescription.equipment && (
          <p>
            <strong>Equipment:</strong>{' '}
            {Array.isArray(cardDescription.equipment)
              ? cardDescription.equipment.join(', ')
              : cardDescription.equipment}
          </p>
        )}

        {cardDescription.masters && (
          <p>
            <strong>Masters:</strong>{' '}
            {Array.isArray(cardDescription.masters)
              ? cardDescription.masters.join(', ')
              : cardDescription.masters}
          </p>
        )}

        {cardDescription.apprentices?.length && (
          <p>
            <strong>Apprentices:</strong>{' '}
            {cardDescription.apprentices.join(', ')}
          </p>
        )}

        {cardDescription.affiliations.length > 0 && (
          <p>
            <strong>Affiliations:</strong>{' '}
            {cardDescription.affiliations.join(', ')}
          </p>
        )}
        {cardDescription.formerAffiliations.length > 0 && (
          <p>
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
