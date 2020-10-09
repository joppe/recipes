import { use } from 'ast-types';
import { connect } from 'mongoose';

import { options, url } from '../../../config/mongoose';
import { UserModel } from './model';

export async function exists(email: string, id?: string): Promise<boolean> {
    await connect(url, options);

    const user = await UserModel.findOne({ email });

    return user !== null && (id === undefined || user._id !== id);
}
