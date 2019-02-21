import { ExperimentProgramArgs } from '../../args/ProgramArgs';
import { Store } from '../../../utils/store/Store';
import { Step } from '../Step';
import { experimentationBuildLibraryStep } from './steps/experimentationBuildLibraryStep';
import { experimentationCreateEpidStep } from './steps/experimentationCreateEpidStep';
import { experimentationOpenBrowserStep } from './steps/experimentationOpenBrowserStep';
import { experimentationPrepareMetadataStep } from './steps/experimentationPrepareMetadataStep';
import { experimentationRunNgrok } from './steps/experimentationRunNgrok';
import { experimentationRunServerStep } from './steps/experimentationRunServerStep';

export interface ExperimentationState {
  ngrokUrl:string|null;
}

const defaultState:ExperimentationState = {
  ngrokUrl: null,
};

export function getExperimentationCommandSteps(args:ExperimentProgramArgs):Step[] {
  const store:Store<ExperimentationState> = new Store(defaultState);

  return [
    experimentationBuildLibraryStep(args),
    experimentationRunNgrok(args, store),
    experimentationCreateEpidStep(args),
    experimentationPrepareMetadataStep(args),
    experimentationRunServerStep(args, store),
    experimentationOpenBrowserStep(args, store),
  ];
}
