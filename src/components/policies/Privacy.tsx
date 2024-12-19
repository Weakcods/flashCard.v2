import React from "react";

export function Privacy() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Your privacy is important to us. This privacy policy explains what personal data we collect from you and how we use it.
            </p>
            
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We collect information to provide better services to all our users. This includes information you provide to us directly, information we get from your use of our services, and information we get from third parties.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">How We Use Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We use the information we collect to provide, maintain, protect, and improve our services, to develop new ones, and to protect our users. We also use this information to offer you tailored content.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We do not share personal information with companies, organizations, and individuals outside of our organization unless one of the following circumstances applies: with your consent, for external processing, or for legal reasons.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Your Choices</h2>
                <p className="text-muted-foreground leading-relaxed">
                    You have choices regarding the information we collect and how it's used. You can choose not to provide certain information, but this may limit your ability to use some of our services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We may change this privacy policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.
                </p>
            </section>
        </div>
    );
}