import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	try {
		const { speakerApplicant } = await req.json();

		const formattedGuests = `<p><strong>Jag önskar hålla tal:</strong> ${
			speakerApplicant.name
		}<br/>
           <strong>Email:</strong> ${speakerApplicant.emailadress || "-"}<br/>
           <strong>Övrigt:</strong> ${speakerApplicant.other || "-"}</p>`;

		const transporter = nodemailer.createTransport({
			host: "in-v3.mailjet.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.NEXT_PUBLIC_MJ_APIKEY_PUBLIC,
				pass: process.env.NEXT_PUBLIC_MJ_APIKEY_PRIVATE,
			},
		});

		await transporter.sendMail({
			from: `"Anmälan om tal till bröllopet" <ann_136@hotmail.com>`,
			to: `${process.env.NEXT_PUBLIC_SPEECH_EMAIL}`,
			subject: "Ny anmälan för till bröllopet",
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
