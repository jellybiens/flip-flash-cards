import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from '@material-ui/core';
import { Container } from '../helpers';
import { DecksGrid } from '@ui-kit';

const title = 'DeckOverviewCard';

const Story = () => {
  const decks = generateDecks();

  return (
    <Container title={title}>
      <Box p={3}>
        <DecksGrid decks={decks} />
      </Box>
    </Container>
  );
};

storiesOf('Core/Molecules', module).add(title, Story);

import Chance from 'chance';
const chance = Chance(42);

const generateDecks = () => {
  const pictures = [
    'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2019%2F11%2Fspongebob-squarepants-spinoff-squidward-netflix-series-info-1-1.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png',
    'https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg',
    'https://variety.com/wp-content/uploads/2019/06/spongebob-battle-remaster.png',
    'https://static01.nyt.com/images/2018/05/03/us/03spongebob_xp/03spongebob_xp-videoSixteenByNineJumbo1600.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/SpongeBob_SquarePants_characters_promo.png/370px-SpongeBob_SquarePants_characters_promo.png',
    'https://www.indiewire.com/wp-content/uploads/2021/02/Spongebob-Squarepants-Movie-Sponge-on-the-Run-scaled-1.jpg',
    'https://wwwimage-secure.cbsstatic.com/thumbnails/photos/w1920-q80/marquee/1037578/sbsp_sp_hero_landscape.jpg',
    'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2009/7/24/1248436779217/SpongeBob-SquarePants-10t-001.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=bbf7d527bcff3b90026362120b35cbb9',
    'https://pbs.twimg.com/profile_images/1210618202457292802/lt9KD2lt.jpg',
    'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2019%2F11%2Fspongebob-squarepants-spinoff-squidward-netflix-series-info-1-1.jpg?w=960&cbr=1&q=90&fit=max',
    'https://cdn.vox-cdn.com/thumbor/v0YLemmUuU_HCYOWmZrgwQ-CQQw=/1400x1050/filters:format(png)/cdn.vox-cdn.com/assets/941068/Spongebob_Squarepants.png',
    'https://i.ytimg.com/vi/Bxpdqc84hQI/maxresdefault.jpg',
  ];
  const colours = [
    'white',
    'black',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'cyan',
    'violet',
    'turquoise',
    'purple',
  ];
  const decks = [];
  for (let i = 0; i < 20; i++) {
    decks.push({
      title: chance.word(),
      imgLink: chance.pickset(pictures, 1)[0],
      colour: chance.pickset(colours, 1)[0],
      score: chance.floating({ fixed: 4, min: 0, max: 5 }),
      totalVotes: chance.integer({ min: 0, max: 20 }),
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return decks;
};
