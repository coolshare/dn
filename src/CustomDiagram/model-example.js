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
    width: 100,
    height: 50,
    x: 95,
    y: 94,
    name: 'StartPoint'
  }
  
];

export default model;
