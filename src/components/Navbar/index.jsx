import { useState, forwardRef, useImperativeHandle} from "react";
import { Link } from "react-router";

const Navbar = forwardRef(({onSearch}, ref) => {
    const [search, setSearch] = useState("");

    useImperativeHandle(ref, () => ({
        search,
        setSearch,
    }));

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(search);
        }
    }; 
    return (
        <div ref={ref} style={{
            marginBottom: 14,
            width: '100',
            display: "flex", 
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                }}>
                <p style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    margin: 0,
                }}>
                Mi boletera</p>
            </div>

            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                }}>
                <input 
                    placeholder="Buscar evento" 
                    onChange={handleInputChange} 
                    onKeyDown={handleInputKeyDown}
                    value={search}
                    style={{
                        padding: '6px 12px',
                        fontSize: 16,
                        width: 300,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                    }}
                />
                <Link to="/profile/my-info" style={{
                    marginLeft: 24,
                    fontSize: 16,
                    color: "#fff",
                    textDecoration: "none",
                }}>
                    Mi perfil
                </Link>
            </div>
        </div>
    );
});

Navbar.displayName = "Navbar";

export default Navbar;