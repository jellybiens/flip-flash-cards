import * as React from 'react';
import { CustomColours, FlipCardFieldValues } from '@types';
import { initialCardValues } from './FormikCreateDeckWrapper';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { FieldArray, useField } from 'formik';
import { TextField } from './TextField';
import { CircleButton, SquareButton } from '../atoms/Buttons';
import { ColourPicker } from './ColourPicker';
import { Hues } from '../themes';

const useStyles = makeStyles((theme: Theme) => {
  const colours = Object.keys(Hues).map((k: CustomColours) => k);
  let cardColours = {};
  colours.map((c) => {
    cardColours = Object.assign(cardColours, {
      [`cardColour-${c}`]: {
        backgroundColor: theme.palette[c].main,
        padding: theme.spacing(1),
        borderRadius: theme.spacing(10),
        marginBottom: theme.spacing(1),
      },
    });
  });

  return cardColours;
});

export const FlipCardSimpleInputArray: React.FC = () => {
  const cs = useStyles();

  const namespace = 'deckCards';
  const [{ value: deckCards }] = useField<FlipCardFieldValues[]>(namespace);
  const totalCards = deckCards.length;

  return (
    <>
      <FieldArray
        name="deckCards"
        render={(arrayHelpers) => (
          <Grid container spacing={0}>
            {deckCards.map((field, index) => (
              <Grid
                item
                xs={12}
                container
                spacing={0}
                key={index}
                className={cs[`cardColour-${field.front?.colour}`]}
              >
                <Grid item xs={2}>
                  <ColourPicker name={`${namespace}.${index}.front.colour`} />
                </Grid>
                <Grid item xs={4}>
                  <SimpleCardFaceInput
                    side="front"
                    name={`${namespace}.${index}`}
                    field={field}
                  />
                </Grid>
                <Grid item xs={4}>
                  <SimpleCardFaceInput
                    side="back"
                    name={`${namespace}.${index}`}
                    field={field}
                  />
                </Grid>
                <Grid item xs={2}>
                  {totalCards > 3 && (
                    <CircleButton
                      colour="red"
                      onClick={() => arrayHelpers.remove(index)}
                      iconName="remove"
                    />
                  )}
                </Grid>
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

type SimpleCardFaceInputProps = {
  name: string;
  side: 'front' | 'back';
  field: FlipCardFieldValues;
};

const SimpleCardFaceInput: React.FC<SimpleCardFaceInputProps> = ({
  name,
  side,
  field,
}) => {
  const [addImage, showAddImage] = React.useState(false);

  const label = side === 'front' ? 'Frontside Clue Text' : 'Backside Answer Text';

  return (
    <div>
      <CircleButton
        iconName="addImage"
        colour="green"
        onClick={() => showAddImage(!addImage)}
      />
      {addImage ? (
        <TextField
          colour={field.front?.colour}
          variant="outlined"
          label={label}
          name={`${name}.${side}.text`}
          InputProps={{ multiline: true, rows: 5 }}
          InputLabelProps={{ shrink: true }}
        />
      ) : (
        <TextField
          colour={field.front?.colour}
          variant="outlined"
          label={label}
          name={`${name}.${side}.text`}
          InputLabelProps={{ shrink: true }}
        />
      )}
    </div>
  );
};
