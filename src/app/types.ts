
declare module "Types" {
  export interface AppState {
    value: number;
  }
  export interface Action {
    type: string;
    pyload: any;
  }
}