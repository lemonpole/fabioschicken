declare var API_HOST: string;

declare type GetState = () => Object;
declare type ThunkAction = ( dispatch: Dispatch, getState: GetState ) => any;
declare type PromiseAction = Promise<Object>;
