import Block from "@/components/Block";
import SpeechForm from "@/components/SpeechForm";
import { TSpeech } from "@/types/speechPage";

export default async function SpeechPage() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/speech`, {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch start page");

	const { data }: { data: TSpeech } = await res.json();

	console.log("data: ", data.data.SpeechPosts);

	return (
		<div className="font-sans flex flex-col items-center">
			{data && (
				<main className="max-w-4xl ">
					<div className="my-4 text-center">
						<h1>{data.data.SpeechTitle}</h1>
						<h2>{data.data.SpeechSubTitle}</h2>
					</div>
					<div className="my-10 mx-8">
						{data.data.SpeechPosts && (
							<Block postData={data.data.SpeechPosts} />
						)}
					</div>
					<SpeechForm />
				</main>
			)}
		</div>
	);
}
