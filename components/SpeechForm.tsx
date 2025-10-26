"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useModalStore } from "@/store";
import { useRouter } from "next/navigation";

export type TSpeakerApplicant = {
	name: string | null;
	emailadress?: string | null;
	other?: string | null;
};

type FormValues = {
	speakerApplicant: TSpeakerApplicant;
};

const SpeechForm = () => {
	const { showModal, hideModal } = useModalStore();
	const router = useRouter();
	const [applicatntInfo, setApplicatntInfo] = useState<TSpeakerApplicant>({
		name: null,
		emailadress: null,
		other: null,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			speakerApplicant: applicatntInfo,
		},
	});

	const closeModal = () => {
		hideModal();
		router.push("/");
	};

	const submitHandler: SubmitHandler<FormValues> = async (data) => {
		try {
			const res = await fetch("/api/send-speech-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error("Misslyckades att skicka mejl");

			setApplicatntInfo({
				name: null,
				emailadress: null,
				other: null,
			});

			showModal(
				<div className="flex flex-col items-center">
					<h2>Tack för din anmälan</h2>
					<button
						className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl "
						onClick={closeModal}
					>
						Stäng
					</button>
				</div>
			);
		} catch (error) {
			alert("Något gick fel, försök igen.");
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col items-center">
				<h2>Anmälningsformulär</h2>
				<p>Om du vill hålla tal under bröllopet, anmäl dig här</p>
			</div>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="flex flex-col gap-8 mb-20 items-center justify-items-center w-[90%] md:w-full max-w-3xl mx-auto"
			>
				<div className="border rounded-xl p-4 space-y-2 w-full">
					<h3 className="font-semibold text-lg">Talare</h3>

					<div>
						<label className="block font-medium">Namn *</label>
						<input
							{...register(`speakerApplicant.name`, {
								required: "Förnamn är obligatoriskt",
							})}
							className="border rounded p-2 w-full"
						/>
						{errors.speakerApplicant?.name && (
							<p className="text-red-500 text-sm">
								{errors.speakerApplicant?.name?.message}
							</p>
						)}
					</div>

					<div>
						<label className="block font-medium">E-postadress</label>
						<input
							{...register(`speakerApplicant.emailadress`, {
								pattern: {
									value: /^\S+@\S+\.\S+$/,
									message: "Ogiltig e-postadress",
								},
							})}
							className="border rounded p-2 w-full"
						/>
						{errors.speakerApplicant?.emailadress && (
							<p className="text-red-500 text-sm">
								{errors.speakerApplicant?.emailadress?.message}
							</p>
						)}
					</div>

					<div>
						<label className="block font-medium">Övrigt</label>
						<input
							{...register(`speakerApplicant.other`)}
							className="border rounded p-2 w-full"
						/>
					</div>
				</div>
				<div>
					<button className="bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-2xl">
						<p className="font-semibold">Skicka in anmälan om tal</p>
					</button>
				</div>
			</form>
		</div>
	);
};

export default SpeechForm;
