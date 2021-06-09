import { ReactiveVar, makeVar } from '@apollo/client';

import { IUser } from 'src/requests/auth';

export const userVar: ReactiveVar<IUser|undefined> = makeVar<IUser|undefined>(undefined);

export const hideNavigationVar: ReactiveVar<boolean> = makeVar<boolean>(false);

export const isDrawerOpenVar: ReactiveVar<boolean> = makeVar<boolean>(false);
