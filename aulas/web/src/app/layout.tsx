import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });
const baijamjuree = Bai_Jamjuree({
    subsets: ["latin"],
    weight: "700",
    variable: "--font-bai-jamjuree",
});

export const metadata = {
    title: "NLW Spacetime",
    description:
        "Uma cápsula do tempo construída com React, Next.js, Tailwind e Typescript.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable} ${baijamjuree.variable} bg-gray-900 font-sans text-gray-100`}
            >
                {children}
            </body>
        </html>
    );
}
