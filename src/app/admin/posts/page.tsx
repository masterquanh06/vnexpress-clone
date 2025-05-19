'use client';
import AppTable from "@/components/AppTable";
import useSWR from "swr";

function BlogPages() {
    const fetcher = async (url: string) => {
        const response = await fetch(url);
        return response.json();
    }
    const { data, error, isLoading } = useSWR('http://localhost:8000/blogs',
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (isLoading) return <div>Loading...</div>
    return (
        <div className="mt-5">
            <AppTable
                blogs={data?.sort((a: any, b: any) => b.id - a.id)}
            />
        </div>
    )
}

export default BlogPages;