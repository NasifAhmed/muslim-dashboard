export default function Footer() {
    return (
        <div className="flex justify-center items-center w-full mt-20 mb-5 text-muted-foreground text-center text-sm">
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
