import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

import {
  IconCircleCheckFilled,
  IconCircle,
  IconEye,
  IconEyeClosed,
} from "@tabler/icons-react";
import { Button } from "./ui/button";

interface PasswordFieldProps<T extends FieldValues> {
  errorMsg?: {
    upper?: string;
    lower?: string;
    number?: string;
    special?: string;
    count?: string;
  };
  hasUpper?: boolean;
  hasLower?: boolean;
  hasNumber?: boolean;
  hasSpecial?: boolean;
  hasCount?: boolean;
  control: Control<T>;
  label: string;
  name: Path<T>;
  placeholder?: string;
  setShowMsg?: (s: boolean) => void;
  showMsg?: boolean;
  togglePasswordVisibility: boolean;
  setTogglePasswordVisibility: (s: boolean) => void;
}

export default function PasswordField<T extends FieldValues>({
  errorMsg,
  hasUpper,
  hasCount,
  hasLower,
  hasNumber,
  hasSpecial,
  control,
  name,
  label,
  placeholder,

  showMsg,
  setShowMsg,
  togglePasswordVisibility,
  setTogglePasswordVisibility,
}: PasswordFieldProps<T>) {
  const hideWhenAllValidationTrue =
    hasCount && hasLower && hasNumber && hasSpecial && hasUpper;
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="relative max-h-fit">
                <Input
                  onFocus={setShowMsg ? () => setShowMsg(true) : undefined}
                  type={togglePasswordVisibility ? "text" : "password"}
                  placeholder={placeholder}
                  className="pr-14"
                  {...field}
                />
                <EyeToggle
                  isVisible={togglePasswordVisibility}
                  toggleVisible={setTogglePasswordVisibility}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {showMsg && errorMsg && !hideWhenAllValidationTrue && (
        <ul>
          <PasswordRequirement text={errorMsg.upper} isValid={hasUpper} />
          <PasswordRequirement text={errorMsg.lower} isValid={hasLower} />
          <PasswordRequirement text={errorMsg.number} isValid={hasNumber} />
          <PasswordRequirement text={errorMsg.special} isValid={hasSpecial} />
          <PasswordRequirement text={errorMsg.count} isValid={hasCount} />
        </ul>
      )}
    </div>
  );
}

function PasswordRequirement({
  text,
  isValid,
}: {
  text?: string;
  isValid?: boolean;
}) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors ${
        isValid ? "text-neutral-300" : "text-neutral-500"
      }`}
    >
      {isValid ? <IconCircleCheckFilled size={18} /> : <IconCircle size={18} />}
      <span>{text}</span>
    </li>
  );
}

function EyeToggle({
  isVisible,
  toggleVisible,
}: {
  isVisible: boolean;
  toggleVisible: (s: boolean) => void;
}) {
  return (
    <Button
      type="button"
      variant={"ghost"}
      className="absolute right-1 top-1 h-8 w-8"
      size={"icon"}
      onClick={() => toggleVisible(!isVisible)}
    >
      {isVisible ? <IconEye /> : <IconEyeClosed />}
    </Button>
  );
}
