import { supabase } from "@/lib/supabaseClient";
import { TInfo } from "@/types/infoPage";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { data, error } = await supabase
			.from("info")
			.select("*")
			.single<TInfo>();

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
