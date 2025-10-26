import Block from "@/components/Block";
import { TStartPage } from "@/types/startPage";

export default async function Home() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/startPage`, {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch start page");

	const { data }: { data: TStartPage } = await res.json();

	console.log("data: ", data);

	return (
		<div className="font-sans flex flex-col items-center">
			{data && (
				<main className="max-w-4xl ">
					<div className="my-4 text-center">
						<h1>{data.data.startPageTitle}</h1>
						<h2>{data.data.startPageSubTitle}</h2>
					</div>
					<div className="my-10 mx-8">
						{data.data.startPagePosts && (
							<Block postData={data.data.startPagePosts} />
						)}
					</div>
				</main>
			)}
		</div>
	);
}
