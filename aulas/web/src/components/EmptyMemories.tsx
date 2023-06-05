import Link from "next/link";

export function EmptyMemories() {
    return (
        <div>
            <p className="w-[360px] text-center leading-relaxed">
                Você ainda não registrou nenhuma lembrança,
                <br />
                comece a{" "}
                <Link
                    href="/memories/new"
                    className="underline hover:text-gray-50"
                >
                    criar agora
                </Link>
                !
            </p>
        </div>
    );
}
