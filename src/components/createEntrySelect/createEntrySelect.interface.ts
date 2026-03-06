export interface ICreateEntrySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: number; name: string }[];
  label: string;
}
