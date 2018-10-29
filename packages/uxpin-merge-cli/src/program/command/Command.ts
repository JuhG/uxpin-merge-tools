export enum Command {
  DUMP = 'dump',
  EXPERIMENT = 'experiment',
  PUSH = 'push',
  SERVER = 'server',
  SUMMARY = 'summary',
}

export const DEFAULT_COMMAND:Command = Command.EXPERIMENT;
