import React from "react";

export function Terms() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms and Conditions</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Welcome to our FlashCard application. By using our services, you agree to the following terms and conditions:
            </p>
            <ul className="list-disc list-inside space-y-4">
                <li>
                    <strong>Usage:</strong> Our application is designed to help you create and study flashcards. You agree to use it for lawful purposes only.
                </li>
                <li>
                    <strong>Account:</strong> You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </li>
                <li>
                    <strong>Content:</strong> You retain ownership of the content you create. However, by using our application, you grant us a license to use, display, and distribute your content within the application.
                </li>
                <li>
                    <strong>Privacy:</strong> We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your information.
                </li>
                <li>
                    <strong>Modifications:</strong> We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on our website.
                </li>
                <li>
                    <strong>Termination:</strong> We may terminate or suspend your account if you violate these terms or engage in any conduct that we deem harmful to the application or other users.
                </li>
            </ul>
            <p className="text-lg md:text-xl text-muted-foreground mt-8">
                If you have any questions or concerns about these terms, please contact us at support@flashcardapp.com.
            </p>
        </div>
    );
}