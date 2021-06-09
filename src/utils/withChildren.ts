import { ReactNode } from 'react';

type WithChildren<T = Record<string, unknown>> = T & { children?: ReactNode };

export default WithChildren;
