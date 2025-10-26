import OsaForm from "@/components/OsaForm";
import { TOsa } from "@/types/osa";
import Block from "@/components/Block";

export default async function OsaPage() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/osa`, {
		cache: "no-store",
	});

	if (!res.ok) throw new Error("Failed to fetch start page");

	const { data }: { data: TOsa } = await res.json();

	console.log("data: ", data);

	return (
		<div className="font-sans flex flex-col items-center">
			{data && (
				<main className="max-w-4xl ">
					<div className="my-4 text-center">
						<h1>{data.data.OsaTitle}</h1>
						<h2>{data.data.OsaSubTitle}</h2>
					</div>
					<div className="my-10 mx-8">
						{data.data.OsaPosts && <Block postData={data.data.OsaPosts} />}
					</div>
					<OsaForm />
				</main>
			)}
		</div>
	);
}
