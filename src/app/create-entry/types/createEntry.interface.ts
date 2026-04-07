export interface ICreateEntryMutation {
  createEntry: {
    id: number;
    title: string;
    description?: string | null;
  };
}
