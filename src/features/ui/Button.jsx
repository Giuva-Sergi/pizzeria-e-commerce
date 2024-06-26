import { Link } from "react-router-dom";

function Button({children, disabled, to, type, handler}) {
    const base = "inline-block text-sm rounded-full disabled:cursor-not-allowed bg-yellow-400 font-semibold uppercase focus:ring focus:ring-offset-2 focus:ring-yellow-300 focus:outline-none tracking-wide text-stone-800 transition duration-500 ease-in-out hover:bg-yellow-300 hover:text-stone-700";

    const styles = {
        primary: base + " px-4 py-3 md:px-6 md:py-4",
        small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
        secondary: "inline-block text-sm rounded-full disabled:cursor-not-allowed outline outline-2 outline-stone-200 font-semibold uppercase focus:ring focus:ring-offset-2 focus:ring-stone-300 focus:outline-none tracking-wide text-stone-400 transition duration-500 ease-in-out hover:bg-stone-300 hover:text-stone-700 px-4 py-3 md:px-6 md:py-4",
        round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm"
    }

    if (to) return <Link to={to} className={styles[type]}>{children}</Link>
    return (
        <button disabled={disabled} className={styles[type]} onClick={handler}>
            {children}
        </button>
    )
}

export default Button
