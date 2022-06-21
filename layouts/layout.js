import Header from "../components/layout/header";

const Layout = ({ children }) => {
    return ( 
        <>
            <Header />
            {children}
        </>
     );
}
 
export default Layout;