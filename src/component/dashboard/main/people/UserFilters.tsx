"use client";
import AddUser from "@/component/forms/admin/AddUser";
import RoleForm from "@/component/forms/admin/RoleForm";
import Button from "@/component/ui/Button";
import { useState } from "react";
import { FaEdit, FaFilter, FaPlus, FaUserPlus } from "react-icons/fa";

export default function UserFilters({ onShowFilters, showFilters }: { onShowFilters: () => void, showFilters: boolean }) {
    const [showAddUser, setShowAddUser] = useState(false);
    const [showCreateRole, setShowCreateRole] = useState(false);
    const [showAssignRole, setShowAssignRole] = useState(false);
    return (
        <>

            <div className="flex flex-wrap gap-2">
                <Button label="Add User" variant="filled" leftIcon={<FaUserPlus />} hasHref={false} onClick={() => setShowAddUser(true)} />
                <Button label="Create Role" variant="filled" leftIcon={<FaPlus />} hasHref={false} onClick={() => setShowCreateRole(true)} />
                <Button label="Assign Role" variant="filled" leftIcon={<FaPlus />} hasHref={false} onClick={() => setShowAssignRole(true)} />
                <Button label="Edit Assign Role" variant="filled" leftIcon={<FaEdit />} hasHref={false} />
                <Button
                    label={showFilters ? "Hide Filters" : "Show Filters"}
                    variant="filled"
                    leftIcon={<FaFilter />}
                    hasHref={false}
                    onClick={onShowFilters}
                />
            </div>
            {showAddUser && <AddUser onClose={() => setShowAddUser(false)} isOpen={showAddUser} />}
            {showCreateRole && <RoleForm onClose={() => setShowCreateRole(false)} isOpen={showCreateRole} isCreateRoleForm={true} />}
            {showAssignRole && <RoleForm onClose={() => setShowAssignRole(false)} isOpen={showAssignRole} isCreateRoleForm={false} />}
        </>
    );
}