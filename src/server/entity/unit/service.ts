import { Unit } from '../../../types/unit.type';
import { Service } from '../service';
import { UnitModel } from './model';
import { validate } from './validate';

export const unitService = new Service<Unit>(UnitModel, validate);
