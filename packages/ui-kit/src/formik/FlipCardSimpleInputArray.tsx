import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { initialCardValues } from './FormikCreateDeckWrapper';
import { Grid, makeStyles } from '@material-ui/core';
import { FieldArray, useField } from 'formik';
import { CircleButton, SquareButton } from '../atoms/Buttons';
import { FrontBackViewOption } from './FlipCardInput';
import { CardFaceInput, CardFaceViewOption } from './CardFaceInput';
import { useWindowSize } from '../helpers';

const useStyles = makeStyles(() => ({
  cardGridContainer: {
    position: 'relative',
  },
  cardContainer: {
    margin: 'auto',
  },
  removeButtonWrapper: {
    display: 'flex',
  },
  removeButton: {
    margin: 'auto 0',
  },
}));

export const FlipCardSimpleInputArray: React.FC = () => {
  const cs = useStyles();

  const cardFaceContainerRef = React.useRef<HTMLDivElement>();
  const { width: windowInnerWidth } = useWindowSize();
  const [cardSizing, setCardSizing] = React.useState({ height: 200, width: 200 });
  React.useEffect(() => {
    const w = cardFaceContainerRef?.current?.offsetWidth * 0.8;
    setCardSizing({ height: w, width: w });
  }, [windowInnerWidth]);

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
              <Grid container item justify="center" key={i}>
                <Grid item container spacing={2} xs={totalCards > 3 ? 11 : 12}>
                  <Grid
                    item
                    xs={6}
                    className={cs.cardGridContainer}
                    ref={cardFaceContainerRef}
                  >
                    <div className={cs.cardContainer} style={cardSizing}>
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
                  <Grid item xs={6} className={cs.cardGridContainer}>
                    <div className={cs.cardContainer} style={cardSizing}>
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
                </Grid>
                {totalCards > 3 && (
                  <Grid item xs={1} className={cs.removeButtonWrapper}>
                    <CircleButton
                      className={cs.removeButton}
                      colour="red"
                      onClick={() => arrayHelpers.remove(i)}
                      iconName="remove"
                    />
                  </Grid>
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
