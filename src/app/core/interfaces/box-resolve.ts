import { BoxSettings } from './box-settings';
import { BoxDependencies } from './box-dependencies';

export interface BoxResolve {
  boxData: BoxSettings;
  boxDependencies: BoxDependencies;
}
