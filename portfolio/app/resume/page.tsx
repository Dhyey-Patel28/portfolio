import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default function ResumePage() {
    const pdfPath = "/resume/Dhyey_Patel_Resume.pdf";

    return (
        <main>
            <Container className="py-16">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
                    <Button asChild>
                        <a href={pdfPath} download>
                        Download PDF
                        </a>
                    </Button>
                </div>

                <div className="mt-8 overflow-hidden rounded-xl border">
                    <iframe
                        src={pdfPath}
                        className="h-[80vh] w-full"
                        title="Resume PDF"
                    />
                </div>
            </Container>
        </main>
    );
}