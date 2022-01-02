import './Layout.css';

function Layout({ children }) {
    return (
        <div className="layout-wrapper">
            {children}
        </div>
    );
}

export default Layout;