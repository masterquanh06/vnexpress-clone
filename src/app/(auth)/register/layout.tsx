export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {children}
                </div>
            </body>
        </html>
    )
}