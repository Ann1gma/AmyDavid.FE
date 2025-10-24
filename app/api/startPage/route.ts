import { supabase } from "@/lib/supabaseClient";
import { TStartPage } from "@/types/startPage";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("start_page")
			.select("*")
			.single<TStartPage>();

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
