const customStyles = {
    menu: (provided: any) => ({
        ...provided,
        background: "#1A1A1A",
        margin: "10px 0px",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused ? "rgb(52, 211, 153)" : "#e1e1e1",
        "&:hover": {
            color: "rgb(52, 211, 153)"
        }
    }),
    control: (provided: any, state: any) => ({
        ...provided,
        border: state.isFocused
            ? "1px solid rgb(52, 211, 153)"
            : "1px solid #e1e1e1",
        outline: "none",
        boxShadow: "none",
        "&:hover": {
            border: state.isFocused
                ? "1px solid rgb(52, 211, 153)"
                : "1px solid #e1e1e1",
        },
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        background: "#1A1A1A",
        color: "white",
        padding: "10px 10px",
        "&:hover": {
            background: "#404040",
            color: "white",
        },
    }),
    singleValue: (provided: any, state: any) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        return { ...provided, opacity, transition };
    },
};

export default customStyles;