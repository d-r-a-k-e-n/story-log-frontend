import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ICreateEntrySelectProps } from "@/src/components/createEntrySelect/createEntrySelect.interface";

export function CreateEntrySelect({
  value,
  onChange,
  options,
  label,
}: ICreateEntrySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
