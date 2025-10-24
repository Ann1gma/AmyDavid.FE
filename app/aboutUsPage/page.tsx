import NavButton from "@/components/NavButton";
import { TAboutUs } from "@/types/aboutUsPage";
import Image from "next/image";

export default async function Home() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/aboutUs`, {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch start page");

	const { data }: { data: TAboutUs } = await res.json();

	console.log("data: ", data);

	return (
		<div className="font-sans flex flex-col items-center">
			{data && (
				<main className="max-w-4xl ">
					<div className="my-4 text-center">
						<h1>{data.data.aboutUsTitle}</h1>
						<h2>{data.data.aboutUsSubTitle}</h2>
					</div>
					<div className="my-10 mx-8">
						{data.data.aboutUsPosts?.map((post, index) => (
							<div key={index} className="mb-20">
								{post.blockTitle && <h3>{post.blockTitle}</h3>}
								{post.blockSubtitle && <h4>{post.blockSubtitle}</h4>}
								{post.blockText && <p>{post.blockText}</p>}
								<div className="items-center justify-items-center">
									{post.blockImageUrl && (
										<Image
											src={post.blockImageUrl}
											alt={post.blockText || ""}
											width={500}
											height={500}
										/>
									)}
								</div>
								<div className="flex justify-center my-10">
									{post.linkBtn && post.linkBtnText && (
										<NavButton text={post.linkBtnText} url={post.linkBtn} />
									)}
								</div>
							</div>
						))}
					</div>
				</main>
			)}
		</div>
	);
}
