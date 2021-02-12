import { Meal } from '../../../types/meal.type';
import { RecipeModel } from '../recipe/model';
import { Service } from '../service';
import { MealModel } from './model';
import { validate } from './validate';

class MealService extends Service<Meal> {
    public async getById(id: string): Promise<Meal | null> {
        await this.connect();

        // This is needed for the populate.
        RecipeModel.modelName;

        const query = this.model.findById(id);

        query.populate('recipe');

        return query.exec();
    }

    public async getForPeriod(from: Date, to: Date): Promise<Meal[]> {
        await this.connect();

        // This is needed for the populate.
        RecipeModel.modelName;

        const query = this.model.find({
            date: {
                $gte: from,
                $lte: to,
            },
        });
        query.populate('recipe');
        query.sort({ date: 'asc' });

        return query.exec();
    }
}

export const mealService = new MealService(MealModel, validate);
