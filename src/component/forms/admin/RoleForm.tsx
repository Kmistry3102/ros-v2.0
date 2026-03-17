import TextInput from "@/component/ui/form/fields/TextInput";
import FormModal from "@/component/ui/form/FormModal";
import { assignRoleRequest, createRoleRequest, resetAssignRole, resetCreateRole, resetSearchDirectoryUsers, searchDirectoryUsersRequest } from "@/feature/admin/users/users.slice";
import { validateNonEmpty } from "@/lib/validationUtils";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store/rootReducer";
import Button from "@/component/ui/Button";
import SelectInput from "@/component/ui/form/fields/SelectInput";
import { useGetAllRolesList } from "@/hooks/admin/getAllRolesList";
import { DirectoryUser } from "@/feature/admin/users/users.types";

interface CreateRoleRequest {
    title: string
    slug: string
}

interface AssignRoleRequest {
    role: string
    userId: string
    slug: string
}

export default function RoleForm({ onClose, isOpen, isCreateRoleForm }: { onClose: () => void, isOpen: boolean, isCreateRoleForm: boolean }) {

    const methods = useForm<{ title: string, role: string, userSearch: string, userId: string }>({
        defaultValues: {
            title: "",
            role: "",
            userSearch: "",
            userId: "",
        },
    });

    const {
        register,
        formState: { errors },
        trigger,
        watch,
        reset,
        control,
        setValue,
        setError,
    } = methods;

    const dispatch = useAppDispatch();
    const { roleStatus, roleError, directorySearchList, directorySearchListStatus, assignRoleStatus, assignRoleError } = useAppSelector((state: RootState) => state.users);

    const [userSearchValue, selectedRole, selectedUserId] = watch([
        "userSearch",
        "role",
        "userId",
    ]);

    const { rolesListOptions } = useGetAllRolesList();

    useEffect(() => {
        if (!userSearchValue || userSearchValue.length < 3) return;
        const timeout = setTimeout(async () => {
            try {
                dispatch(searchDirectoryUsersRequest({
                    page: 1,
                    search: userSearchValue,
                    roleName: selectedRole,
                }));
            } catch (error) {
                console.error("Failed to search users: ", error);
            }
        }, 400);
        return () => clearTimeout(timeout);
    }, [userSearchValue, selectedRole, dispatch]);

    const onSubmit = (data: { title: string, role: string, userSearch: string, userId: string }) => {
        try {

            if (isCreateRoleForm) {
                const reqBody: CreateRoleRequest = {
                    title: data.title,
                    slug: "shivalik_group",
                };

                dispatch(createRoleRequest(reqBody));
            } else {
                if (!data.userId) {
                    setError("userSearch", {
                        type: "manual",
                        message: "Please select a user from the list",
                    });
                    return;
                }

                const reqBody: AssignRoleRequest = {
                    role: data.role,
                    slug: "shivalik_group",
                    userId: data.userId,
                };
                dispatch(assignRoleRequest(reqBody));
            }
        } catch (error) {
            console.error("Failed to create role: ", error);
        }
    }

    useEffect(() => {
        if (roleStatus === "success" || assignRoleStatus === "success") {
            onClose();
            reset();
            dispatch(resetCreateRole());
            dispatch(resetAssignRole());
        }

        if (roleStatus === "failed") {
            console.error("Create role failed:", roleError);
        }

        if (assignRoleStatus === "failed") {
            console.error("Assign role failed:", assignRoleError);
        }

    }, [
        roleStatus,
        assignRoleStatus,
        roleError,
        assignRoleError,
        dispatch,
        reset,
        onClose
    ]);


    return (
        <FormModal
            onSubmit={onSubmit}
            methods={methods}
            mode="popup"
            isOpen={isOpen}
            onClose={onClose}
            label={isCreateRoleForm ? "Create New Role" : "Assign Role"}
            className="w-full max-w-lg"
        >
            {isCreateRoleForm ? (
                <>
                    <TextInput
                        name="title"
                        register={register}
                        errors={errors}
                        label="Role Title"
                        validation={{
                            required: "Role Title is required",
                            validate: validateNonEmpty("Role Title"),
                        }}
                        trigger={trigger}
                        watch={watch}
                    />
                    {roleError && <p className="text-red-500 text-sm">{roleError}</p>}
                    <Button
                        type="submit"
                        variant="filled"
                        className="w-full"
                        hasHref={false}
                        label="Create Role"
                        isFormButton
                        disabled={roleStatus === "loading"}
                    />
                </>
            ) : (
                <>
                    <SelectInput
                        name="role"
                        control={control}
                        errors={errors}
                        options={rolesListOptions}
                        label="Select Role"
                        rules={{ required: "Please select a Role" }}
                    />

                    {/* Search + results layout */}
                    <div className="mt-4 flex flex-col gap-4">
                        <div className="flex-1">
                            <TextInput
                                name="userSearch"
                                register={register}
                                errors={errors}
                                label="Search User"
                                trigger={trigger}
                                watch={watch}
                                validation={{
                                    required: "Please enter a valid user search",
                                    validate: validateNonEmpty("User Search"),
                                }}
                            />
                        </div>

                        {!selectedUserId &&
                            directorySearchListStatus === "success" &&
                            directorySearchList.length > 0 && (
                                <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50/60 p-3 max-h-56 overflow-y-auto space-y-2">
                                    <h3 className="text-sm font-semibold text-gray-700 px-1">
                                        Matching Users
                                    </h3>
                                    <ul className="space-y-2">
                                        {directorySearchList.map((user: DirectoryUser) => {
                                            const id = user.userId ?? user._id ?? "";
                                            const isSelected = selectedUserId === id;
                                            return (
                                                <li
                                                    key={id ?? `${user.firstName}-${user.phoneNumber}`}
                                                    className={`rounded-lg border px-3 py-2 shadow-sm transition cursor-pointer bg-white ${isSelected
                                                        ? "border-black ring-1 ring-black/40"
                                                        : "border-gray-200 hover:border-black hover:shadow-md"
                                                        }`}
                                                    onClick={() => {
                                                        setValue("userId", id);
                                                        setValue("userSearch", `${user.firstName} ${user.lastName}`);
                                                        // Clear list after selection
                                                        dispatch(resetSearchDirectoryUsers());
                                                    }}
                                                >
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {user.firstName} {user.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        <span className="font-medium">Phone:</span>{" "}
                                                        {user.countryCode} {user.phoneNumber || "N/A"}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        <span className="font-medium">Email:</span>{" "}
                                                        {user.email || "N/A"}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        <span>Roles : </span>{user.userRoles.map((role: { roleName?: string }) => role?.roleName).join(", ")}
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                    </div>

                    {assignRoleError && <p className="text-red-500 text-sm">{assignRoleError}</p>}
                    <Button
                        type="submit"
                        variant="filled"
                        className="w-full"
                        hasHref={false}
                        label="Assign Role"
                        isFormButton
                        disabled={assignRoleStatus === "loading"}
                    />
                </>
            )}
        </FormModal>
    );
}