export default function ButtonRenderer({ buttonList }) {
    return buttonList.map((buttonProps, index) => <button key={index + buttonProps.type}
        className={buttonProps.type === "positive" ? "bg-sky-600 w-[75px] capitalize text-white text-sm p-2 rounded-lg hover:scale-110 transition ease-in-out delay-75 cursor-pointer" : "bg-red-600 capitalize w-[75px] text-white text-sm p-2 rounded-lg hover:scale-110 transition ease-in-out delay-75 cursor-pointer"}
        onClick={buttonProps.onClick}>
        {buttonProps.children}
    </button>
    )
}