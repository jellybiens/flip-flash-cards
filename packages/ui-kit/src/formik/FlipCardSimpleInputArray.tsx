import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { initialCardValues } from './FormikCreateDeckWrapper';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { FieldArray, useField } from 'formik';
import { CircleButton, SquareButton } from '../atoms/Buttons';
import { FrontBackViewOption } from './FlipCardInput';
import { CardFaceInput, CardFaceViewOption } from './CardFaceInput';
import { FlipCardSizing } from '../definitions';

const useStyles = makeStyles((theme: Theme) => ({
  cardGridContainer: {
    position: 'relative',
    ...FlipCardSizing(theme),
  },
  removeButtonWrapper: {
    position: 'absolute',
    height: `calc(100% - ${theme.spacing(2)}px)`,
    width: `calc(100% - ${theme.spacing(2)}px)`,
    display: 'flex',
  },
  removeButton: {
    marginRight: theme.spacing(2), //TODO: needs parent offset width or hight to change this value
  },
}));

export const FlipCardSimpleInputArray: React.FC = () => {
  const cs = useStyles();

  const [inputFacesView, setInputFacesView] = React.useState<{
    [key: string]: FrontBackViewOption;
  }>({});

  const handleSetFacesViewOption = (
    key: string,
    view: CardFaceViewOption,
    face: 'front' | 'back',
  ) => {
    const views = (() => {
      if (face === 'front') {
        return {
          front: view,
          back: inputFacesView[key]?.back || 'menu',
        };
      } else if (face === 'back') {
        return {
          back: view,
          front: inputFacesView[key]?.front || 'menu',
        };
      }
    })();
    const allViews = { ...inputFacesView };
    allViews[key] = views;
    setInputFacesView(allViews);
  };

  const namespace = 'deckCards';
  const [{ value: deckCards }] = useField<FlipCardFieldValues[]>(namespace);
  const totalCards = deckCards.length;

  return (
    <>
      <FieldArray
        name="deckCards"
        render={(arrayHelpers) => (
          <Grid container spacing={2} justify="center">
            {deckCards.map((field, i) => (
              <Grid
                item
                container
                spacing={2}
                key={i}
                justify="center"
                style={{ position: 'relative', width: 'fit-content' }}
              >
                <Grid item>
                  <div className={cs.cardGridContainer}>
                    <CardFaceInput
                      front
                      name={`deckCards.${i}.front`}
                      cardIndex={i}
                      cardFaceView={inputFacesView[field._id]?.front || 'menu'}
                      setCardFaceView={(view) =>
                        handleSetFacesViewOption(field._id, view, 'front')
                      }
                    />
                  </div>
                </Grid>
                <Grid item>
                  <div className={cs.cardGridContainer}>
                    <CardFaceInput
                      back
                      name={`deckCards.${i}.front`}
                      cardIndex={i}
                      cardFaceView={inputFacesView[field._id]?.back || 'menu'}
                      setCardFaceView={(view) =>
                        handleSetFacesViewOption(field._id, view, 'back')
                      }
                    />
                  </div>
                </Grid>
                {totalCards > 3 && (
                  <div className={cs.removeButtonWrapper}>
                    <CircleButton
                      className={cs.removeButton}
                      colour="red"
                      onClick={() => arrayHelpers.remove(i)}
                      iconName="remove"
                    />
                  </div>
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <SquareButton
                colour="cyan"
                onClick={() => arrayHelpers.push(initialCardValues())}
              >
                Add New Card
              </SquareButton>
            </Grid>
          </Grid>
        )}
      />
    </>
  );
};
