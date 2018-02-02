declare var API_HOST: string;

declare type ThunkAction = ( dispatch: Dispatch, getState: Function ) => any;
declare type PromiseAction = Promise<Object>;
