import { ReactiveVar, makeVar } from "@apollo/client";

import { IUser } from "src/requests/auth";

const userVar: ReactiveVar<IUser|undefined> = makeVar<IUser|undefined>(undefined);

export default userVar;
