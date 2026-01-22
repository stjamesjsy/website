import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />
                <Container>
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ marginBottom: "10px" }}>Page Not Found</h1>
                        <p style={{ fontSize: "20px" }}>Sorry, the page you are looking for does not exist.</p>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    )
}