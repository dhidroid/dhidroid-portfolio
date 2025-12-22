import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

const PageNotFound = () => {
    return (
        <section className="flex items-center justify-center min-h-[70vh] bg-gray-50">
            <Container className="text-center">
                <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
                <h2 className="text-4xl font-bold -mt-10 mb-6">Page Not Found</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/">
                    <Button size="lg">Go Back Home</Button>
                </Link>
            </Container>
        </section>
    );
};

export default PageNotFound;
