export type Id = string | number;

export type Column = {
    id: Id;
    title: string
}

export type Issue = {
    id: Id;
    columnId: Id;
    title: string;
    user: string;
    body: string;
    login: string;
    comments: number;
    number: number;
    state: string;
  };

export type ActionType<Column> = {
    type: string;
    payload: Column[];
}

export type Action<Issue> = {
    type: string;
    payload: Issue[];
}

export type RootState = { column: Column[]; issue: Issue[]; };
