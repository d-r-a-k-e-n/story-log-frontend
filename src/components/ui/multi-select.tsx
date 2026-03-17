"use client";

import { useState, useRef, useMemo } from "react";
import { CheckIcon, XIcon } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr));
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  disabled,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selected = useMemo(() => uniq(value), [value]);

  const availableOptions = useMemo(() => {
    const selectedSet = new Set(selected);
    return options.filter((o) => !selectedSet.has(o));
  }, [options, selected]);

  const remove = (item: string) => {
    onChange(selected.filter((v) => v !== item));
  };

  const add = (item: string) => {
    if (selected.includes(item)) return;
    onChange([...selected, item]);
    setInputValue("");
    setOpen(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const filteredOptions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return availableOptions;
    return availableOptions.filter((opt) => opt.toLowerCase().includes(q));
  }, [availableOptions, inputValue]);

  return (
    <Popover
      open={open}
      onOpenChange={(v) => !disabled && setOpen(v)}
      modal={false}
    >
      <PopoverTrigger asChild>
        <div
          data-slot="multi-select-trigger"
          className={cn(
            "flex min-h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
            className,
          )}
          aria-disabled={disabled ? "true" : "false"}
          onClick={() => {
            if (disabled) return;
            setOpen(true);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        >
          <div className="flex flex-1 flex-wrap gap-1.5">
            {selected.map((item) => (
              <Badge
                key={item}
                className="gap-1 pr-1 data-[disabled=true]:opacity-50"
                data-disabled={disabled ? "true" : "false"}
              >
                <span className="truncate">{item}</span>
                <button
                  type="button"
                  className={cn(
                    "inline-flex size-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none",
                    disabled && "pointer-events-none",
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (disabled) return;
                    remove(item);
                    requestAnimationFrame(() => inputRef.current?.focus());
                  }}
                  aria-label={`Remove ${item}`}
                >
                  <XIcon className="size-3.5" />
                </button>
              </Badge>
            ))}
            <Input
              ref={inputRef}
              value={inputValue}
              onFocus={() => {
                if (disabled) return;
                setOpen(true);
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (!open) setOpen(true);
              }}
              onKeyDown={(e) => {
                if (disabled) return;
                if (
                  e.key === "Backspace" &&
                  inputValue.length === 0 &&
                  selected.length > 0
                ) {
                  e.preventDefault();
                  onChange(selected.slice(0, -1));
                  return;
                }
                if (e.key === "Escape") {
                  setOpen(false);
                }
              }}
              className={cn(
                "h-7 w-[120px] min-w-[120px] flex-1 border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                selected.length === 0 && "w-full",
              )}
              placeholder={selected.length === 0 ? placeholder : ""}
              disabled={disabled}
            />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>No results.</CommandEmpty>
            ) : null}
            {filteredOptions.map((opt) => (
              <CommandItem
                key={opt}
                value={opt}
                onSelect={() => add(opt)}
                disabled={disabled}
              >
                <span className="truncate">{opt}</span>
                <CheckIcon className="size-4 opacity-0" />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
