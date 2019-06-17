// @flow

import type { EntityState } from '../../src/entity/reducer';

// TODO: I could potentially have a situation where the model for a link only
// has a `target` property and the entity reducer figures out the proper values
// of `points` when SETting the diagram. In this way I'd had a mix of
// declarative in the inital model and then switch to explicit after load.

const model: EntityState = [
  {
    id: '_start_',
    type: 'StartPoint',
    width: 40,
    height: 40,
    x: 95,
    y: 94,
    name: 'Home',
    linksTo: [
      {
        target: 'ja1lnkqu',
        edited: false,
        label: 'Commute',
        points: [
          {
            x: 112.5,
            y: 112.5,
          },
          {
            x: 475,
            y: 112.5,
          },
          {
            x: 475,
            y: 150,
          },
        ],
      },
      {
        target: 'ja1lnq90',
        edited: true,
        label: '  By  Uber',
        points: [
          {
            x: 112.5,
            y: 130,
          },
          {
            x: 112.5,
            y: 234.5,
          },
          {
            x: 212.5,
            y: 234.5,
          },
          {
            x: 212.5,
            y: 325,
          },
        ],
      },
    ],
  },
  {
    id: 'ja1lnkqu',
    type: 'Paragraph',
    width: 50,
    height: 50,
    x: 450,
    y: 150,
    name: 'Office',
    linksTo: [
      {
        target: 'ja1lnx2u',
        edited: false,
        points: [
          {
            x: 475,
            y: 175,
          },
          {
            x: 393.75,
            y: 175,
          },
          {
            x: 393.75,
            y: 212.5,
          },
          {
            x: 375,
            y: 212.5,
          },
        ],
      },
    ],
  },
  {
    id: 'ja1lnq90',
    type: 'Paragraph',
    width: 125,
    height: 75,
    x: 150,
    y: 325,
    name: 'Airport',
    
  },
  {
    id: 'ja1lnx2u',
    type: 'Paragraph',
    width: 125,
    height: 75,
    x: 250,
    y: 175,
    name: 'Shopping',
    linksTo: [
       {
           target: 'ja1lnx222u',
           edited: false,
           points: [
             {
          	   x: 320,
          	   y: 225,
             },
             {
          	   x: 320,
          	   y: 300,
             },
             {
          	   x: 350,
          	   y: 300,
             }
           ],
         },
       ],
  },

  {
    id: 'ja1lnx222u',
    type: 'EndPoint',
    width: 125,
    height: 55,
    x: 350,
    y: 275,
    name: 'Hit by a Car',
  },
  
];

export default model;
