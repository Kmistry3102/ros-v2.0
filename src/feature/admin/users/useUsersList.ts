"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchUsersListRequest } from "./users.slice";

const DEFAULT_PAGE_SIZE = 12;

export function useUsersList(pageSize = DEFAULT_PAGE_SIZE, slug = "shivalik_group") {
  const dispatch = useAppDispatch();
  const { list, total, page, totalPages, status, error, counts, todaysCount } = useAppSelector(
    (state) => state.users
  );

  const loadPage = useCallback(
    (p: number, size?: number) => {
      dispatch(fetchUsersListRequest({ page: p, pageSize: size ?? pageSize, slug }));
    },
    [dispatch, pageSize, slug]
  );

  useEffect(() => {
    loadPage(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- load first page on mount

  return {
    list,
    total,
    page,
    pageSize,
    totalPages,
    status,
    error,
    todaysCount,
    loadPage,
    counts,
  };
}
