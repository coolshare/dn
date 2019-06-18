import Paragraph from './Paragraph/component';
import ParagraphIcon from './Paragraph/icon';
import StartPoint from './StartPoint/component';
import StartIcon from './StartPoint/icon';
import EndPoint from './EndPoint/component';
import EndIcon from './EndPoint/icon';
import BranchingLogic from './BranchingLogic/component';
import BranchingLogicIcon from './BranchingLogic/icon';

const config = {
  entityTypes: {
    Paragraph: {
      width: 125,
      height: 75,
    },
    StartPoint: {
      width: 50,
      height: 50,
    },
    EndPoint: {
    	width: 50,
        height: 50,
    }
    ,
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
  StartPoint: {
    component: StartPoint,
    icon: StartIcon,
  },
  EndPoint: {
	    component: EndPoint,
	    icon: EndIcon,
	  },
  BranchingLogic: {
	    component: BranchingLogic,
	    icon: BranchingLogicIcon,
	  },
};

export { config, customEntities };
