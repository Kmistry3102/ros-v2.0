import  { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { FiX } from "react-icons/fi";

interface DateAndInputProps<T extends Record<string, any>> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  isSearchable?: boolean;
  isDisabled?: boolean;
  className?: string;
  minDate?: Date;
  showTimeSelect?: boolean;
  dateFormat?: string;
  filterTime?: (time: Date) => boolean;
  dayClassName?: (date: Date) => string;
  timeClassName?: (time: Date) => string;
  calendarClassName?: string;
  popperClassName?: string;
}

export default function DateTimeInput<T extends Record<string, any>>({
  name,
  control,
  errors,
  placeholder,
  label,
  rules,
  isDisabled = false,
  className,
  minDate,
  showTimeSelect = true,
  dateFormat = "dd-MM-yyyy h:mm aa",
  filterTime,
  dayClassName,
  timeClassName,
  calendarClassName,
  popperClassName,
}: DateAndInputProps<T>) {
  const { clearErrors, watch, trigger } = useFormContext<T>();
  const [isFocused, setIsFocused] = useState(false);

  const fieldValue = watch(name);

  const hasValue = Boolean(fieldValue);

  const isFloated = isFocused || hasValue;
  const showError = Boolean((errors as any)[name]);

  const defaultFilterTime = useMemo(
    () => (time: Date) => {
      const now = new Date();
      const selectedDate = new Date(time);

      if (selectedDate.toDateString() === now.toDateString()) {
        return selectedDate.getTime() > now.getTime();
      }

      return true;
    },
    []
  );

  const defaultDayClassName = useMemo(
    () => (date: Date) => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const selectedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      if (selectedDate < today) {
        return "text-gray-300 cursor-not-allowed opacity-50";
      }
      return "";
    },
    []
  );

  const defaultTimeClassName = useMemo(
    () => (time: Date) => {
      const now = new Date();
      const selectedDate = new Date(time);

      if (selectedDate.toDateString() === now.toDateString()) {
        if (selectedDate.getTime() <= now.getTime()) {
          return "text-gray-300 cursor-not-allowed opacity-50";
        }
      }
      return "";
    },
    []
  );

  const resolvedFilterTime = filterTime ?? defaultFilterTime;
  const resolvedDayClassName = dayClassName ?? defaultDayClassName;
  const resolvedTimeClassName = timeClassName ?? defaultTimeClassName;

  return (
    <div className={`relative w-full ${className || ""}`}>
      <Controller
        name={name}
        control={control}
        rules={rules ?? undefined}
        render={({ field }) => (
          <div className="relative">
            {/* Floating Label */}
            {label && (
              <label
                htmlFor={String(name)}
                title={label}
                className={`absolute left-4 font-normal text-[#575757] pointer-events-none transition-all duration-200 ease-in-out pr-8 line-clamp-1 ${
                  isFloated ? "top-2 text-xs" : "top-4 text-base"
                }`}
              >
                {label}
              </label>
            )}

            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: any) => {
                field.onChange(date);
                // Trigger validation immediately when date changes
                void trigger(name);
                if (date) clearErrors(name);
              }}
              showTimeSelect={showTimeSelect}
              minDate={minDate ?? new Date()}
              filterTime={resolvedFilterTime}
              dateFormat={dateFormat}
              placeholderText={placeholder || ""}
              className={`w-full rounded-lg border bg-transparent px-4 pt-5 pb-2 text-base font-light text-neutral-900 placeholder-neutral-400 outline-none transition-colors duration-200 focus:ring-0 ${
                showError
                  ? "border-red-500 focus:border-red-500"
                  : "border-neutral-300 focus:border-black"
              } ${isDisabled ? "cursor-not-allowed bg-neutral-100 text-neutral-500" : ""}`}
              dayClassName={resolvedDayClassName}
              timeClassName={resolvedTimeClassName}
              calendarClassName={calendarClassName ?? "date-time-calendar"}
              popperClassName={popperClassName ?? "date-time-popper"}
              disabled={isDisabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur();
              }}
            />

            {/* Clear button */}
            {hasValue && !isDisabled && (
              <button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  field.onChange(null);
                  // Trigger validation to show errors if field is required
                  await trigger(name);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
                title="Clear selection"
              >
                <FiX className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg text-lg p-0.5 transition-colors" />
              </button>
            )}
          </div>
        )}
      />

      {(errors as any)[name] && (
        <p className="mt-1 text-sm text-red-500">
          {(((errors as any)[name]?.message) as string) || ""}
        </p>
      )}
    </div>
  );
}
