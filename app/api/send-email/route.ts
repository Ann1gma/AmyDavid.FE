import { TGuest } from "@/components/OsaForm";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

		const transporter = nodemailer.createTransport({
			host: "in-v3.mailjet.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.MJ_APIKEY_PUBLIC,
				pass: process.env.MJ_APIKEY_PRIVATE,
			},
		});

		await transporter.sendMail({
			from: `"Bröllopsformulär" <ann_136@hotmail.com>`,
			to: "amynilsson93@gmail.com",
			subject: "Ny anmälan till bröllopet",
			html: `
        <h2>Ny anmälan</h2>
        ${formattedGuests}
      `,
		});

		return NextResponse.json({ success: true }, { status: 200 });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		console.error("Mail Error => ", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
