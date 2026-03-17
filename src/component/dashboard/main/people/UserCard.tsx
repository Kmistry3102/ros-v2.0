import Pagination from "@/component/ui/Pagination";
import { useUsersList } from "@/feature/admin/users/useUsersList";
import { displayName, mobileText } from "@/feature/commonapi.types";

interface UserCardProps {
  setSelectedUser?: (user: any) => void;
  selectedUser?: any;
}

export default function UserCard({ setSelectedUser, selectedUser }: UserCardProps) {
  const {
    list,
    page,
    totalPages,
    total,
    pageSize,
    status,
    loadPage,
  } = useUsersList(12, "shivalik_group");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {list.map((user, index) => {
          const name = displayName(user);
          const mobile = mobileText(user);
          const hasName = !!name;

          const id = user._id ?? user.id ?? `user-${index}`;
          const isSelected =
            selectedUser &&
            (selectedUser._id === id || selectedUser.id === id);

          return (
            <button
              key={String(id)}
              onClick={() => setSelectedUser?.(user)}
              className={`rounded-lg p-4 text-left transition cursor-pointer ${isSelected
                  ? "border border-gray-600  scale-[1.01]"
                  : "border border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  {Array.isArray(user.userActivity) && user.userActivity.length > 0 ? (
                    <div className="inline-block text-xs font-medium text-sky-800 bg-sky-50 p-2 rounded-lg">
                      {user.userActivity.join(", ")}
                    </div>
                  ) : (
                    <span className="inline-block text-xs font-medium text-gray-500 bg-gray-50 p-2 rounded-lg">
                      N/A
                    </span>
                  )}
                </div>

                {user.createdAt && (
                  <time className="text-xs text-gray-800">
                    {new Date(user.createdAt as string).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>

              {hasName ? (
                <h3 className="mt-2.5 truncate text-base font-semibold text-gray-900 text-left">
                  {name}
                </h3>
              ) : null}

              <p className="mt-1.5 text-sm text-gray-500 text-left">
                {mobile ? (
                  <>
                    <span className="text-gray-400">Mobile No : </span>
                    {mobile}
                  </>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {user.source && (
                  <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {String(user.source)}
                  </span>
                )}
                {user.subSource && (
                  <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                    {String(user.subSource)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalItems={total}
          pageSize={pageSize}
          onPageChange={loadPage}
          disabled={status === "loading"}
        />
      )}
    </div>
  );
}