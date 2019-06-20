import Paragraph from './Paragraph/component';
import ParagraphIcon from './Paragraph/icon';
import BranchingLogic from './BranchingLogic/component';
import BranchingLogicIcon from './BranchingLogic/icon';

const config = {
  entityTypes: {
    Paragraph: {
      width: 90,
      height: 60,
    },
    BranchingLogic: {
    	width: 50,
        height: 50,
    }
  },
  gridSize: 25,
};

const customEntities = {
  Paragraph: {
    component: Paragraph,
    icon: ParagraphIcon,
  },
  BranchingLogic: {
	    component: BranchingLogic,
	    icon: BranchingLogicIcon,
	  },
};

export { config, customEntities };
