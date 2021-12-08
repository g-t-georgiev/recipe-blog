function ToggleNavButton({ toggleNavHandler }) {
    return (
        <button onClick={toggleNavHandler} className="toggle-navigation-button">
            &#9776; Menu
        </button>
    )
}

export default ToggleNavButton;