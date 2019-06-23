import Paragraph from './Paragraph/component';
import ParagraphIcon from './Paragraph/icon';
import LinkToOthers from './LinkToOthers/component';
import BranchingLogic from './BranchingLogic/component';
import BranchingLogicIcon from './BranchingLogic/icon';
import LinkToOthersIcon from './LinkToOthers/icon';


const config = {
  entityTypes: {
    Paragraph: {
      width: 90,
      height: 60,
    },
    BranchingLogic: {
    	width: 50,
        height: 50,
    },
    LinkToOthers: {
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
  LinkToOthers: {
	    component: LinkToOthers,
	    icon: LinkToOthersIcon,
	  },
  BranchingLogic: {
	    component: BranchingLogic,
	    icon: BranchingLogicIcon,
	  },
};

export { config, customEntities };
