function ToggleNavButton({ toggleNavHandler }) {
    return (
        <button onClick={toggleNavHandler} className="toggle-navigation-button">&#9776;</button>
    )
}

export default ToggleNavButton;