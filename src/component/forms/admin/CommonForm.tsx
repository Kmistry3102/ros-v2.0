import TextInput from "@/component/ui/form/fields/TextInput";
import MobileNumberInput from "@/component/ui/form/fields/MobileNumberInput";
import { validateNonEmpty } from "@/lib/validationUtils";
import { validateEmail } from "@/lib/validationUtils";
import { FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form";

interface Props {
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    trigger: UseFormTrigger<any>;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
    reset: UseFormReset<any>;
}

export const CommonForm = ({
    register,
    errors,
    trigger,
    setValue,
    watch,
    reset,
}: Props) => {

    return (
        <>
            {/* First Name */}
            <TextInput
                name="firstName"
                register={register}
                errors={errors}
                label="First Name"
                validation={{
                    required: "First Name is required",
                    validate: validateNonEmpty("First Name"),
                }}
                trigger={trigger}
                watch={watch}
            />

            {/* Last Name */}
            <TextInput
                name="lastName"
                register={register}
                errors={errors}
                label="Last Name"
                validation={{
                    required: "Last Name is required",
                    validate: validateNonEmpty("Last Name"),
                }}
                trigger={trigger}
                watch={watch}
            />

            {/* Email */}
            <TextInput
                name="email"
                type="email"
                register={register}
                errors={errors}
                label="Email ID"
                validation={{
                    required: "Email ID is required",
                    validate: validateEmail,
                }}
                trigger={trigger}
                watch={watch}
            />

            {/* Mobile Number */}
            <MobileNumberInput
                name="phoneNumber"
                countryCodeName="countryCode"
                countryIsoName="countryCodeName"
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                label="Mobile number"
            />
        </>
    );
}