
declare module "Types" {
  export interface AppState {
    value: number;
    isAuthorization: boolean;
    repos: string[];
    user: string;
    commits: CommitInfo[];
    isLoad: boolean;
    page: number;
    totalCount: null | number
  }
  export interface Action {
    type: string;
    pyload: any;
  }
  export interface CommitInfo {
    owner: string,
    ownerURL: string,
    repo: string,
    repoURL: string,
    dateTime: string,
    commitMessage: string,
    hash: string,
  }
}