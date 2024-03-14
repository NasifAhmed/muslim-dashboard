export default function Footer() {
    return (
        <div className="mb-5 mt-20 flex w-full items-center justify-center text-center text-sm text-muted-foreground">
            &#169;{" "}
            <a
                className="px-2 hover:text-primary hover:underline"
                href="https://nasif-ahmed.vercel.app/"
            >
                Nasif Ahmed
            </a>{" "}
            | 2024
        </div>
    );
}
