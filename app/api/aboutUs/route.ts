import { supabase } from "@/lib/supabaseClient";
import { TAboutUs } from "@/types/aboutUsPage";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("about_us")
			.select("*")
			.single<TAboutUs>();

		if (error) {
			console.error("❌ Supabase error:", error.message);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ data });
	} catch (err) {
		console.error("❌ Unexpected error:", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
