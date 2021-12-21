function ToggleNavButton({ openNavHandler }) {
    return (
        <button onClick={openNavHandler} className="toggle-navigation-button">&#9776;</button>
    )
}

export default ToggleNavButton;