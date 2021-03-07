import * as React from 'react';
import { DeckOverviewProps, Scale } from '@types';
import { Grid } from '@material-ui/core';
import { CardFaceButton } from '../atoms/Buttons/CardFaceButton';
import { StarRatingTotal } from '../atoms/StarRatingTotal';

type PickedDeckProps = Pick<
  DeckOverviewProps,
  'title' | 'imgLink' | 'colour' | 'score' | 'totalVotes'
>;
type DeckOverviewCardProps = PickedDeckProps & {
  tileDimentions: Scale;
  onClick: () => void;
};

export const DeckOverviewCard: React.FC<DeckOverviewCardProps> = ({
  title,
  imgLink,
  colour,
  score,
  totalVotes,
  onClick,
  tileDimentions,
}) => {
  return (
    <div style={tileDimentions}>
      <CardFaceButton
        text={title}
        imgLink={imgLink}
        colour={colour}
        ratingProps={{ avgRating: score, totalVotes: totalVotes }}
        onClick={onClick}
      />
    </div>
  );
};

type DecksGridProps = {
  decks: DeckOverviewCardProps[];
};

export const DecksGrid: React.FC<DecksGridProps> = ({ decks }) => {
  const [tileDimentions, setTileDimentions] = React.useState<Scale>({
    height: 0,
    width: 0,
  });
  const sizeRef = React.useRef<HTMLDivElement>();

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (sizeRef?.current) {
        const offset = sizeRef.current.offsetWidth;
        const [w, h] = [Math.round(offset), Math.round(offset / 0.84)];
        setTileDimentions({ height: h, width: w });
      }
    }, 500);
    return () => clearTimeout(timer);
  });

  return (
    <Grid container spacing={4}>
      {decks.map((d, i) => (
        <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
          <DeckOverviewCard {...d} tileDimentions={tileDimentions} />
        </Grid>
      ))}

      <Grid item xs={6} sm={4} md={3} lg={2}>
        <div style={{ height: '90%', width: '90%' }} ref={sizeRef}></div>
      </Grid>
    </Grid>
  );
};
