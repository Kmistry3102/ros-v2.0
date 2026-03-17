"use client";
import { OptionTypes } from "@/feature/commonapi.types";
import { useState, useRef, useEffect } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";

export interface OptionType {
    label: string;
    value: string;
}

export const getSelectStyles = (isFloated: boolean): StylesConfig<OptionType, false> => ({
    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused ? "#000000" : "#d1d5db",
        borderRadius: "8px",
        boxShadow: "none",
        minHeight: "auto",
        fontSize: "16px",
        background: "#fff",
        padding: "0",
        paddingTop: isFloated ? "20px" : "20px",
        paddingBottom: "0.5rem",
        paddingLeft: "14px",
        paddingRight: "3.5rem",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#171717",
        fontWeight: 400,
        fontSize: "16px",
    }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({ ...base, maxHeight: "250px", overflowY: "auto", padding: 0 }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isSelected ? "#000" : isFocused ? "#f2f2f2" : "transparent",
        color: isSelected ? "#fff" : "#111",
        fontWeight: 300,
        cursor: "pointer",
        padding: "14px 15px",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
        ...base, position: "absolute",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "0px !important",
        color: "#bdbdbd",
    }),
});


export default function FilterSelect({
    id,
    label,
    options,
    value,
    onChange,
}: {
    id: string;
    label: string;
    options: OptionTypes[];
    value: string;
    onChange: (value: string) => void;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const hasValue = Boolean(value);
    const isFloated = isFocused || hasValue;
    const selectedOption = options.find((opt) => opt.value === value) || null;

    return (
        <div className="relative w-full">
            <label
                htmlFor={id}
                className={`absolute left-4 font-normal text-[#575757] pointer-events-none transition-all duration-200 ease-in-out pr-8 line-clamp-1 z-[1] leading-tight ${isFloated ? "top-2 text-xs" : "top-4 text-base"
                    }`}
            >
                {label}
            </label>
            <Select<OptionType, false>
                inputId={id}
                instanceId={id}
                options={options}
                placeholder=""
                isSearchable={false}
                isClearable={false}
                value={selectedOption}
                menuIsOpen={menuOpen}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
                onChange={(option: SingleValue<OptionType>) => {
                    onChange(option ? option.value : "");
                    setMenuOpen(false);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                styles={getSelectStyles(isFloated)}
                classNamePrefix="react-select"
                menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                menuPosition="fixed"
            />
        </div>
    );
}