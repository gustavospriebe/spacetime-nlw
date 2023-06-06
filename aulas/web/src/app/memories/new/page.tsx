import { NewMemoryForm } from "@/components/NewMemoryForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
    return (
        <div className="flex w-full flex-1 flex-col gap-4 p-16">
            <Link
                className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
                href="/"
            >
                <ChevronLeft className="h-4 w-4" />
                voltar à timeline
            </Link>
            <NewMemoryForm />
        </div>
    );
}
