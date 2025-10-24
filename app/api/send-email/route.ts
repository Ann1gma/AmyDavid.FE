import { TGuest } from "@/components/OsaForm";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const { guests } = await req.json();

		const formattedGuests = guests
			.map(
				(g: TGuest) =>
					`<p><strong>Gäst:</strong> ${g.name} ${g.surname}<br/>
           <strong>Email:</strong> ${g.emailadress}<br/>
           <strong>Kost:</strong> ${g.food || "-"}<br/>
           <strong>Övrigt:</strong> ${g.other || "-"}</p>`
			)
			.join("");

		const { error } = await resend.emails.send({
			from: "Bröllopsformulär <onboarding@resend.dev>",
			to: `${process.env.NEXT_PUBLIC_EMAIL}`,
			subject: "Ny anmälan till bröllopet",
			html: `
        <h2>Ny anmälan</h2>
        ${formattedGuests}
      `,
		});

		if (error) return NextResponse.json({ error }, { status: 500 });
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
