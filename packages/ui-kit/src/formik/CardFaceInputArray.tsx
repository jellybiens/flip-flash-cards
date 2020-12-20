import * as React from 'react';
import { makeStyles, Theme, Grid } from '@material-ui/core';
import { CardFaceInput } from './CardFaceInput';
import { CircleButton } from '../atoms/Buttons';
import { FlipCardFieldValues } from '@types';
import { FieldArray, Form, Formik } from 'formik';
import { FlipCardSizing } from '../definitions';
import { CardFaceButton } from '../atoms/CardFaceButton';

const useStyles = makeStyles((theme: Theme) => {
  return {
    cardFace: { ...FlipCardSizing(theme) },
    backButton: { margin: '-50px -30px 0', transform: 'scale(0.8)', zIndex: 100 },
    binButton: { position: 'absolute', top: 5, right: 5 },
  };
});

const initialCardValues: FlipCardFieldValues = {
  front: {
    text: '',
    imgLink: '',
    imgFile: null,
  },
  back: {
    text: '',
    imgLink: '',
    imgFile: null,
    answer: '',
  },
};

export const CardFaceInputArray: React.FC = () => {
  const cs = useStyles();

  return (
    <Formik
      initialValues={{ flipCards: [initialCardValues] }}
      onSubmit={(values) => Promise.resolve(console.log(JSON.stringify(values, null, 2)))}
      render={({ values }) => (
        <Form>
          <Grid container spacing={4}>
            <FieldArray
              name="flipCards"
              render={(arrayHelpers) => (
                <>
                  {values.flipCards && values.flipCards.length > 0 ? (
                    <>
                      {values.flipCards.map((flipCard, i) => (
                        <React.Fragment key={i}>
                          <Grid item xs={5}>
                            <div className={cs.cardFace}>
                              <CardFaceInput name={`flipCards.${i}.front`} />
                            </div>
                          </Grid>
                          <Grid item xs={5}>
                            <div className={cs.cardFace}>
                              <CardFaceInput name={`flipCards.${i}.back`} />
                            </div>
                          </Grid>
                          <Grid item xs={1}>
                            <CircleButton
                              iconName="bin"
                              colour="red"
                              onClick={() => arrayHelpers.remove(i)}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <CircleButton
                              iconName="add"
                              colour="blue"
                              onClick={() => arrayHelpers.push(initialCardValues)}
                            />
                          </Grid>
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <CardFaceButton
                        imgLink="https://image.flaticon.com/icons/png/512/60/60807.png"
                        onClick={() => arrayHelpers.push(initialCardValues)}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <button type="submit">Submit</button>
                  </Grid>
                </>
              )}
            />
          </Grid>
        </Form>
      )}
    />
  );
};
