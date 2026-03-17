import FormModal from "@/component/ui/form/FormModal";
import { CommonForm } from "./CommonForm";
import { useForm } from "react-hook-form";
import { CommonFormData } from "@/feature/commonapi.types";
import Button from "@/component/ui/Button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store/rootReducer";
import { addUserRequest, resetAddUser } from "@/feature/admin/users/users.slice";
import { useEffect } from "react";

export default function AddUser({ onClose, isOpen }: { onClose: () => void, isOpen: boolean }) {

    const methods = useForm<CommonFormData>(
        {
            defaultValues: {
                countryCode: "+91",
                countryCodeName: "IN",
            },
        }
    );
    const { register, formState: { errors }, trigger, watch, setValue, reset } = methods;
    const dispatch = useAppDispatch();
    const { userStatus, userError } = useAppSelector((state: RootState) => state.users);

    const onSubmit = (data: CommonFormData) => {
        try {
            const reqBody = {
                ...data,
                countryCodeName: data.countryCodeName || "IN",
                slug: "shivalik_group"
            }
            dispatch(addUserRequest(reqBody));
        } catch (error) {
            console.error("Failed to add user: ", error);
        }
    }

    useEffect(() => {
        if (userStatus === "success") {
            onClose();
            reset();
            dispatch(resetAddUser());
        } else if (userStatus === "failed") {
            console.error("Failed to add user: ", userError);
        }
    }, [userStatus, userError, dispatch, reset, onClose]);

    return (
        <FormModal
            onSubmit={onSubmit}
            methods={methods}
            mode="popup"
            isOpen={isOpen}
            onClose={onClose}
            label="Add User"
            className="w-full max-w-lg"
        >
            <CommonForm
                register={register}
                errors={errors}
                trigger={trigger}
                setValue={setValue}
                watch={watch}
                reset={reset}
            />
            {userError && <p className="text-red-500 text-sm">{userError}</p>}
            <Button
                type="submit"
                variant="filled"
                className="w-full"
                hasHref={false}
                label="Add User"
                isFormButton
                disabled={userStatus === "loading"}
            />
        </FormModal>
    );
}