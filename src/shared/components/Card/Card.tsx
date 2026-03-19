import React from 'react';
import Image from 'next/image';
import Text from 'components/Text';
import cn from 'classnames';
import styles from 'components/Card/Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  actionSlot,
  onClick,
}) => {
  return (
    <div className={cn(styles.card, className)} onClick={onClick}>
      <div className={styles.imgPlacehold}>
        <Image
          src={image}
          alt="товар"
          className={styles.imgCard}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 320px, 348px"
        />
      </div>
      <div className={styles.cardBody}>
        {captionSlot && (
          <Text tag="p" className={styles.cardCaptionSlot} maxLines={2}>
            {captionSlot}
          </Text>
        )}
        <Text tag="h3" className={styles.cardTitle} maxLines={2}>
          {title}
        </Text>
        <Text tag="p" className={styles.cardSubtitle} maxLines={3}>
          {subtitle}
        </Text>
      </div>
      {(contentSlot || actionSlot) && (
        <div className={styles.cardFooter}>
          {contentSlot && (
            <div className={styles.cardContentSlot}>
              <Text tag="h3" className={styles.cardContentSlot} maxLines={1}>
                {contentSlot}
              </Text>
            </div>
          )}
          {actionSlot && <div className={styles.cardActionSlot}>{actionSlot}</div>}
        </div>
      )}
    </div>
  );
};

export default Card;
