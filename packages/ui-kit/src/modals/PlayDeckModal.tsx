import { ButtonBase, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { DeckOverviewProps } from '@types';
import clsx from 'clsx';
import * as React from 'react';
import { SquareButton } from '../atoms/Buttons';
import { Modal, ModalProps } from '../atoms/Modal';
import { StarRatingTotal } from '../atoms/StarRatingTotal';
import { FlipCardColours, Icons } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardColours(theme),
    root: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 3,
      padding: 10,
    },
    closeButton: {
      height: 20,
      width: 20,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    itemWrapper: {
      height: 'fit-content',
      width: 'fit-content',
      borderColor: 'inherit',
      margin: 'auto',
    },
    image: {
      margin: 'auto',
      height: 'calc(100% - 4px)',
      width: 'calc(auto - 4px)',
      borderRadius: 10,
      borderStyle: 'solid',
      borderColor: 'inherit',
    },
    imgWrapper: {
      display: 'flex',
      height: '100%',
      width: '80%',
      margin: 'auto',
      borderColor: 'inherit',
    },
  };
});

type PlayDeckModalProps = ModalProps & Omit<DeckOverviewProps, 'subject'>;

const Clear = Icons.cross;

export const PlayDeckModal: React.FC<PlayDeckModalProps> = ({
  deckId,
  title,
  imgLink,
  colour,
  cards,
  score,
  votes,
  onClose,
  ...props
}) => {
  const cs = useStyles();
  return (
    <Modal key={deckId} {...props}>
      <div className={clsx(cs.root, cs[`${colour}Card`])}>
        <Grid
          container
          style={{ height: '100%', position: 'relative', borderColor: 'inherit' }}
        >
          <ButtonBase className={cs.closeButton} onClick={() => onClose()}>
            <Clear className={cs.closeButton} />
          </ButtonBase>
          <Grid item xs={12} style={{ height: '10%' }}>
            <div className={cs.itemWrapper}>
              <Typography variant="h4">{title}</Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ height: '50%', display: 'flex', borderColor: 'inherit' }}
          >
            <div className={cs.imgWrapper}>
              <img src={imgLink} className={cs.image} />
            </div>
          </Grid>
          <Grid item xs={6} style={{ height: '10%', display: 'flex' }}>
            <div className={cs.itemWrapper}>
              <Typography>Total cards: {cards.length}</Typography>
            </div>
          </Grid>
          <Grid item xs={6} style={{ height: '10%', display: 'flex' }}>
            <div className={cs.itemWrapper}>
              <StarRatingTotal avgRating={score} totalVotes={votes} />
            </div>
          </Grid>
          <Grid item xs={12} style={{ height: '30%', display: 'flex' }}>
            <div className={cs.itemWrapper}>
              <SquareButton colour={colour === 'cyan' ? 'green' : 'cyan'} size="large">
                Play
              </SquareButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};
